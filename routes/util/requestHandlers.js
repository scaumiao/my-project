var handle = {};
var formidable = require("formidable");
var fs = require("fs");

handle["/"] = start;
handle["/start"] = start;

//读取文件并输出
function start(request, response) {
  fs.readFile("html/index.html", function(err, html) {
    if (err)
      throw err;
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(html);
    response.end();
  });
}

function getImage(request, response, pathname) {
  //这里需要去掉pathname最前面的"/"符号，fs.readFile()才能识别，所以使用pathname.substring(1)
  //或者在pathname前面加上表当前目录的“.”号，推荐使用后面这种
  fs.readFile("." + pathname, function(err, result) {
    if (err)
      throw err;
    response.writeHead(200, {
      "Content-Type": "image/jpeg"
    });
    response.write(result, "binary");
    response.end();
  });
}

function getCSS(request, response, pathname) {
  //这里必须去掉pathname最前面的"/"符号，fs.readFile()才能识别，所以使用pathname.substring(1)
  fs.readFile("." + pathname, function(err, result) {
    if (err)
      throw err;
    response.writeHead(200, {
      "Content-Type": "text/css"
    });
    response.write(result);
    response.end();
  });
}

function getJS(request, response, pathname) {
  //这里必须去掉pathname最前面的"/"符号，fs.readFile()才能识别，所以使用pathname.substring(1)
  fs.readFile("." + pathname, function(err, result) {
    if (err)
      throw err;
    response.writeHead(200, {
      "Content-Type": "text/javascript"
    });
    response.write(result);
    response.end();
  });
}

exports.handle = handle;
exports.start = start;
exports.getImage = getImage;
exports.getCSS = getCSS;
exports.getJS = getJS;
