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
        console.log('出现错误');
        callback('已存在用户', null);
      } else {
        callback(null, result);
      }
    });

  } catch (e) {

    callback('表名不存在');
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

function findOneData(tableName, condition, callback) {
  try {
    var model = keystone.list(tableName).model;
    var key = condition.key;
    var value = condition.value;
    model.find().where(key, value).exec(key, value).then(function(err, result) {
      if (err) {
        callback(err);
      }
      callback(null, result);
    });
  } catch (e) {
    callback(e);
  }

}

function openDB() {

}

//查找question，封装
function findQuestion(tableName, callback) {
  try {
    var questions = [];
    var model = keystone.list(tableName).model;
    model.find().exec().then(function(result) {
      for (var i = 0; i < result.length; i++) {
        // result[i].title
      }
      console.log('findQuestion');
      callback(null, result);
    });
  } catch (e) {
    callback(e);
  }

}

exports.findOneData = findOneData;
exports.findQuestion = findQuestion;
exports.findAllData = findAllData;
exports.saveData = saveData;
