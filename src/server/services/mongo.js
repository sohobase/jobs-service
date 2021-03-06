import mongoose from 'mongoose';
import C from '../../shared/constants';

const { DEVELOPMENT } = C.ENV;
const environment = process.env.NODE_ENV || DEVELOPMENT;
const MONGO_URL = process.env[`${environment.toUpperCase()}_MONGO_URL`];

export default {
  connect() {
    return new Promise((resolve, reject) => {
      mongoose.connect(MONGO_URL);
      mongoose.connection
        .on('error', reject)
        .on('open', () => { resolve(mongoose); });
    });
  },
};
