//Register模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Register = new keystone.List('Register');

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
  inviteCount: {
    type: Types.Number,
    initial: true,
    default: 0
  }
});

/**
 * Relationships
 */


Register.register();
