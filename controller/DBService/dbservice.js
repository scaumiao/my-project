//操作数据库服务层
//读取数据库，封装所需数据格式
var keystone = require('keystone');
var domain = require('domain');

function saveData(tableName, obj, callback) {
  // 判断tableName是否存在
  // 判断字段是否正确
  // 保存提交
  try {
    var list = keystone.list(tableName);

    var item = new list.model();
    item.set(obj).save(function(err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  // console.log(item.save());
  } catch (e) {
    callback(e);
  }
// var list = keystone.list(tableName);
// if (!list) {
//   callback('不存在表' + tableName);
// } else {
//   var item = new list.model();
//   item.set(obj).save(function(err, result) {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result);
//     }
//   });
//   // console.log(item.save());
//
// }
}

function deleteData(tableName) {
  var model = keystone.list(tableName).model;
}

function updateData(tableName) {
  var model = keystone.list(tableName).model;
}

function findAllData(tableName, callback) {

  var model = keystone.list(tableName).model;
  model.find().exec().then(function(result) {
    if (!result) {
      callback('did not find');
    }
    callback(null, result);
  });

}

function findOneData(tableName, callback) {
  var model = keystone.list(tableName).model;
  model.find().exec().then(function(result) {
    console.log('result');
  // callback(result);
  });
}

function openDB() {

}

//查找question，封装
function findQuestion(tableName, callback) {
  try {
    var model = keystone.list(tableName).model;
    model.find().exec().then(function(result) {
      console.log('result');
      callback(null, result);
    });
  } catch (e) {
    callback(e);
  }

}

exports.findQuestion = findQuestion;
exports.findAllData = findAllData;
exports.saveData = saveData;
