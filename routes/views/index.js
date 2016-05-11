//home页面视图的路由控制器
var keystone = require('keystone');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);

    //render方法在web.js中指定的views目录下找寻模板
    view.render('index');
};
