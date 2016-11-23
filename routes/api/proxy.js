var keystone = require('keystone');
var url = require('url');
var request = require('request');
var ccrawler = require('../util/ccrawler');
// 改写URL

exports = module.exports = function(req, res) {
  var baseUrl = req.query.baseUrl;
  var relUrl = req.query.relUrl;
  var finalUrl = '';
  if (!url.parse(relUrl).host) {
    finalUrl = baseUrl + relUrl;
  } else {
    finalUrl = relUrl;
  }
  var newType = finalUrl.replace(/.+\./g, "").replace(/\?.*/g, "");
  // var contentType = req.query.types + newType;

  // var parsedUrl = url.parse(finalUrl);
  // 发送请求
  // 原始的url请求路径
  // 判断类型
  request(finalUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, {
        "Content-Type": req.query.types + newType
      });
      res.write(body);
      res.end();
    }
  });

};
