require('babel-register');
require('dotenv').config();

const hook = require('css-modules-require-hook');

hook({
  generateScopedName: '[name]_[local]_[hash:base64:5]',
});

require('./server');
require('./providers/RemoteFriendly')
// require('./crons/example');
// require('./providers/Jobspresso');
// require('./providers/WeWorkRemotely');
