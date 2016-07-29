var keystone = require('keystone');



function play() {

}

function get_rand(list) {
  //从数据库中读取数量跟几率，计算区间
}

function get_list() {
  return keystone.list('Post').model.find().where('state', 'published').exec(
    function(err, posts) {
      if (!err) {
        console.log(posts);
      } else {
        console.log(err);
      }
    });
}

exports.get_list = get_list;
exports.play = play;
