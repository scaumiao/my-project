function judge(right, answer) {
  var correct = 0;
  if (right.length != answer.length) {
    return false;
  }
  for (var i = 0; i < answer.length; i++) {
    for (var j = 0; j < right.length; j++) {
      if (right[j] === answer[i]) {
        correct++;
        break;
      }
    }
    if (correct <= i) {
      return false;
    }
  }
  return true;
}

function pick(questions, count) {
  var index = [],
    rand;
  for (var i = 0; i < count; i++) {
    rand = Math.floor(Math.random() * questions.length);
    while (index.indexOf(rand) != -1) {
      rand = Math.floor(Math.random() * questions.length);
    }
    index.push(rand);
  }
  return index;
}

exports.pick = pick;
exports.judge = judge;
