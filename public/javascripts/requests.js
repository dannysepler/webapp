var request = require('request');
var functions = require('./functions.js');


var get_request = function(link,first,second,response) {
	request({
    	url: "http://api.eatable.at:3000/"+link+".json",
    	method: "GET"
  	}, function (error, response, body) {
    	return functions.single_dejsoner(body,first,second);
  	});
}

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
    
    // I'm going to want to create a function to figure out how
    // many venues there are

    // Then i'm gonna loop the following statements for each
    // venue, adding on the text to what I had from the previous loop

    newbod = functions.grab_req_v1p1(body, 2);
    name1  = functions.grab_name_v1p1(newbod);
    newbod = functions.grab_desc_v1p1(newbod);
    name1 += newbod;



    res.render(renlink, {
      title: 'Title',
      data: {
        text: newbod,
        header: name1
      }
    });
  });
}

/*	~~~~~~~~~~~~~~~~
		THE NAMES
	~~~~~~~~~~~~~~~~ */

module.exports.post_request = post_request;
module.exports.get_request  = get_request;
module.exports.put_request  = put_request;
module.exports.apiary_post  = apiary_post;