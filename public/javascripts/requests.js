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
    //console.log("Status", response.statusCode);
    //console.log("Headers", JSON.stringify(response.headers));
    //console.log("Response received", body);
    console.log(body);
    res.render(renlink, {
      title: 'Title',
      data: {
        text: body
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