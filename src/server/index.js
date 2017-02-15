require('babel-register');

const hook = require('css-modules-require-hook');

hook({
  generateScopedName: '[name]_[local]_[hash:base64:5]',
});

// require('./server');
require('./providers/WeWorkRemotely');
