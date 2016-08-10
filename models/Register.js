//Register模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Register = new keystone.List('Register', {
  autokey: {
    path: 'key',
    from: 'email',
    unique: true
  },
  map: {
    name: 'email'
  }
});

Register.add({
  // name: {
  //   type: Types.Name,
  //   require: true,
  //   index: true
  // },
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
  inviteUrl: {
    type: String,
    initial: true,
    default: ''
  },
  inviteList: {
    type: Types.Relationship,
    ref: Register,
    many: true
  },
  inviteCount: {
    type: Types.Number,
    initial: true,
    default: 0
  },
  playCount: {
    type: Types.Number,
    initial: true,
    default: 0
  }
});

/**
 * Relationships
 */

Register.relationship({
  path: 'registers',
  ref: 'Register',
  refPath: 'inviteList'
});
Register.register();
