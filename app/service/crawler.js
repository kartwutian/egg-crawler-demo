/* eslint-disable valid-jsdoc */
'use strict';
// 爬虫服务
const fs = require('fs');
const Service = require('egg').Service;

const cheerio = require('cheerio');
const iconv = require('iconv-lite');
const debug = require('debug')('app');

const config = require('../utils/config');

class Crawler extends Service {
  async demo() {
    const ctx = this.ctx;
    const result = await ctx.curl(config.url.article.joke);
    // ctx.status = result.status;
    // ctx.set(result.headers);
    const $ = cheerio.load(result.data);

    return {
      title: $('title').text(),
      text: $('.j-r-list-c-desc').text(),
    };
  }

  async zfpx() {
    const ctx = this.ctx;
    const result = await ctx.curl(config.url.zfpx.entry);
    // ctx.status = result.status;
    // ctx.set(result.headers);
    const $ = cheerio.load(result.data);
    Array.prototype.forEach.call($('.nav li a'), (element, index) => {
      // console.log(`* [${$(element).text()}](docs/${$(element).text()}.md)`);
      setTimeout(async () => {
        await this.zfpxDoc(encodeURI('http://www.zhufengpeixun.cn/plan/' + $(element).attr('href')), $(element).text());
      }, index * 500);
    });
    return {
      title: $('title').text(),
    };
  }

  async zfpxDoc(url, name) {
    const ctx = this.ctx;
    const result = await ctx.curl(url);
    const $ = cheerio.load(result.data);
    const code = $('code');
    if (code.length) {
      Array.prototype.forEach.call(code, ele => {
        $(ele).html($(ele).text());
      });
    }
    fs.writeFileSync('docs/' + name + '.md', $('.content.markdown-body').html(), {
      encoding: 'utf8',
    });
    console.log(name);
  }

  /**
   *  针织文章列表
   * */
  async knittingList() {
    const ctx = this.ctx;
    const result = await ctx.curl(config.url.knitting.tnc); // 全球针织网
    // ctx.status = result.status;
    // ctx.set(result.headers);
    const $ = cheerio.load(iconv.decode(result.data, 'gbk'));
    const list = [];
    const aLi = $('.ly-tab-body li');
    let len = aLi.length;
    if (ctx.query.len && ctx.query.len < len) {
      len = ctx.query.len;
    }
    for (let i = 0; i < len; i++) {
      const json = {};
      json.title = aLi.eq(i).find('.ly-tab-item-title').text();
      json.url = 'https:' + aLi.eq(i).find('.ly-tab-item-title').attr('href');
      json.date = aLi.eq(i).find('.ly-tab-item-date').text();
      list.push(json);
    }

    return {
      len,
      list,
    };
  }

  /**
   *起点测试
   */
  async search() {

    const commons = {

      // 平台
      path: 'pclog',

      // 行为 A：点击 P：浏览
      ltype: 'A',

      // 当前页面url
      url: window.location.href,

      // 来源
      ref: document.referrer,

      // 分辨率横屏
      sw: screen.width,

      // 分辨率竖屏
      sh: screen.height,

      // 横坐标
      x: '',

      // 纵坐标
      y: '',

      //页面标题
      title: ''
    };

    // 起点中文网
    const defaults = {

      // 行为 A：点击 P：浏览
      ltype: 'A',

      // 页面ID
      pid: '',

      // 页面模块标识
      eid: '',

      // 书籍ID
      bid: '',

      // 章节url
      cid: '',

      // 标签名
      tid: '',

      // 列表序号
      rid: '',

      // 广告素材id，广告位
      qd_dd_p1: '',

      //广告素材
      qd_game_key:'',

      //作者id
      auid:'',

      //书单id
      blid:'',

      //算法id
      algrid:'',

      //关键词
      kw: ''
    };

    const ctx = this.ctx;
    debug(ctx.query);
    const keyword = ctx.query.kw ? ctx.query.kw : '';
    debug(keyword);
    const result = await ctx.curl(config.url.qidian.search + keyword, {
      headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',
        'Cookie': '_csrfToken=vnJMtfmo61SisiO9CoP8rH0962d5OWzfljh0RfWH; newstatisticUUID=1531812097_1289159934; focusGame=1; e1=%7B%22pid%22%3A%22qd_P_Search%22%2C%22eid%22%3A%22%22%2C%22l1%22%3A2%7D; e2=%7B%22pid%22%3A%22qd_P_Searchresult%22%2C%22eid%22%3A%22%22%2C%22l1%22%3A5%7D',
        'Host': 'www.qidian.com',
        'Referer': 'https://www.qidian.com/search?kw=' + encodeURIComponent(keyword),
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/6.2.4092.1 Safari/537.36',
      },
    });
    const $ = cheerio.load(result.data);
    debug(result);
    return {
      title: $('title').text(),
      html: $('html').text(),
      headers: result.headers,
    };
  }
}
module.exports = Crawler;
