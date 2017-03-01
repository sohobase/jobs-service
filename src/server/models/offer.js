import Company from './company';

const { db } = global;

const OfferSchema = db.Schema(
  {
    provider: String,
    providerId: String,
    category: String,
    position: String,
    url: String,
    remote: { type: Boolean, index: 1 },
    location: String,
    company: [{ type: db.Schema.Types.ObjectId, ref: 'Company' }],
    text: String,
    salary: String,
    skills: Array,
    state: { type: String, default: 'draft' },
    highlight: Boolean,
  },
  {
    collection: 'Offers',
    // id: false,
    // _id: false,
    // minimize: false, // show empty objects
    timestamps: true,
  },
);

// -- Index
OfferSchema.index({ name: 1, type: -1 }); // schema level

// -- Virtuals
OfferSchema.virtual('fullName')
  .get(function () {
    return `${this.position} ${this.location}`;
  });

// -- Query Helpers
OfferSchema.query.byName = function (name) {
  return this.find({ name: new RegExp(name, 'i') });
};

// -- Statics
OfferSchema.statics.findByName = function (name, callback) {
  return this.find({ name: new RegExp(name, 'i') }, callback);
};

OfferSchema.statics.consolidate = function (provider, providerId, data = {}) {
  return new Promise((resolve, reject) => {
    Company.consolidate(data.company).then((company) => {
      this.findOne({ provider, providerId }).exec((error, value) => {
        if (value) return resolve(value);

        return new this({ ...data, company, provider, providerId }).save((error, value) => {
          return error ? reject(error) : resolve(value);
        });
      });
    });
  });
};


// -- Instance
OfferSchema.methods.speak = function () {
  const greeting = this.name
    ? `Meow name is ${this.name}`
    : "I don't have a name";
  console.log(greeting);
};

OfferSchema.methods.findSimilarTypes = function (callback) {
  // this.find({ type: this.type }, callback);
  this.model('Offer').find({ type: this.type }, callback);
};

export default db.model('Offer', OfferSchema);
