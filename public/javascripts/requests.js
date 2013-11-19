var request = require('request');
var functions = require('./functions.js');
var jsonfunctions = require('./json.js');

//var fb = require('./javascripts/projects/social/fb-pic-head.js');

var post_request = function(link,first,second,element,response) {
	request({
    	url: "http://api.eatable.at:3000/"+link+".json",
    	body: "{ \""+first+"\": { \""+second+"\": \""+element+"\" } }",
    	headers: {"Content-Type": "application/json"},
    	method: "POST"
  	}, function (error, response, body) {
  	});
  	response.redirect('/app');
}

var post_anything = function(where,body,redirect,res) {
  // for requests where all json is created outside of them
  request({
      url: "http://api.eatable.at:5000/"+where+".json",
      body: body,
      headers: {"Content-Type": "application/json"},
      method: "POST"
    }, function (error, res, body) {
    });
    res.redirect('\''+redirect+'\'');
}

var put_request = function(link,number,first,second,element,response) {
	request({
    	url: "http://api.eatable.at:3000/"+link+"/+"+number+".json",
    	body: "{ \""+first+"\": { \""+second+"\": \""+element+"\" } }",
    	headers: {"Content-Type": "application/json"},
    	method: "PUT"
  	}, function (error, response, body) {
  	});
  	response.redirect('/app');
}

var apiary_post = function(link,number,first,second,renbool,renlink,res){
  request({
    url: "http://eatable.apiary.io/"+link+".json",
    body: "{ \""+first+"\": { \""+second+"\": \""+number+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    var newbod, name1;
    var end= "";
    
    // I'm going to want to create a function to figure out how
    // many venues there are
    var text = functions.how_many_v1p1(body, "\"venue\"");
    //console.log(text); // DONE!

    // Then i'm gonna loop the following statements for each
    // venue, adding on the text to what I had from the previous loop
    
    for (var i = 1; i < text; i++) {
      newbod = functions.grab_req_v1p1(body, i);
      name1 = functions.grab_name_v1p1(newbod);
      newbod = functions.grab_desc_v1p1(newbod);
      name1 += newbod;
      end += name1;
    }

    res.render(renlink, {
      title: 'Title',
      data: {
        text: newbod,
        header: end
      }
    });
  });
}

/*var fb_login = function(res) {
  var json = fb.LoginwReturn();
  post_anything('users',json,'projects',res);
}*/

var vert_carousel=function(link,number,first,second,renbool,renlink,res){
  request({
    url: "http://eatable.apiary.io/"+link+".json",
    body: "{ \""+first+"\": { \""+second+"\": \""+number+"\" } }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    //var end= "<div class= \"hero-unit\">";
    var end = "";
    var text = functions.how_many_v1p1(body, "\"venue\""); 
    for (var i = 1; i < text+1; i++) {
      end+=functions.vert_carousel(i,body);
    }
    //end+="</div>"

    res.render(renlink, {
      title: 'Vertical Carousel',
      data: {
        header: end
      }
    });
  });

}

var food_carousel=function(link,renlink,res){
  request({
    // url: "http://api.eatable.at:5000/"+link+".json",
    url: "http://eatable.apiary.io/"+link+".json",
    body: "{ \"id\": \"21\", \"tree_max\": \"2\" }",
    headers: {"Content-Type": "application/json"},
    method: "POST"
  }, function (error, response, body) {
    console.log(body);

    var end = jsonfunctions.foodstream(body);

    res.render(renlink, {
      title: 'Food Carousel',
      data: {
        header: end
      }
    });
  });
}

var actual_food_carousel=function(link,renlink,userid,res){
  // console.log(userid);

  request({
    url: "http://api.eatable.at:5000/"+link+".json",
    body:"{\"user_id\": \""+userid+"\",\"do_expire\" : \"true\",\"per_page\" : \"20\",\"lat\" : 29.650276,\"lon\" : -82.326793,\"within\" : 5.0 }",
    headers: {"Content-Type": "application/json", "X-API-Version": "0.2.0-alpha" },
    method: "POST"
  }, function (error, response, body) {
    // console.log(body);
    var newres = JSON.parse(body);
    newres = newres.results;
    console.log(newres);

    var end = jsonfunctions.foodstream(newres);

    res.render(renlink, {
      title: 'Food Carousel',
      data: {
        header: end
      }
    });
    
    res.render('logout');
  });
}


/*	~~~~~~~~~~~~~~~~
		  THE NAMES
	 ~~~~~~~~~~~~~~~~ */

module.exports.post_request = post_request;
module.exports.put_request  = put_request;
module.exports.apiary_post  = apiary_post;
module.exports.post_anything= post_anything;
//module.exports.fb_login     = fb_login;
module.exports.vert_carousel= vert_carousel;
module.exports.food_carousel= food_carousel;
module.exports.actual_food_carousel= actual_food_carousel;