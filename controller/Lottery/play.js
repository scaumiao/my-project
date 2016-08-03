// var keystone = require('keystone');

function rand_promise() {
  var data;

  this.getAwardType().then(function(result) {
    console.log(result);
  });
}

function getRand(list) {
  //计算区间，返回下标
  var result,
    length = 0,
    i = 0,
    randList = [];
  for (i = 0; i < list.length; i++) {
    length += list[i];
  }
  // 0,0,5,15,20,30,30
  // -1,-1,4,19,39,69,99
  randList[0] = list[0] <= 0 ? -1 : list[0] - 1;
  for (i = 1; i < list.length; i++) {
    if (randList[i - 1] < 0) {
      randList[i] = list[i] <= 0 ? -1 : list[i] - 1;
    } else {
      randList[i] = randList[i - 1] + list[i];
    }
  }
  // var rand = Math.round(Math.random() * length);
  var rand = Math.floor(Math.random() * length);
  console.log(rand);
  console.log(randList);
  for (i = 0; i < randList.length; i++) {
    if (rand <= randList[i]) {
      return i;
    }
  }

// for (i = 0; i < array.length; i++) {
//
// }
}

function getAwardType() {
  var data = [];
  var promise = keystone.list('AwardType').model.find().exec();
  return promise.then(function(result) {
    for (var i = 0; i < result.length; i++) {
      var obj = {};
      obj.level = result[i].level;
      obj.probability = result[i].probability;
      data.push(obj);
    }
    return data;
  }, function(error) {
    return error;
  });

}



exports.getAwardType = getAwardType;
exports.rand_promise = rand_promise;
exports.getRand = getRand;
