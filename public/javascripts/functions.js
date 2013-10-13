var single_dejsoner = function(json, name, first) {
  if(!json)
	return "";
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
  if(!json)
	return "";
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

var grab_req_v1p1 = function(json, time_around) {
  var retval = json.split("\"venue\"",time_around).join();
  console.log(retval);
  return retval;
}

function grab_name_v1p1(json) {
  var retval = json;
  retval = retval.substr(65);
  retval = retval.split("\"",1).join();
  retval = "<div class= \"hero-unit\"><h1>" + retval + "</h1>";
  return retval;
}

var grab_desc_v1p1 = function(json) {
  var temp, n;
  var retval="";

  parse("description",15);
  parse("currency",12);
  parse("website",11);
  parse("phone",9);
  parse("img_url",11);
  parse("street_number",17);
  parse("street",17);
  parse("city",8);
  parse("state",9);
  parse("country",11);
  parse("zipcode",11);
  
  function parse(searcher,adder) {
    n = json.search(searcher);
    temp = json.substr(n+adder);
    temp = temp.split("\",",1).join();
    if (searcher=="img_url") {
      retval += "<img src=\"";
      retval = retval.concat(temp);
      retval += "\" \/>";
    }
    else {
      retval += "<li>";
      retval = retval.concat(temp);
      retval += "</li>";
    }
  }
  retval = retval.split("}",1).join();
  retval = "<p>" + retval + "</li></p>";
  retval += "<p><a class=\"btn btn-primary btn-large\">Take me there!</a></p>";
  retval+="</div>";
  return retval;
}

var how_many_v1p1 = function(string, substring) {
  var result = string.match( RegExp( '(' + substring + ')', 'g' ) ); 
  return result ? result.length : 0;
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
