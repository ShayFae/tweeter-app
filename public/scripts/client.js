/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const renderTweets = function(tweets) {
    // loops through tweets
    for(const tweet of tweets) {
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
  const createTweetElement = function(callTweet) {
  let $tweet = `
    <article>
      <div class="tweet-header">
        <span><img class="avatarImg" src="${escape(callTweet.user.avatars)}"> ${escape(callTweet.user.name)}</span> <span>${escape(callTweet.user.handle)}</span>
      </div>
      <br>
      <p class="tweet-content">${escape(callTweet.content.text)}.</p>
      <input type="text">
      <footer>
        <span>${escape(timeago.format(callTweet.created_at))}</span> <span class="tweet-icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span> 
      </footer>
    </article>
  `
  return $tweet;
  }

  $('form').on('submit', function(event) {
    // $('.counter').text(140)
    //Put the textarea value take from it's attached class into a variable
    let textareaVal = $('#tweet-text').val()
    //conditions to check against the variable and return the error plus prevent it from posting
    if(textareaVal.length === 0) {
      $('.error').text('Text area is empty, please fill in and submit').slideDown();
      return false
    } else if(textareaVal.length > 140) {
      $('.error').text("You've exceeded the maximum characters allowed, please fill in correctly and submit").slideDown();
      return false;
    } else if(textareaVal === null) {
      $('.error').text("'Text area is null, please fill correctly and submit'").slideDown();
      return false
      //if none apply then we remove text within the div that has the error class
    } else {
      $('.error').empty();
    }

    event.preventDefault();
    const serForm = $('form').serialize();

    $.post('/tweets', serForm).then(function(data) {
      //Keeps all added tweets in an object
      renderTweets(data);
      $.get('/tweets', function(data) {
        console.log('this is load tweets', data.slice(-1));
        //removes everything but the last(lastest) user information within the array
        let slicedTweet = data.slice(-1);
        renderTweets(slicedTweet);
        // console.log(slicedTweet)
      })
    })
  });

  const loadTweets = function() {
    $.get('/tweets', function(data) {
      // console.log('this is load tweets', data);
      // tweetObj = data;
      renderTweets(data);
      // console.log('THIS IS WEIRD',tweetObj)
    })
  }
  loadTweets();
});