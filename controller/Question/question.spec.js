var question = require('./question');
var expect = require('chai').expect;


describe('check question', function() {

  it("test the judge function", function() {
    //两个参数，第一个参数为答案数组，第二个参数是用户选择的答案
    //测试单选题
    // var choose = ['选项1', '选项2', '选项3', '选项4'];
    var right1 = ['选项2'];
    var answer1 = ['选项1'];
    expect(question.judge(right1, answer1)).to.eql(false);
    expect(question.judge(right1, right1)).to.eql(true);
    //测试多选题
    expect(question.judge(['选项1', '选项2', '选项3'], ['选项2', '选项3', '选项1']))
      .to.eql(true);
    expect(question.judge(['选项1', '选项2', '选项3'], ['选项4', '选项3', '选项1']))
      .to.eql(false);
    expect(question.judge(['选项1', '选项2', '选项3'], ['选项3', '选项1']))
      .to.eql(false);
    expect(question.judge(['选项1', '选项2', '选项3'], ['选项3', '选项1', '选项2',
      '选项4'
    ]))
      .to.eql(false);
  });
  // beforeEach(function() {
  // });
  // afterEach(function(done) {
  //   done();
  // });
  it("test the pick question function", function() {
    //随机抽取题目方法
    //返回下标
    var questions = [];
    for (var i = 0; i < 15; i++) {
      var obj = {
        'title': '题目' + i
      };
      questions.push(obj);
    }
    var result = question.pick(questions, 5);
    console.log(result);
  });
});
