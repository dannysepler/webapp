// ~~~~~~~~~~~~~~~
//    VERSION 1
// ~~~~~~~~~~~~~~~

var single_dejsoner = function(json, name, first) {
  json=json.replace("[","");
  json=json.replace("]","");
  json=json.replace(" ]","");
  for (var i = 0; i<json.length-1;i++) {
    json=json.replace("{\""+name+"\":{\""+first+"\":\"","<li>");
    json=json.replace("\"}},","</li>");
  }
  json=json.replace("\"}}","</li>");
  json=json.replace(" ","")
  return json;
}

function double_dejsoner(json, name, first, second) {
  json=json.replace("[","");
  json=json.replace("]","");
  json=json.replace(" ]","");
  for (var i = 0; i<json.length-1;i++) {
    json=json.replace("{\""+name+"\":{\""+first+"\":\"","<li>");
    json=json.replace("\""+second+"\":\""," &clubs; ");
    json=json.replace("\",","");
    json=json.replace("\"}},","</li>");
  }
  json=json.replace("\"}}","");
  json=json.replace(" ","")
  return json;
}

function unlister(input) {
  input=input.replace("<li>","");
  input=input.replace("</li>","");
  return input;
}
// ~~~~~~~~~~~~~~
//   VERSION 2
// ~~~~~~~~~~~~~~
var grab_req_v1p1 = function(json, time_around) {
  var array = json.split("\"venue\"",time_around+1);
  var retval = array[time_around];
  return retval;
}

function grab_name_v1p1(json) {
  var retval = json;
  var loc = json.search("name");
  retval = retval.substr(loc+8);
  retval = retval.split("\"",1).join();
  retval = "<div class= \"hero-unit\"><h1>" + retval + "</h1>";
  return retval;
}

var grab_desc_v1p1 = function(json) {
  var temp, n;
  var retval="";

  //parse("description",15);
  //parse("currency",12);
  //parse("website",11);
  //parse("phone",9);
  retval += parse("img_url",11,json,retval);
  //parse("street_number",17);
  //parse("street\"",10);
  //parse("city",8);
  //parse("state",9);
  //parse("country",11);
  //parse("zipcode",11);

  retval = retval.split("}",1).join();
  retval = "<p>" + retval + "</li></p>";
  //retval += "<p><a class=\"btn btn-primary btn-large\">Take me there!</a></p>";
  retval+="</div>";
  return retval;
}

var how_many_v1p1 = function(string, substring) {
  var result = string.match( RegExp( '(' + substring + ')', 'g' ) ); 
  return result ? result.length : 0;
}

function parse(searcher,adder,json,retval) {
    n = json.search(searcher);
    temp = json.substr(n+adder);
    temp = temp.split("\",",1).join();
    if (searcher=="img_url") {
      retval += "<img src=\"";
      retval = retval.concat(temp);
      retval += "\" height=\"150px\", width=\"250px\" \/>";
    }
    else if (searcher=="street_number") {
      retval += "<li>";
      retval = retval.concat(temp);
      retval += " ";
    }
    else if (searcher=="street\"") {
      retval = retval.concat(temp);
      retval += "</li>";
    }
    else {
      retval += "<li>";
      retval = retval.concat(temp);
      retval += "</li>";
    }

  return retval;
}

// ~~~~~~~~~~~~~~
//   VERSION 3
// ~~~~~~~~~~~~~~

function vert_carousel(i,body) {
  var newbod = grab_req_v1p1(body, i);
  var name1 = stream_name(newbod);
  newbod = stream_desc(newbod);
  //name1 += newbod;
  return newbod;
}

function stream_name(json) {
  var retval = json;
  var loc = json.search("name");
  retval = retval.substr(loc+8);
  retval = retval.split("\"",1).join();
  retval = "<h1>" + retval + "</h1>";
  return retval;
}

function stream_desc(json) {
  var temp, n;
  var retval  = "";
  retval +=parse("img_url",11,json,retval);

  retval = retval.split("}",1).join();
  retval = "<p>" + retval + "</li></p>";
  return retval;
}

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

module.exports.single_dejsoner = single_dejsoner;
module.exports.double_dejsoner = double_dejsoner;
module.exports.unlister        = unlister;
module.exports.grab_req_v1p1   = grab_req_v1p1;
module.exports.grab_name_v1p1  = grab_name_v1p1;
module.exports.grab_desc_v1p1  = grab_desc_v1p1;
module.exports.how_many_v1p1   = how_many_v1p1;
module.exports.parse           = parse;
module.exports.vert_carousel   = vert_carousel;
module.exports.stream_name     = stream_name;
module.exports.stream_desc     = stream_desc;