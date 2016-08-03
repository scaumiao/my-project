// Question模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Question = new keystone.List('Question', {
  autokey: {
    path: 'key',
    from: 'title',
    unique: true
  },
  map: {
    name: 'title'
  }
// drilldown: '题目类型'
});
Question.add({
  title: {
    type: String,
    require: true,
    index: true,

    unique: true
  },
  questionType: {
    label: '题目类型',
    type: Types.Select,
    options: '单选题,多选题,填空题,判断题',
    default: '单选题',
    index: true
  },
  // 题目类型: {
  //   type: Types.Relationship,
  //   ref: 'QuestionType',
  //   index: true
  // },
  // 答案: {
  //   type: String,
  //   index: true,
  //   dependsOn: {
  //     题目类型: '单选题'
  //   },
  //   collapse: true
  // },
  choose: {
    label: '选项',
    type: Types.TextArray,
    default: [],
    dependsOn: {
      questionType: ['单选题', '多选题']
    }
  },
  answerOne: {
    label: '答案',
    type: String,
    default: [],
    dependsOn: {
      questionType: ['单选题', '填空题', '判断题']
    }
  },
  answerMore: {
    label: '答案',
    type: Types.TextArray,
    default: [],
    dependsOn: {
      questionType: '多选题'
    }
  }
});

// Question.schema.pre('save', function(next) {
//   keystone.list('Post').model.find().where('state', 'published').exec(
//     function(err, posts) {
//       if (!err) {
//         console.log(posts);
//       }
//       next();
//     });
// });

//注册列表，并最终确定它的配置。
Question.register();
