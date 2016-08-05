//index路由控制器
//设置路由和中间件
var keystone = require('keystone'),
  middleware = require('./middleware'),
  importRoutes = keystone.importer(__dirname);

//常用中间件
keystone.pre('routes', middleware.initErrorHandlers);
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

keystone.set('500', function(err, req, res, next) {
  // var title, message;
  // if (err instanceof Error) {
  //     message = err.message;
  //     err = err.stack;
  // }
  // res.err(err, title, message);
  //
  console.log(err);
  if (err) {
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' +
      err + '</div>';
    console.log('测试出现错误会不会跑这段代码');
  }
  next();



});


//加载路由
var routes = {
  views: importRoutes('./views')
};

//绑定路由，将index路由控制器绑定到根url‘/’的GET请求上
//应该在根控制器下面用app.get、app.post 或 app.all 将其它路由控制器添加到程序中。
exports = module.exports = function(app) {
  app.get('/', routes.views.index);
  app.get('/post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  app.get('/signup', routes.views.signup);
  app.post('/signup', routes.views.signup);
};
