var how_many_v1p1 = function(string, substring) {
  var result = string.match( RegExp( '(' + substring + ')', 'g' ) ); 
  return result ? result.length : 0;
  /* this function grabs how many food items are in
  a json object */
}

/*  ~~~~~~~~~~~~~~~~~~~~~~~~
      HERE ARE THE NAMES
    ~~~~~~~~~~~~~~~~~~~~~~~~    */

module.exports.how_many_v1p1   = how_many_v1p1;
