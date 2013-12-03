$(document).ready(function() {
	/* GRABBING INFO */
	$('.hero-unit').click(function() {
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
				if ( !(mapExists) ) initialize(address, parsed.name);
				position(address, parsed.name);
				$('#restaurant').show();
				populate(parsed);
			},

			error: function() {
				$('#like').text('Couldn\'t find the address');
			}
		});
	});

	/* MAPS */
	var address, map, geocoder;
	var mapExists = false;

	function initialize(streetaddress, name) {
		geocoder = new google.maps.Geocoder();
		var mapOptions = { zoom: 10, center: new google.maps.LatLng(-34.397, 150.644) };
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		mapExists = true;
	}

	function position(streetaddress, name) {
		if (geocoder) {
		geocoder.geocode( { 'address': streetaddress}, function(results, status) {
	        if (status == google.maps.GeocoderStatus.OK) {
	          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
	          map.setCenter(results[0].geometry.location);

	            var infowindow = new google.maps.InfoWindow(
	                { content: '<b>'+name+'</b>', /* address == parameter */
	                  size: new google.maps.Size(150,50) });

	            var marker = new google.maps.Marker({
	                position: results[0].geometry.location,
	                map: map, title: name }); 
	            
	            infowindow.open(map,marker);

	          } else {alert("No results found");}
	        } else {alert("Geocode was not successful for the following reason: " + status);}
	      });
		}
	}

	/* VENUE TAB */
	function populate( data ) {
		$('#venuetab').empty();
		$('#venuetab').append('<h1>Venue Name: <b>'+data.name+'</b></h1>');
		$('#venuetab').append('<p>Description: <b>'+data.description+'</b></p>');
		$('#venuetab').append('<p>Website: <b>'+data.website+'</b></p>');
		$('#venuetab').append('<p>Image goes here </p>');
		$('#venuetab').append('<p>Phone: <b>'+data.phone+'</b></p>');
		$('#venuetab').append('<p>Location: <b>'+data.location.street+', '+data.location.city+' '+data.location.state+', '+data.location.zipcode+'</b></p>');		
		$('#venuetab').append('</br></br></br>');
		
		$('#venuetab').append(JSON.stringify(data));
	}
});