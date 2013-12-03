$(document).ready(function() {
	$('.hero-unit').click(function() {
		$.get('http://api.eatable.at:5000/foods/'+this.id+'.json', function( data ) {
			var parsed = JSON.parse(data);
			$('#desc').text(parsed.description);			
			if ( $('#desc').text() == "" ) 
				$('#desc').text('No description available');
		});
  	});
});