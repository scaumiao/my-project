var dbservice = require('./dbservice');
var expect = require('chai').expect;
var keystone = require('keystone'),
  mongoose = require('mongoose');
  // mongoose.connect('localhost', 'my-project');
  // keystone.connect(mongoose);
  // keystone.init({
  //   'name': 'my-project'
  // });
  // keystone.import('../../models');

describe('check dbservice', function() {
  beforeAll(function(done) {
    mongoose.connect('localhost', 'my-project');
    keystone.connect(mongoose);
    keystone.init({
      'name': 'my-project'
    });
    keystone.import('../../models');
    if (mongoose.connection._readyState === 0) {
      mongoose.connection.open(function() {
        console.log('connect');
        done();
      });
    }
    done();
  });

  afterAll(function(done) {
    mongoose.connection.close(function() {
      console.log('close');
      done();
    });
  });

  //测试方法是否存在
  it("should return the true count", function(done) {

    // Run tests here
    // Use keystone.list('Key') to access Lists and execute queries
    // as you would in your main application
    dbservice.saveData('Questions', {
      'title': '题目测试3',
      'questionType': '单选题'
    }, function(err, result) {
      // console.log(err);
      expect(result).to.be.undefined;

    // expect(err).to.not.be.null;
    });
    // expect(dbservice.saveData('Question', {
    //   'title': '题目测试3'
    // })).to.eql(true);
    // expect(dbservice.saveData('AwardTypea')).to.eql(true);
    dbservice.findAllData('Question', function(err, result) {
      expect(result.length).to.eql(2);
      // console.log(result.length);
      done();
    });

  });

  it("test the findQuestion function", function(done) {

    // Run tests here
    // Use keystone.list('Key') to access Lists and execute queries
    // as you would in your main application
    dbservice.findQuestion('Question', function(err, result) {
      console.log(result);
      done();
    });
  });

  // dbservice.findQuestion('Question', function(err, result) {
  //   console.log(result);
  //   done();
  // });

  it("test findOne function", function(done) {
    dbservice.findOneData('Register', {
      'key': 'email',
      'value': 'user@keystonejs.com'
    }, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('findOne' + result);
      }
      done();
    });
  });

});
