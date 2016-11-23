var keystone = require('keystone'),
  http = require('http'),
  request = require('request'),
  fs = require('fs');
var async = require('async');
var ccrawler = require('../util/ccrawler');

exports = module.exports = function(req, res) {
  var Url = req.query.url;
  request(Url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // body
      // 找出body中的<head>位置，插入base
      var reg = /<head>/;
      var str = '<head><base href="' + Url + '">';
      body = body.replace(reg, str);
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.write(body);
      res.end();
    // return fs.writeFile('Html.html', body, function(err) {
    //   if (err)
    //     throw err;
    //   console.log('Html done!');
    // });
    }
  });
};
