var keystone = require('keystone'),
  http = require('http'),
  request = require('request'),
  fs = require('fs');
var async = require('async');
var net = require('net');
var url = require('url');

var scraperjs = require('scraperjs');

var httpProxy = require('http-proxy');
// 目标 反向代理的实现

exports = module.exports = function(req, res) {
  // var u = url.parse('http://' + req.url);
  //
  // console.log('uuuuu', u);
  // var pSock = net.connect(u.port, u.hostname, function() {
  //   cSock.write('HTTP/1.1 200 Connection Established\r\n\r\n');
  //   pSock.pipe(cSock);
  // }).on('error', function(e) {
  //   cSock.end();
  // });
  //
  // cSock.pipe(pSock);

  // var headers = req.headers;
  // var options = {
  //   host: '127.0.0.1',
  //   port: 3000,
  //   path: 'http://www.wanfangdata.com.cn/',
  //   method: 'GET',
  //   headers: headers
  // };
  // var body = '';
  // var reqs = http.request(options, function(resp) {
  //   resp.on('data', function(d) {
  //     body += d;
  //   });
  // }).on('end', function() {
  //   resp.pipe(body);
  // });

  // http.get({
  //   host: '127.0.0.1',
  //   port: 3000,
  //   path: '/api/getSource',
  //   method: 'GET',
  // }, function(response) {
  //   // console.log(response);
  // });


  //final
  // var urls = url.parse(req.query.url);
  // var body = '';
  // http.get(req.query.url, function(response) {
  //   console.log(response.statusCode);
  //
  //   response.on('data', function(data) {
  //     body += data;
  //   });
  //   response.on('end', function() {
  //     res.writeHead(200, {
  //       "Content-Type": "text/html"
  //     });
  //     res.write(body);
  //     res.end();
  //   });
  // });
  // res.writeHead(200, {
  //   "Content-Type": "text/html"
  // });
  // res.write(body);
  // res.end();
  // response.writeHead(response.statusCode, response.headers);
  // response.pipe(cRes);
  //

  // var finalUrl = req.query.url;
  // var finalAgent = null;
  // var proxy = httpProxy.createProxyServer({});
  // var parsedUrl = url.parse(finalUrl);
  // if (parsedUrl.protocol === 'https:') {
  //   finalAgent = https.globalAgent;
  // } else {
  //   finalAgent = http.globalAgent;
  // }
  // proxy.web(req, res, {
  //   target: finalUrl,
  //   agent: finalAgent,
  //   headers: {
  //     host: parsedUrl.hostname
  //   },
  //   prependPath: false,
  //   xfwd: true,
  //   hostRewrite: finalUrl.host,
  //   protocolRewrite: parsedUrl.protocol
  // });

  var body = '';
  var finalUrl = req.query.url;
  var parsedUrl = url.parse(finalUrl);
  console.log('path', parsedUrl.host);
  var options = {
    host: parsedUrl.host,
    port: parsedUrl.port,
    path: parsedUrl.pathname
  };
  http.get(options, function(sreq, sres) {
    sreq.on('data', function(data) {
      body += data;
    });
    sreq.on('end', function() {
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.write(body);
      res.end();
    });
  }).end();

};
