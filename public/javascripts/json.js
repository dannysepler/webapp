var functions = require('./functions.js');

function foodstream( input ) {
	
	var parsed = JSON.parse(input);
    var count = functions.how_many_v1p1(input, "\"description\""); 
    	// grab how many items there are in total
    
    //console.log(count);

    var end = "";
    
    //var obj = input[0];

    //end+=obj;
	for (var i = 1; i < count+1; i++) {
		var object = parsed[i-1];
		end+="<div class= \"hero-unit\" >";
			// end+="id: "+object.food.id+"<br>";
			end+=object.food.name+"<br><br>";
			// end+=object.food.description+"<br>";		
			// end+="<img class=\"fade\" src=\""+object.food.image_url+"\" \/>";
			end+="<img class=\"fade\" src=\""+object.food.image_url+"\" \/>";
		end+="</div>";
    }
    return end;
}


module.exports.foodstream   = foodstream;