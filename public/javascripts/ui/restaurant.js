$(document).ready(function() {
	$('#venuetab').hide();

	$('#restaurant').click(function() {
		$('#venuetab').slideToggle('slow');
			// hide it
		$('#map-canvas').toggle(function() {
	      $(this).animate({width:"200px"});
	    }, function() {
	      $(this).animate({width:"475px"});
	    });
		
		//$('#map-canvas').toggle('slow');	
	});

	$('.hero-unit').click(function() {
		slideback();
	});

	function slideback() {
		if ( $('#venuetab').is( ":visible ") ) {
			$('#venuetab').slideToggle('slow');
			// hide it
		}
	}
});