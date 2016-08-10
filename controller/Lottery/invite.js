var uuid = require('node-uuid');
var Hashids = require('hashids');

var dbservice = require('../DBService/dbservice');

//邀请URL
function inviteUrl(register) {
  var hashids = new Hashids('', 8);
  if (register.inviteUrl) {
    return register.inviteUrl;
  }
  var uuidCode = uuid.v1().replace(/-/g, '');
  return hashids.encode(uuidCode);

// return uuid.v1();
}

// function inviteUrl(register) {
//   if (register.inviteUrl) {
//     return register.inviteUrl;
//   }
//   return uuid.v1().replace(/-/g, '');
// // return uuid.v1();
// }

//邀请记录标志增加
function inviteAdd(register) {
  var count = register.inviteCount + 1;
  dbservice.updateData('Register', {
    'inviteCount': register.inviteCount
  }, {
    'inviteCount': count
  }, function(err, result) {});
}

//抽奖次数增加
function playAdd(register) {
  var count = register.playCount + 1;
  dbservice.updateData('Register', {
    'playCount': register.playCount
  }, {
    'playCount': count
  }, function(err, result) {});
}

exports.inviteUrl = inviteUrl;
exports.inviteAdd = inviteAdd;
