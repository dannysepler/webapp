$(document).ready(function() {
    var large={width: "100%"};
    var small={width: "225px"};
    var count=1; 

	$('#venuetab').hide();

	$('#restaurant').click(function() {
		$('#venuetab').slideToggle('fast');
			// hide it
	    (count==1)?$('#map-canvas').animate(large, 'fast'):$('#map-canvas').animate(small, 'fast');
	    count = 1-count;
	});

	$('.hero-unit').click(function() {
		slideback();
		$('#foot').show();
	});

	function slideback() {
		if ( $('#venuetab').is( ":visible") ) {
			$('#venuetab').slideToggle('fast');
			// hide it
		}

		if ( !(count) ) {
			$('#map-canvas').animate(small);
	    	count = 1-count;
		}
	}
});