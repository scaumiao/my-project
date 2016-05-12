//post页面视图的路由控制器
var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;
  //定义locals数据类型
  locals.section = 'post';
  locals.data = {
		posts: []
	};

  // Load other posts
  view.on('init', function(next) {

    //数据库查询语句
    var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedAt').populate('author').limit('4');
    //保存对象数据
    q.exec(function(err, results) {
      locals.data.posts = results;
      next(err);
    });

  });


  //render方法在web.js中指定的views目录下找寻模板
  view.render('post');
};
