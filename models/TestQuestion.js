// TestQuestion模型
var keystone = require('keystone'),
  Types = keystone.Field.Types,
  choose = [];

var TestQuestion = new keystone.List('TestQuestion', {
  autokey: {
    path: 'key',
    from: 'title',
    unique: true
  },
  map: {
    name: 'title'
  },
  sortable: true,
  drilldown: 'answerOne'
});
TestQuestion.add({
  title: {
    type: String,
    require: true,
    index: true,

    unique: true
  },
  TestQuestionType: {
    label: '题目类型',
    type: Types.Select,
    options: '单选题,多选题,填空题,判断题',
    default: '单选题',
    index: true
  },
  choose: {
    label: '选项',
    type: Types.TextArray,
    default: [],
    dependsOn: {
      TestQuestionType: ['单选题', '多选题']
    }
  },
  answerOne: {
    label: '答案',
    type: Types.Relationship,
    ref: 'TestQuestion',
    // options: choose,
    dependsOn: {
      TestQuestionType: ['单选题', '填空题', '判断题']
    }
  },
  answerMore: {
    label: '答案',
    type: String,
    dependsOn: {
      TestQuestionType: '多选题'
    }
  }
});

TestQuestion.relationship({
  path: 'TestQuestion.choose',
  ref: 'TestQuestion',
  refPath: 'answerOne'
});
// TestQuestion.schema.pre('save', function(next) {
//   keystone.list('Post').model.find().where('state', 'published').exec(
//     function(err, posts) {
//       if (!err) {
//         console.log(posts);
//       }
//       next();
//     });
// });

//注册列表，并最终确定它的配置。
TestQuestion.register();
