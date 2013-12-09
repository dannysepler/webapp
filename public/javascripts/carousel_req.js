var request = require('request');
var jsonfunctions = require('./json.js');

var actual_food_carousel=function(link,renlink,userid,res){
  request({
    url: "http://api.eatable.at:5000/"+link+".json",
    body:"{\"user_id\": \""+userid+"\",\"do_expire\" : \"true\",\"per_page\" : \"20\",\"lat\" : 29.650276,\"lon\" : -82.326793,\"within\" : 5.0 }",
    headers: {"Content-Type": "application/json", "X-API-Version": "0.2.0-alpha" },
    method: "POST"
  }, function (error, response, body) {
    var end = jsonfunctions.foodstream(body);

    // render it!
    res.render(renlink, {
      title: 'Food Carousel',
      data: { header: end }
    });

  });
}


/*	~~~~~~~~~~~~~~~~
		  THE NAMES
	 ~~~~~~~~~~~~~~~~ */
module.exports.actual_food_carousel= actual_food_carousel;