// var page = require('.').create(),
//   system = require('system');
// var spawn = require('child_process').spawn;
//
// page.open('http://d.wanfangdata.com.cn/Periodical/gpxygpfx201412049', function(
//   status) {
//   console.log('Status:' + status);
//   if (status === 'success') {
//     page.render('test.png');
//   }
//   phantom.exit();
// });
var phantom = require('phantom');
exports.testPhantomCreatePage = function(beforeExit, assert) {

  phantom.create(function(err, ph) {

    ph.createPage(function(page) {
      page.open("http://www.google.com", function(status) {

        console.log("opened google? ", status);

      });
      var result = page.evaluate(function() {
        return document.title;
      });
      console.log(result);

    });
    ph.exit();

  });

};



// phantom.create(function(ph) {
//   ph.createPage(function(page) {
//     page.open(
//       'http://d.wanfangdata.com.cn/Periodical/gpxygpfx201412049',
//       function(status) {
//         console.log('success');
//         ph.exit();
//       });
//   });
// });
