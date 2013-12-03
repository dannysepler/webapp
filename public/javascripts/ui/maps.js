

$(document).ready(function() {
	// grab the address first!
	var address;
	var mapExists = false;

	$('.hero-unit').click(function() {
		$('#like').text("clicked");
		$.ajax({
			//url : 'http://api.eatable.at:5000/foods/search/serves.json',
			url : 'http://eatableapittest2.apiary.io/foods/search/serves.json',
			dataType:"json",
			contentType:"application/json; charset=utf-8",

			type : 'POST',
			data: [{"food_id": "1"}, {"food_id": "2"}],
			success: function(data) {
				var parsed = data[0];
				address = parsed.location.street+", "+parsed.location.city+" "+parsed.location.state;
				$('#like').text(parsed.name+" at "+address);
				
				if (mapExists == false) {
					initialize(address, parsed.name);
					mapExists = true;
				}

				position(address, parsed.name);

			},
			error: function() {
				$('#like').text('Couldn\'t fint the address');
			}
		});
	});

	var map;
	var geocoder;

	function initialize(streetaddress, name) {
		geocoder = new google.maps.Geocoder();
		var mapOptions = {
			zoom: 10,
			center: new google.maps.LatLng(-34.397, 150.644)
		};
		map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);
	}

	function position(streetaddress, name) {
		if (geocoder) {
		geocoder.geocode( { 'address': streetaddress}, function(results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
	          map.setCenter(results[0].geometry.location);

	            var infowindow = new google.maps.InfoWindow(
	                { content: '<b>'+name+'</b>', /* address == parameter */
	                  size: new google.maps.Size(150,50)
	                });

	            var marker = new google.maps.Marker({
	                position: results[0].geometry.location,
	                map: map, 
	                title: name
	            }); 
	            infowindow.open(map,marker);
	          } else {alert("No results found");}
	        } else {alert("Geocode was not successful for the following reason: " + status);}
	      });
		}
	}

	//google.maps.event.addDomListener(window, 'load', initialize);
});