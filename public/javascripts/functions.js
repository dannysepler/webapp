var how_many_v1p1 = function(string, substring) {
  var result = string.match( RegExp( '(' + substring + ')', 'g' ) ); 
  return result ? result.length : 0;
}

function vert_carousel(i,body) {
  var newbod = grab_req_v1p1(body, i);
  var name1 = stream_name(newbod);
  newbod = stream_desc(newbod);
  return newbod;
}

function food_carousel(i,body) {
  var newbod = grab_food_req_v1p1(body, i);
  newbod = food_desc(newbod);
  return newbod;
}

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

module.exports.how_many_v1p1   = how_many_v1p1;
module.exports.vert_carousel   = vert_carousel;
module.exports.food_carousel   = food_carousel;
