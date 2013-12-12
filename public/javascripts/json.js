var functions = require('./functions.js');

function foodstream( input ) {
	var object = JSON.parse(input); var end = "";
    var count = functions.how_many_v1p1(input, "\"description\""); 
    	// grab how many items there are in total    
        
	for (var i = 1; i < count+1; i++) {
		var goodstuff = object[i-1];
		end	+="<div class= \"hero-unit\" id=\""+goodstuff.id+"\">"
			+ goodstuff.name+"<br>"
			+"<img class=\"fade\" src=\"http://img.eatable.at"+goodstuff.image_url+"\" \/>"
			+"</div>";
    }
    return end;
}


module.exports.foodstream   = foodstream;