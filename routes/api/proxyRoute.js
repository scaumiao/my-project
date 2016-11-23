// 反向代理的路由
// 所有请求都先经过这
// 设置个中间件 用来设置经过这个路由
var keystone = require('keystone'),
  http = require('http'),
  request = require('request'),
  fs = require('fs');
var async = require('async');
var net = require('net');
var url = require('url');
var httpProxy = require('http-proxy');

var scraperjs = require('scraperjs');

// 目标 反向代理的实现

exports = module.exports = function(req, res) {
  // console.log(req);
  var urls = req.query.url;
  console.log(url.parse(urls));
  if (!urls) {
    res.writeHead(500, {
      "Content-Type": "text/html"
    });
    res.end();
  }

  request(urls, function(error, response, body) {
    res.writeHead(200, {
      "Content-Type": "text/html"
    });
    res.write(body);
    res.end();
  });

};
