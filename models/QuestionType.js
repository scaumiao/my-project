var keystone = require('keystone'),
  Types = keystone.Field.Types;

var QuestionType = new keystone.List('QuestionType');
QuestionType.add({
  name: {
    type: String,
    require: true
  }
});
QuestionType.relationship({
  ref: 'Question',
  path: 'question',
  refPath: '题目类型'
});
QuestionType.register();
