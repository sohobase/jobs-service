require('babel-register');
require('dotenv').config();
const hook = require('css-modules-require-hook');
const ServiceMongo = require('./services/mongo').default;

ServiceMongo.connect()
  .then((connection) => {
    global.db = connection;

    hook({ generateScopedName: '[name]_[local]_[hash:base64:5]' });
    require('./server');
    require('./crons');
  })
  .catch((error) => {
    console.log('[error]', error);
  });
