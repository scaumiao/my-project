/**
 * @file
 * @author SHocker-Yu
 * @date 3/25/16
 */
// 未解决相对路径问题

var http = require('http');
var async = require('async');
var cheerio = require('cheerio');
var request = require('request');
var path = require('path');
var fs = require('fs');
var url = require('url');

module.exports = function(Url, callback) {
  request(Url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      return async.waterfall([
        function(next) {
          next('', acquireData_1(Url, body));
        },
        function(result, next) {
          next('', acquireData_2(Url, result));
        },
        function(result, next) {
          next('', acquireData_3(Url, result));
        }
      ], function(err, result) {
        if (err) {
          callback(err);
        }
        callback('', result);
      });
    }
  });
};


//爬取js
function acquireData_1(Url, data) {
  var $ = cheerio.load(data); //cheerio解析data
  //将带有script[src]标签的内容组成数组
  var script = $('script[src]').toArray();
  console.log(script.length);
  var len = script.length;

  for (var i = 0; i < len; i++) {
    //遍历数组，并使用attribs方法，得到Js文件名称
    var scriptsrc = script[i].attribs.src;
    console.log(scriptsrc);
    //使用url.resolve方法，拼接地址，获取外链接，从而成功下载
    var scriptsrc_0 = url.resolve(Url, scriptsrc);
    $($('script[src]')[i]).attr('src', scriptsrc_0);
  //调用下载方法
  // downloadScript(scriptsrc_0, function() {
  //   console.log('js   done');
  // });
  }
  return $.html();
}


//爬取css
function acquireData_2(Url, data) {
  var $ = cheerio.load(data);

  var link = $('link[rel="stylesheet"]').toArray();
  var len = link.length;
  for (var i = 0; i < len; i++) {
    var linksrc = link[i].attribs.href;
    var linksrc_0 = url.resolve(Url, linksrc);
    $($('link[rel="stylesheet"]')[i]).attr('href', linksrc_0);
  }
  return $.html();
}


//爬取images
function acquireData_3(Url, data) {
  var $ = cheerio.load(data);
  var images = $('img[src]').toArray();
  console.log(images.length);
  var len = images.length;

  for (var i = 0; i < len; i++) {

    var imgsrc = images[i].attribs.src;
    var imgsrc_0 = url.resolve(Url, imgsrc);
    $($('img[src]')[i]).attr('src', imgsrc_0);

    // downloadImg(imgsrc_0, function() {
    //   console.log('img   done');
    // });

  }
  return $.html();
}


var downloadScript = function(url, cb) {
  http.get(url, function(res) {
    //调用fs模块中createWriteStream，将爬取的内容放入指定文件夹
    res.pipe(fs.createWriteStream(path.join('test_script/', url.replace(
      /.*\//, ''))));
    res.on('end', cb);
  });
};


var downloadLink = function(url, cb) {
  http.get(url, function(res) {
    res.pipe(fs.createWriteStream(path.join('test_link/', url.replace(
      /.*\//, ''))));
    res.on('end', cb);
  });
};

var downloadImg = function(url, cb) {
  http.get(url, function(res) {
    res.pipe(fs.createWriteStream(path.join('test_img/', url.replace(
      /.*\//, ''))));
    res.on('end', cb);
  });
};
