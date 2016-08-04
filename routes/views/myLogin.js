var keystone = require('keystone');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'myLogin';

  console.log(req);
  console.log('查看信息');
  console.log(res);

  // Render the view
  view.render('myLogin');

};
