function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(28.1000, 81.6000),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);