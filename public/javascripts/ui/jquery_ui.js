$(document).ready(function() {
  $('.fade').hover(
    function() {
      $(this).stop().fadeTo('fast', 1);
    },
    function(){
      $(this).stop().fadeTo('fast', 0.5);
    }
  );

  $("#sticker").sticky({ topSpacing:0 });

  	// changing the image after
  	// it is clicked
  $('.fade').click(function() {
  	var imgSrc = $(this).attr("src");
  	$('#sticker').attr('src',imgSrc);
  });
});