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

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES!
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

module.exports.single_dejsoner = single_dejsoner;
module.exports.double_dejsoner = double_dejsoner;
module.exports.unlister = unlister;