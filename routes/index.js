//index路由控制器
//设置路由和中间件
var keystone = require('keystone'),
  middleware = require('./middleware'),
  importRoutes = keystone.importer(__dirname);

//常用中间件
// keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// // 处理404错误
// keystone.set('404', function(req, res, next) {
//     res.notfound();
// });
//
// // 处理其它错误
// keystone.set('500', function(err, req, res, next) {
//     var title, message;
//     if (err instanceof Error) {
//         message = err.message;
//         err = err.stack;
//     }
//     res.err(err, title, message);
// });

// keystone.set('500', function(err, req, res, next) {
//   // var title, message;
//   // if (err instanceof Error) {
//   //     message = err.message;
//   //     err = err.stack;
//   // }
//   // res.err(err, title, message);
//   //
//   var view = new keystone.View(req, res);
//   if (err) {
//     var locals = res.locals;
//     var message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' +
//       err + '</div>';
//     locals.message = '错误处理为何不会显示出来';
//     console.log(locals);
//     view.render('signup');
//   }
//
//   next();
//
//
//
// });


//加载路由
var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
};

//绑定路由，将index路由控制器绑定到根url‘/’的GET请求上
//应该在根控制器下面用app.get、app.post 或 app.all 将其它路由控制器添加到程序中。
exports = module.exports = function(app) {
  app.get('/', routes.views.index);


  app.all('/api*', [keystone.middleware.api]);
  app.get('/api/getPage', routes.api.getPage);
  app.get('/api/getSource', routes.api.getSource);
  app.get('/api/getHtml', routes.api.getHtml);
  app.get('/api/getSource', routes.api.getSource);
  app.get('/api/scraperUtil', routes.api.scraperUtil);
  app.get('/api/getSource', routes.api.getSource);
  app.get('/api/queueUtil', routes.api.queueUtil);
  app.get('/api/proxyTest', routes.api.proxyTest);

  // 反向代理的路由
  app.get('/api/proxyRoute', routes.api.proxyRoute);

  app.get('/api/try', routes.api.try);
  app.get('/api/proxy', routes.api.proxy);
};
