var keystone = require('keystone');
var url = require('url');
var cheerio = require('cheerio');
var request = require('request');
// 改写URL

exports = module.exports = function(req, res) {
  var finalUrl = req.query.url;
  var parsedUrl = url.parse(finalUrl);
  var Urls = 'http://localhost:3000/api/proxy';
  request(finalUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // 重构流程控制
      var bodys = acquireUrl(Urls, finalUrl, body);
      res.writeHead(200, {
        "Content-Type": "text/html"
      });
      res.write(bodys);
      res.end();
    }
  });

};

//重构
//获取url进行修改
function acquireUrl(Url, baseUrl, data) {
  var $ = cheerio.load(data);
  var i = 0;
  // js
  var script = $('script[src]').toArray();
  var len = script.length;
  for (i = 0; i < len; i++) {
    //遍历数组，并使用attribs方法，得到Js文件名称
    var scriptsrc = script[i].attribs.src;
    console.log(scriptsrc);
    //使用url.resolve方法，拼接地址，获取外链接，从而成功下载
    // 改写
    var scriptsrc_0 = Url + '?baseUrl=' + baseUrl + '&relUrl=' +
      scriptsrc + '&types=text/';
    $($('script[src]')[i]).attr('src', scriptsrc_0);
  }

  // css
  var link = $('link[rel="stylesheet"]').toArray();
  len = link.length;
  for (i = 0; i < len; i++) {
    var linksrc = link[i].attribs.href;
    // var linksrc_0 = url.resolve(Url, linksrc);
    var linksrc_0 = Url + '?baseUrl=' + baseUrl + '&relUrl=' +
      linksrc + '&types=text/';
    $($('link[rel="stylesheet"]')[i]).attr('href', linksrc_0);
  }

  // img
  // var images = $('img[src]').toArray();
  // len = images.length;
  // for (i = 0; i < len; i++) {
  //   var imgsrc = images[i].attribs.src;
  //   var imgsrc_0 = Url + '?baseUrl=' + baseUrl + '&relUrl=' +
  //     imgsrc + '&types=Image/';
  //   $($('img[src]')[i]).attr('src', imgsrc_0);
  // }
  return $.html();
}

// 拿到body里面的所有链接
// 修改为代理的请求
// 返回前端
