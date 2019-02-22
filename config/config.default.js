'use strict';

module.exports = appInfo => {
  const config = exports = {};

  exports.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'bhz',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519979913272_7336';

  // add your config here
  config.middleware = [];

  return config;
};
