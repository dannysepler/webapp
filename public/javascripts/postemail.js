var request = require("request");

request({
  	url: "http://eatable1.apiary.io/foods.json",
  	body: "{ \"food\": { \"name\": \"Cheese Pizza\", \"description\": \"Super cheesey!\" }  }",
		headers: {"Content-Type": "application/json"},
  	method: "POST"
}, function (error, response, body) {
  	console.log("Status", response.statusCode);
  	console.log("Headers", JSON.stringify(response.headers));
		console.log("Response received", body);
});