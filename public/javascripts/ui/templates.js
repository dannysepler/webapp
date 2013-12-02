$(document).ready(function() {
  $('.item img').fadeTo('fast', 0.6);
    // fade in when page is loaded

  $('.item').hover(
    function() {
      $('img', this).stop().fadeTo('fast', 0.8);
    },
    function(){
      $('img', this).stop().fadeTo('fast', 0.6);
    }
  );

  $('.item').click(function() {
    var imgSrc = $('img', this).attr("src");
    $('.mainimage').attr('src',imgSrc);
  });
});