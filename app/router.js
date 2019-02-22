'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('topics', '/api/v2/topics', controller.topics);
  router.resources('demos', '/demos', controller.demos);
  router.get('/demos:id', controller.demos.showParams);
  router.post('/demos/post', controller.demos.postTest);
  router.get('/get', controller.home.get);
  router.get('/post', controller.home.form);
  router.get('/joke', controller.home.joke);
  router.get('/knittingList', controller.home.knittingList);
  router.get('/qidian/search', controller.home.qidianSearch);
  router.get('/zfpx', controller.home.zfpx);
  // router.get('/mysql', controller.home.mysql);
};
