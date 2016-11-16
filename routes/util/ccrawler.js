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
var Url = 'http://d.wanfangdata.com.cn/Periodical/gpxygpfx201412049';

module.exports = function() {
  request(Url, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body);
      //新建‘Html.txt’文本文档，将html页面内容全部写入
      // 完成了css的修改
      acquireData_2(body);
      //调用爬虫
      // acquireData_1(body);
      // acquireData_2(body);
      // acquireData_3(body);

    }
  });
};


//爬取js
function acquireData_1(data) {
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
    //调用下载方法
    downloadScript(scriptsrc_0, function() {
      console.log('js   done');
    });
  }
}

var downloadScript = function(url, cb) {
  http.get(url, function(res) {
    //调用fs模块中createWriteStream，将爬取的内容放入指定文件夹
    res.pipe(fs.createWriteStream(path.join('test_script/', url.replace(
      /.*\//, ''))));
    res.on('end', cb);
  });
};


//爬取css
function acquireData_2(data) {
  var $ = cheerio.load(data);
  async.series([function(next) {
    var link = $('link[rel="stylesheet"]').toArray();
    var len = link.length;
    for (var i = 0; i < len; i++) {
      var linksrc = link[i].attribs.href;
      var linksrc_0 = url.resolve(Url, linksrc);
      $($('link[rel="stylesheet"]')[i]).attr('href', linksrc_0);
    }
    // console.log('errcuowu', tmpData);
    return next();
  }, function(next) {
    return fs.writeFile('Html.html', $.html(), function(err) {
      if (err)
        throw err;
      console.log('Html done!');
      return next();
    });
  }], function(err) {
    console.log(err);
  });


// return data;
}

var downloadLink = function(url, cb) {
  http.get(url, function(res) {
    res.pipe(fs.createWriteStream(path.join('test_link/', url.replace(
      /.*\//, ''))));
    res.on('end', cb);
  });
};

//爬取images
function acquireData_3(data) {
  var $ = cheerio.load(data);
  var images = $('img[src]').toArray();
  console.log(images.length);
  var len = images.length;

  for (var i = 0; i < len; i++) {

    var imgsrc = images[i].attribs.src;
    console.log(imgsrc);

    var imgsrc_0 = url.resolve('Url', imgsrc);

    downloadImg(imgsrc_0, function() {
      console.log('img   done');
    });

  }
}

var downloadImg = function(url, cb) {
  http.get(url, function(res) {
    res.pipe(fs.createWriteStream(path.join('test_img/', url.replace(
      /.*\//, ''))));
    res.on('end', cb);
  });
};

// 复制对象
var copyData = function(data) {
  var tmp = JSON.stringify(data);
  return JSON.parse(tmp);
};
