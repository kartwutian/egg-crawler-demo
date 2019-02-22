'use strict';

const Controller = require('egg').Controller;

class demosController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = ctx.query;
  }
  async showParams() {
    const { ctx } = this;
    ctx.body = ctx.params;
  }
  async postTest() {
    const { ctx } = this;
    console.log(ctx.request);
    ctx.body = ctx.request.body;
    console.log(ctx.request);
  }

}

module.exports = demosController;
