var play = require('./play');
var expect = require('chai').expect;
// var keystone = require('keystone'),
//   mongoose = require('mongoose');
// mongoose.connect('localhost', 'my-project');
// keystone.connect(mongoose);
// keystone.init({
//   'name': 'my-project'
// });
// keystone.import('../../models');

describe('check lottery', function() {

  // beforeEach(function(done) {
  //   keystone = require('keystone');
  //   keystone.init({
  //     'name': 'my-project'
  //   });
  //   keystone.import('../../models');
  //   done();
  // });
  // afterEach(function(done) {
  //   console.log('after');
  //   done();
  // });

  //测试方法是否存在
  // it("should return the true count", function(done) {
  //   done();
  //
  // mongoose.connection.on('open', function() {
  //   // Run tests here
  //   // Use keystone.list('Key') to access Lists and execute queries
  //   // as you would in your main application
  //   // play.getAwardType(function(err, data) {
  //   //   if (err) {
  //   //     console.log(err);
  //   //   } else {
  //   //     // console.log(data);
  //   //   }
  //   //   done();
  //   // });
  //   play.play_promise();
  //   done();
  // });
  // });

  //测试抽奖算法(概率抽奖，需改进每日的奖品发放数量以及每日的奖品概率变动)
  it("test the rand function", function() {
    // 1，4，15，20，30，30
    // 0,4,19,40,70,100
    var list = [1, 8, 16, 20, 40, 200];
    console.log(play.getRand(list));
  });
// 基于时间撒点发放
});
