var functions = require('./functions.js');

function foodstream( input ) {

	var object = JSON.parse(input);
    var count = functions.how_many_v1p1(input, "\"description\""); 
    	// grab how many items there are in total    
    
    var end = "";
    
	for (var i = 1; i < count+1; i++) {
		var goodstuff = object[i-1];
		end+="<div class= \"hero-unit\" id=\""+goodstuff.id+"\">";
			end+=goodstuff.name+"<br>";
			end+="<img class=\"fade\" src=\"http://img.eatable.at"+goodstuff.image_url+"\" \/>";
		end+="</div>";
    }

    return end;
}


module.exports.foodstream   = foodstream;