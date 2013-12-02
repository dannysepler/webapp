var functions = require('./functions.js');

function foodstream( input ) {
	//console.log("input is " + input);


	//console.log("input[1] is " + input[0]);
	//console.log("input.description "+input.description)
	//console.log();
	//console.log();

	var object = JSON.parse(input);
	//console.log("turned into an object is ", object);
	//console.log("object[0] is ", object[0]);
	//console.log("object[0].id is", object[0].id);

	//console.log(input[0].food);
	//var parsed = JSON.parse(input);
    var count = functions.how_many_v1p1(input, "\"description\""); 
    	// grab how many items there are in total
    
    //console.log("count is " + count);

    var end = "";
    
    //var obj = input[0];

    //end+=obj;
	for (var i = 1; i < count+1; i++) {
		var goodstuff = object[i-1];
		end+="<div class= \"hero-unit\" >";
			// end+="id: "+object.food.id+"<br>";
			end+=goodstuff.name+"<br>";
			// end+=object.food.description+"<br>";		
			end+="<img class=\"fade\" src=\"http://img.eatable.at"+goodstuff.image_url+"\" \/>";
			console.log("src = http://img.eatable.at"+goodstuff.image_url);
			//end+="<img class=\"fade\" src=\""+goodstuff.image_url+"\" \/>";
			console.log("Added "+goodstuff.name);
		end+="</div>";
    } 
    return end;
}


module.exports.foodstream   = foodstream;