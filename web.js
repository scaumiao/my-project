var keystone = require('keystone');
keystone.init({

  'name': 'My Project',
  'favicon': 'public/favicon.ico',
  'less': 'public',
  'static': ['public'],

  'views': 'templates/views',
  'view engine': 'jade',

  'auto update': true,
  'mongo': 'mongodb://localhost/my-project',

  'session': true,
  'auth': true,
  'user model': 'User', //必须是keystone在其中查找用户的模型名称
  'cookie secret': '(your secret here)' //设置成长长的随机字符串

});

require('./models');

keystone.set('routes', require('./routes'));

keystone.start();
