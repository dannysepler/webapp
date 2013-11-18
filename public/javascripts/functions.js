// ~~~~~~~~~~~~~~~
//   EXPERIMENTS
// ~~~~~~~~~~~~~~~

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

  retval=parse("description",15,json,retval);
  retval=parse("currency",12,json,retval);
  retval=parse("website",11,json,retval);
  retval=parse("phone",9,json,retval);
  retval=parse("img_url",11,json,retval);
  retval=parse("street_number",17,json,retval);
  retval=parse("street\"",10,json,retval);
  retval=parse("city",8,json,retval);
  retval=parse("state",9,json,retval);
  retval=parse("country",11,json,retval);
  retval=parse("zipcode",11,json,retval);

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

function parse(searcher,adder,json,retval) {
    var n = json.search(searcher);
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
//  OLD UI PAGE
// ~~~~~~~~~~~~~~

function vert_carousel(i,body) {
  var newbod = grab_req_v1p1(body, i);
  var name1 = stream_name(newbod);
  newbod = stream_desc(newbod);
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
  retval +=stream_parse("img_url",11,json,retval);

  retval = retval.split("}",1).join();
  retval = "<p>" + retval + "</li></p>";
  //retval += "<p><a class=\"btn btn-primary btn-large\">Take me there!</a></p>";
  retval+="</div>";
  return retval;
}

function stream_parse(searcher,adder,json,retval) {
    var n = json.search(searcher);
    temp = json.substr(n+adder);
    temp = temp.split("\",",1).join();
    if (searcher=="img_url") {
      retval += "<img class=\"fade\" src=\"";
      retval = retval.concat(temp);
      retval += "\" height=\"150px\", width=\"250px\" style=\"opacity:0.5;cursor:pointer\" \/>";
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
//  NEW UI PAGE
// ~~~~~~~~~~~~~~

function food_carousel(i,body) {
  var newbod = grab_food_req_v1p1(body, i);
  //var name1 = stream_food_name(newbod);
  newbod = food_desc(newbod);
  return newbod;
}

var grab_food_req_v1p1 = function(json, time_around) {
  var array = json.split("\"food\"",time_around+1);
  var retval = array[time_around];
  return retval;
}

function food_desc(json) {
  var temp, n;
  var retval  = "";
  retval +=food_parse("img_url",200,json,retval);

  retval = retval.split("}",1).join();
  retval = "<p>" + retval + "</li></p>";
  //retval += "<p><a class=\"btn btn-primary btn-large\">Take me there!</a></p>";
  retval+="</div>";
  return retval;
}

function food_parse(searcher,adder,json,retval) {
    var n = json.search(searcher);
    //console.log(n);
    temp = json.substr(n+adder);
    temp = temp.split("\",",1).join();
    console.log(temp);
    if (searcher=="img_url") {
      retval += "<img class=\"fade\" src=\"";
      retval = retval.concat(temp);
      retval += "\", height=\"150px\", width=\"250px\", style=\"opacity:0.5;cursor:pointer\" \/>";
    }
    /*else {
      retval += "<li>";
      retval = retval.concat(temp);
      retval += "</li>";
    }*/

    // console.log(retval);
  return retval;
}

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

// EXPERIMENTS (AND SOME UI)

module.exports.grab_req_v1p1   = grab_req_v1p1;
  // for UI too
module.exports.grab_name_v1p1  = grab_name_v1p1;
module.exports.grab_desc_v1p1  = grab_desc_v1p1;
module.exports.how_many_v1p1   = how_many_v1p1;
module.exports.parse           = parse;


// UI

module.exports.vert_carousel   = vert_carousel;
module.exports.stream_name     = stream_name;
module.exports.stream_desc     = stream_desc;
module.exports.stream_parse    = stream_parse;
module.exports.food_carousel   = food_carousel;
