import mongoose from 'mongoose';

export default {
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.MONGO_URL);
      mongoose.connection
        .on('error', reject)
        .on('open', () => { resolve(mongoose); });
    });
  },
};
