//User模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var User = new keystone.List('User');

User.add({
  name: {
    type: Types.Name,
    require: true,
    index: true
  },
  email: {
    type: Types.Email,
    initial: true,
    index: true,
    require: true,
    unique: true
  },
  password: {
    type: Types.Password,
    initial: true
  },
  //用户模型必须要有个canAccessKeystone属性，指出用户是否可以访问keystone的管理界面
  canAccessKeystone: {
    type: Boolean,
    initial: true
  }
});

/**
 * Relationships
 */
User.relationship({
  ref: 'Post',
  path: 'post',
  refPath: 'author'
});

User.register();
