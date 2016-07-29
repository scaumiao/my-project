// Award模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Award = new keystone.List('Award', {
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
Award.add({
  title: {
    type: String,
    require: true,
    index: true,
    unique: true
  },
  awardType: {
    label: '奖品等级',
    type: Types.Relationship,
    ref: 'AwardType',
    index: true
  },
  count: {
    label: '数量',
    type: Types.Number
  }
});

Award.schema.pre('save', function(next) {
  keystone.list('Post').model.find().where('state', 'published').exec(
    function(err, posts) {
      if (!err) {
        console.log(posts);
      }
      next();
    });
});

//注册列表，并最终确定它的配置。
Award.register();
