var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'exstatic'
    },
    port: 3000,
    db: 'mongodb://localhost/exstatic'
  },

  test: {
    root: rootPath,
    app: {
      name: 'exstatic'
    },
    port: 3000,
    db: 'mongodb://localhost/exstatic'
  },

  production: {
    root: rootPath,
    app: {
      name: 'exstatic'
    },
    port: 3000,
    db: 'mongodb://localhost/exstatic'
  }
};

module.exports = config[env];
