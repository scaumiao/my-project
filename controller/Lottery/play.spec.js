var play = require('./play');
var expect = require('chai').expect;
var keystone = require('keystone');
keystone.init({
  'name': 'my-project'
});
keystone.import('../../models');
describe('check lottery', function() {
  //测试方法是否存在
  it("should return the true count", function() {



    keystone.mongoose.connect('localhost', 'my-project');
    keystone.mongoose.connection.on('open', function() {
      play.get_list();
      // Run tests here

      // Use keystone.list('Key') to access Lists and execute queries
      // as you would in your main application

    });
  });
});
