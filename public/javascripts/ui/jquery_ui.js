$(document).ready(function() {
  $('.fade').fadeTo('fast', 0.5);
    // fade in when page is loaded

  $('.hero-unit').hover(
    function() {
      $('img', this).stop().fadeTo('fast', 1);
    },
    function(){
      $('img', this).stop().fadeTo('fast', 0.5);
    }
  );

  $("#sticker").sticky({ topSpacing:0 });

  	// changing the image after
  	// it is clicked
  $('.hero-unit').click(function() {
    $('.selected').removeClass('selected');
      // make other divs not blue

    $(this).addClass('selected');
      // make this div blue

  	var imgSrc = $('img', this).attr("src");
  	$('#sticker').attr('src',imgSrc);
      // change the image
  });
});