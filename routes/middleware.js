//通用路由中间件
var _ = require('underscore'),
    keystone = require('keystone');

//初始化
exports.initLocals = function(req, res, next) {
    var locals = res.locals;

    locals.navLinks = [
  		{ label: 'Home',		key: 'home',		href: '/' },
  		{ label: 'Blog',		key: 'blog',		href: '/blog' },
  		{ label: 'Gallery',		key: 'gallery',		href: '/gallery' },
  		{ label: 'Contact',		key: 'contact',		href: '/contact' }
  	];

    locals.user = req.user;
    next();
};


// exports.initErrorHandlers = function(req, res, next) {
//
//     res.err = function(err, title, message) {
//         res.status(500).render('errors/500', {
//             err: err,
//             errorTitle: title,
//             errorMsg: message
//         });
//     };
//
//     res.notfound = function(title, message) {
//         res.status(404).render('errors/404', {
//             errorTitle: title,
//             errorMsg: message
//         });
//     };
//
//     next();
//
// };

//在视图渲染之前获取并清理flashMessages
exports.flashMessages = function(req, res, next) {
    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) {
        return msgs.length;
    }) ? flashMessages : false;

    next();

};
