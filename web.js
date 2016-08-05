var keystone = require('keystone');
var express = require('express');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var config = require('./config');
var Lockit = require('lockit');


var app = express();

keystone.init({

  'name': 'My Project',
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'mongo': 'mongodb://localhost/my-project',
  'auth': true,
  'session': true,
  'user model': 'User', //必须是keystone在其中查找用户的模型名称
  'cookie secret': '(your secret here)', //设置成长长的随机字符串

});

require('./models');

// var lockit = new Lockit(config);
// lockit.on('login', function(user, res) {
//   console.log('a new user signed up');
//   // set signup.handleResponse to 'false' for this to work
//   res.send('Welcome!');
// });
// app.use(cookieParser());
// app.use(cookieSession({
//   secret: '(your secret here)'
// }));
// app.use(lockit.router);
// keystone.set('app', app);
keystone.set('routes', require('./routes'));



keystone.start();
