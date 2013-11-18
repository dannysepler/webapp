var functions = require('./functions.js');

function foodstream( input ) {
	
	var parsed = JSON.parse(input);
    var count = functions.how_many_v1p1(input, "\"food\""); 
    	// grab how many items there are in total
    var end = "";
    
	for (var i = 1; i < count+1; i++) {
		var object = parsed[i-1];
		end+="<div class= \"hero-unit\" style=\"width:200px;\" >";
		end+=object.food.name+"<br>";
		end+="<img class=\"fade thumbnails\" src=\""+object.food.image_url+"\" height=\"200px\" width=\"200px\" \/>";
		end+="</div>";
    }
    return end;
}


module.exports.foodstream   = foodstream;