(function ($) {
  $(document).ready(function () {
    $('#tweet-text').on('input', function () {
      //since we're withing the textarea this = to the value of it
      let text = $(this);
      //then minus the length of the text from the count
      let count = 140 - text.val().length;

      //A way to target the counter class is going through the tree 
      //we go up from the child(textarea) and find the closest parent that  = form
      let findParent = text.closest('form')
      //then from that parent we go down through its children and find the matching class(.counter)
      let findCounter = findParent.find('.counter')
      //then we take that variable that contains the found class and replace the text within it with whatever value count has
      findCounter.text(count)
      
      if (count < 0) {
        $('.counter').addClass('negative');
        //Need else to remove class
      } else {
        $('.counter').removeClass('negative');
      }
    })
  });
})(jQuery);
