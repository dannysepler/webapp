$(document).ready(function() {
    var large={width: "100%"};
    var small={width: "225px"};
    var count=1;
    	/* 
    		IF COUNT == 1, the popup's not showing 
    		IF COUNT == 0, it is
    	*/

	$('#venuetab').hide();

	$('#restaurant').click(function() {
		$('#venuetab').slideToggle('fast');
			// hide it
	    (count==1)?$('#map-canvas').animate(large, 'fast'):$('#map-canvas').animate(small, 'fast');
	    count = 1-count;
	});

	$('.hero-unit').click(function() {
		hide();
		$('#foot').show();
	});

	function decide() /* decides what to do */
	{ (count==1)?show():hide(); }

	function show() /* shows restaurant info */ 
	{
		
	}

	function hide() /* hides restaurant info */
	{
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