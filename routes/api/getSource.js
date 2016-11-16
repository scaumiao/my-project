var keystone = require('keystone'),
  http = require('http'),
  request = require('request'),
  fs = require('fs');
var ccrawler = require('../util/ccrawler');

exports = module.exports = function(req, res) {
  var url = 'http://d.wanfangdata.com.cn/Periodical/gpxygpfx201412049/';
  // var url = 'http://s.wanfangdata.com.cn/Paper.aspx?q=%E8%AE%A1%E7%AE%97%E6%9C%BA&f=top';
  console.log('originalUrl', req.originalUrl);
  ccrawler();
// request(url).pipe(res);
// var file = './test/t.html';
// var writestream = fs.createWriteStream(file);
// writestream.on('close', function(result) {
//   var readstream = fs.createReadStream(file);
//   readstream.pipe(res);
// });
// request(url).pipe(writestream);
};
