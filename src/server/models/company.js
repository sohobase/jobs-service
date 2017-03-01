const { db } = global;

const CompanySchema = db.Schema(
  {
    name: String,
    url: String,
    about: String,
    image: String,
  },
  {
    collection: 'Companies',
    timestamps: true,
  },
);

// -- Statics
CompanySchema.statics.consolidate = function (data = {}) {
  const { name } = data;

  return new Promise((resolve, reject) => {
    this.findOne({ name }).exec((error, value) => {
      if (value) return resolve(value);

      return new this(data).save((error, value) => {
        return error ? reject(error) : resolve(value);
      });
    });
  });
};

export default db.model('Company', CompanySchema);
