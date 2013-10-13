$(document).ready(function(){
  $('.fade').hover(
    function() {
      $(this).stop().fadeTo('fast', 1);
    },
    function(){
      $(this).stop().fadeTo('fast', 0.5);
    }
  );

  $("#sticker").sticky({ topSpacing:0 });
});