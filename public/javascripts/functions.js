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

var grab_req_v1p1 = function(json, time_around) {
  var retval = json.split("\"venue\"",2).join();
  return retval;
}

function grab_name_v1p1(json) {
  var retval = json;
  retval = retval.substr(65);
  retval = retval.split("\"",1).join();
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
  retval += "</li>";
  return retval;
}

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES!
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

module.exports.single_dejsoner = single_dejsoner;
module.exports.double_dejsoner = double_dejsoner;
module.exports.unlister        = unlister;
module.exports.grab_req_v1p1   = grab_req_v1p1;
module.exports.grab_name_v1p1  = grab_name_v1p1;
module.exports.grab_desc_v1p1  = grab_desc_v1p1;