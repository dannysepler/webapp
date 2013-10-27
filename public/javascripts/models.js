function City(data) {
	this.id = data.id;
	this.name = data.name;
}

function Country(data) {
	this.id = data.id;
	this.name = data.name;
}

function Food( data ) {
	this.id = data.id;
	this.name = data.name;
	this.description = data.description;
	this.image_url = data.image_url;
	this.makeFeatured = function() {
		console.log("Must implement makeFeatured!");
	}
}

function State(data) {
	this.id = data.id;
	this.name = data.name;
}

function Street(data) {
	this.id = data.id;
	this.name = data.name;
}

function User(data) {
	this.id = data.id;
	this.name = data.name;
	this.email = data.email;
	this.first_name = data.first_name;
	this.last_name = data.last_name;
	this.provider = data.provider;
	this.uid = data.uid;
	this.token = data.token;
	this.expires_at = data.expires_at;
	this.expires = data.expires;
}

function Venue(data) {
	this.id = data.id;
	this.name = data.name;
	this.phone = data.phone;
	this.description = data.description;
	this.currency = data.currency;
	this.website = data.website;
}

function Zipcode(data) {
	this.id = data.id;
	this.zipcode = data.zipcode;
}

// EXPORTS
module.exports.City = City;
module.exports.Country = Country;
module.exports.Food = Food;
module.exports.State = State;
module.exports.Street = Street;
module.exports.User = User;
module.exports.Venue = Venue;
module.exports.Zipcode = Zipcode;
