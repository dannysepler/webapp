
$(document).ready(function() {
	$('.hero-unit').click(function() {
		var id = this.id;

		$.get('http://api.eatable.at:5000/foods/'+id+'.json', function( data ) {
			var parsed = JSON.parse(data);
			
			$('#desc').text(parsed.description);			

			if ( $('#desc').text() == "" )
				$('#desc').text('No description available');
		});

		$.ajax({
			//url : 'http://api.eatable.at:5000/foods/search/serves.json',
			url : 'http://eatableapittest2.apiary.io/foods/search/serves.json',
			dataType:"json",
			contentType:"application/json; charset=utf-8",


			type : 'POST',
			data: [{"food_id": "1"}, {"food_id": "2"}],
			success: function(data) {
				var parsed = data[0];
				var address = parsed.location.street+", "+parsed.location.city+" "+parsed.location.state;
				$('#like').text(parsed.name+" at "+address);
				//$('#map').text(JSON.stringify(data[0]));
			},
			error: function() {
				//$('#map').text('error...');
			}
		});
  	});
});