(function ($) {
  $(document).ready(function () {
    //Appens the tweets by newest into an array
    const renderTweets = function (tweets) {
      // loops through tweets
      for (const tweet of tweets) {
        // console.log(tweet)
        // calls createTweetElement for each tweet
        let callTweet = createTweetElement(tweet)
        // takes return value and appends it to the tweets container
        $('#tweets-container').prepend(callTweet);
      }
    }

    //escape function given in compass
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //Tweet template
    const createTweetElement = function (callTweet) {
      let $tweet = `
    <article>
      <div class="tweet-header">
        <span><img class="avatarImg" src="${escape(callTweet.user.avatars)}"> ${escape(callTweet.user.name)}</span> <span class="tweet-handle">${escape(callTweet.user.handle)}</span>
      </div>
      <br>
      <p class="tweet-content">${escape(callTweet.content.text)}.</p>
      <input type="text" disabled>
      <footer>
        <span>${escape(timeago.format(callTweet.created_at))}</span> <span class="tweet-icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span> 
      </footer>
    </article>
  `
      return $tweet;
    }
    //Listening for sumbit event on the form
    $('form').on('submit', function (event) {
      // $('.counter').text(140)
      //Put the textarea value taken from it's attached class into a variable
      let textareaVal = $('#tweet-text').val()

      // console.log('this is text', textareaVal[0])
      if (textareaVal === ' ') {
        console.log('yes')
      }
      //conditions to check against the variable and return the error plus prevent it from posting
      if (textareaVal[0] === " " || textareaVal.length === 0) {
        $('.error').text('Input is empty, please fill in correctly and submit⚠️').slideDown();
        return false
      } else if (textareaVal.length > 140) {
        $('.error').text("You've exceeded the maximum characters allowed, please fill in correctly and submit⛔").slideDown();
        return false;
      } else if (textareaVal === null) {
        $('.error').text('😔Text area is null 😔, please fill correctly and submit').slideDown();
        return false
        //if none apply then we remove text within the div that has the error class
      } else {
        $('.error').empty();
      }

      event.preventDefault();
      const serForm = $('form').serialize();

      $.post('/tweets', serForm).then(function (data) {
        //Keeps all added tweets in an object
        renderTweets(data);
        $.get('/tweets', function (data) {
          console.log('this is load tweets', data.slice(-1));
          //removes everything but the last(lastest) user information within the array
          let slicedTweet = data.slice(-1);
          renderTweets(slicedTweet);
          // console.log(slicedTweet)
        })
      })
    });
    //gets the data and loads all the tweets
    const loadTweets = function () {
      $.get('/tweets', function (data) {
        renderTweets(data);
      })
    }
    loadTweets();
  });
})(jQuery)