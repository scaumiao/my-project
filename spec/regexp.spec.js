var cheerio = require('cheerio');
var request = require('request'),
  fs = require('fs');
describe('test the RegExp', function() {
  it("test the RegExp", function(done) {
    var test1 = 'http://static.wanfangdata.com.cn/wfks/js/wf.service-1.3.js';
    var test2 = 'http://static.wanfangdata.com.cn/wfks/js/global.min.js?v=201610091258';
    var test3 = '/img/global.png';
    expect(regexpFn(test1)).toEqual(
      'js');
    expect(regexpFn(test2)).toEqual(
      'js');
    expect(regexpFn(test3)).toEqual(
      'png');
    fs.readFile('Html.html', 'utf-8', function(err, data) { //读取内容
      if (err)
        throw err;
      console.log(imgFn('http://localhost:3000/api/proxy',
        'http://www.wanfangdata.com.cn/', data));
      return done();
    });
  });
});

function regexpFn(src) {
  return src.replace(/.+\./g, "").replace(/\?.*/g, "");
}

function imgFn(Url, baseUrl, data) {
  var $ = cheerio.load(data);
  var images = $('img[src]').toArray();
  len = images.length;
  for (var i = 0; i < len; i++) {
    var imgsrc = images[i].attribs.src;
    var imgsrc_0 = Url + '?baseUrl=' + baseUrl + '&relUrl=' +
      imgsrc + '&types=image/';
    $($('img[src]')[i]).attr('src', imgsrc_0);
  }
  return $.html();
}
