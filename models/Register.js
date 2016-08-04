//Register模型
var keystone = require('keystone'),
  Types = keystone.Field.Types;

var Register = new keystone.List('Register');

Register.add({
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
  }
});

/**
 * Relationships
 */


Register.register();
