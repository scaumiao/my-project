// AwardType模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var AwardType = new keystone.List('AwardType', {
  autokey: {
    path: 'key',
    from: 'level',
    unique: true
  },
  map: {
    name: 'level'
  },
  defaultSort: 'probability'
});
AwardType.add({
  level: {
    type: String,
    require: true,
    index: true,
    unique: true
  },
  probability: {
    label: '几率',
    type: Types.Number,
    index: true
  },

});
AwardType.relationship({
  path: 'awards',
  ref: 'Award',
  refPath: 'awardType'
});

AwardType.defaultColumns = 'level|20%, probability|20%';

//注册列表，并最终确定它的配置。
AwardType.register();
