$(document).ready(function() {
  let counter = $('.counter').html();
  $('#tweet-text').keypress(function() {    
   counter--
   if(counter < 0) {
    $('.counter').addClass('negative');
  }
  //  console.log(counter)
   $('.counter').text(counter)
 })
});