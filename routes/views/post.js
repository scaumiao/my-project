//post页面视图的路由控制器
var keystone = require('keystone');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res);

  var locals = res.locals;

  locals.section = 'post';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};


	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');

		q.exec(function(err, result) {
			locals.data.post = result;
			next(err);
		});

	});






  //render方法在web.js中指定的views目录下找寻模板
  view.render('post');
};
