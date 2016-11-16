var keystone = require('keystone'),
  http = require('http'),
  fs = require('fs');

exports = module.exports = function(req, res) {
  var url = 'http://www.baidu.com';
  http.get(url, function(res) {
    var html = '';
    res.on('data', function(data) {
      html += data;
    });
    res.on('end', function() {
      console.log('body', res);
      fs.writeFile('index.html', html, function(err) {
        if (err) {
          console.log('出现错误');
        }
        console.log('已输出');
      });

    });
  });
};
