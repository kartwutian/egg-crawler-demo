'use strict';

const Controller = require('egg').Controller;


class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hello egg';
  }
  async topics() {
    this.ctx.body = this.ctx.helper;
  }
  async get() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/get?foo=bar');
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }
  async joke() {
    const ctx = this.ctx;
    const res = await ctx.service.crawler.demo();
    ctx.body = res;
  }
  async zfpx() {
    const ctx = this.ctx;
    const res = await ctx.service.crawler.zfpx();
    ctx.body = res;
  }
  async form() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/post', {
      // 必须指定 method，支持 POST，PUT 和 DELETE
      method: 'POST',
      // 不需要设置 contentType，httpclient 会默认以 application/x-www-form-urlencoded 格式发送请求
      data: {
        // 注意：由于 form 格式发送的数据是无法区分类型的，所以服务端收到 now 字段将是字符串而不是数字
        now: Date.now(),
        foo: 'test',
      },
      // 明确告诉 httpclient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    ctx.body = result.data.form;
  }

  async knittingList() {
    const ctx = this.ctx;
    const res = await ctx.service.crawler.knittingList();
    ctx.body = res;
  }
  async qidianSearch() {
    const ctx = this.ctx;
    const res = await ctx.service.crawler.search();
    ctx.body = res;
  }
  async mysql() {
    const ctx = this.ctx;
    const res = await ctx.service.user.mysql();
    ctx.body = res;
  }
}

module.exports = HomeController;

