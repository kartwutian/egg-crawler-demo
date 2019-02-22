'use strict';

const Service = require('egg').Service;


module.exports = app => {
  return class User extends Service {
    mysql() {
      const result = app.mysql.select('province');
      console.log(result)
      return result;
    }
  };
};
