var keystone = require('keystone'),
  http = require('http'),
  request = require('request'),
  fs = require('fs');
var async = require('async');
var ccrawler = require('../util/ccrawler');

var scraperjs = require('scraperjs');



exports = module.exports = function(req, res) {
  scraperjs.DynamicScraper.create('https://angularjs.org/')
    .scrape(function($) {
      return $;
    })
    .then(function(news) {
      console.log('news ', news);
      // body
      // 找出body中的<head>位置，插入base
      // var reg = /<head>/;
      // var str = '<head><base href="' + Url + '">';
      // news = news.replace(reg, str);
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.write(news);
      res.end();

    });

};
