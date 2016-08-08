var keystone = require('keystone');
var dbservice = require('../../controller/DBService/dbservice');
var crypto = require('crypto');
exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res);
  var locals = res.locals;

  // Set locals
  locals.section = 'signup';
  // view.on('get',function(next){
  //
  // }).on('post',function(next){
  //
  // });
  if (req.method === 'GET') {
    view.render('signup');
  }
  if (req.method === 'POST') {
    //写入数据库，并进行跳转
    var shasum = crypto.createHash('md5');
    shasum.update(req.body.password);
    var d = shasum.digest('hex');
    delete req.body.password1;
    dbservice.saveData('Register', req.body, function(err, result) {
      console.log(req.body);
      if (err) {
        // console.log(err);
        // res.sendStatus(500);
        // req.session.error = '已存在用户';
        // view.render('signup', {
        //   'message': "<div class='alert alert-danger' style='margin-bottom:20px;color:red;'>" +
        //     '已存在用户' + '</div>'
        // });
        // var message = "<div class='alert alert-danger' style='margin-bottom:20px;color:red;'>" +
        //   '已存在用户' + '</div>';
        var message = {
          'message': "<div class='alert alert-danger' style='margin-bottom:20px;color:red;'>" +
            '已存在用户' + '</div>'
        };

        view.render('signup', message);
      } else {
        view.render('index');
      }

    });
  // locals.message = JSON.stringify({
  //   'psw': d
  // });
  // res.sendStatus(500);
  // req.session.error = '用户存在';
  // view.render('test');
  }

};
