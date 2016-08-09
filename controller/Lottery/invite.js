var uuid = require('node-uuid');
var dbservice = require('../DBService/dbservice');

function inviteUrl(register) {
  if (register.uuid) {
    return register.uuid;
  }
  return uuid.v1().replace(/-/g, '');
// return uuid.v1();
}

function inviteAdd(register) {
  var count = register.inviteCount + 1;
  dbservice.updateData('Register', {
    'inviteCount': register.inviteCount
  }, {
    'inviteCount': count
  }, function(err, result) {});
}

exports.inviteUrl = inviteUrl;
