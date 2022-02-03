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

  const createTweetElement = function(callTweet) {
  let $tweet = `
    <article>
      <div class="tweet-header">
        <span><img class="avatarImg" src="${callTweet.user.avatars}"> ${callTweet.user.name}</span> <span>${callTweet.user.handle}</span>
      </div>
      <br>
      <p class="tweet-content">${callTweet.content.text}.</p>
      <input type="text">
      <footer>
        <span>${timeago.format(callTweet.created_at)}</span> <span class="tweet-icons"><i class="fas fa-flag"></i><i class="fas fa-retweet"></i> <i class="fas fa-heart"></i></span> 
      </footer>
    </article>
  `
  return $tweet;
  }

  $('form').on('submit', function(event) {
    event.preventDefault();
    const serForm = $('form').serialize();
   let textareaVal = $('#tweet-text').val()
  //  console.log(textareaVal);
   if(textareaVal === '') {
     console.log('yes')
     alert('Text area is empty, please fill in and submit');
   } else if(textareaVal === null) {
     alert('Text area is null, please fill correctly and submit');
   }
    $.post('/tweets', serForm).then(function() {
      // console.log(data)
      // console.log(renderTweets(data))
      renderTweets(tweetObj);
    })
  });
 
  let tweetObj = {};
  const loadTweets = function() {
    $.get('/tweets', function(data) {
      console.log('this is load tweets', data);
      tweetObj = data;
      // console.log(tweetObj)
    })
  }
  loadTweets();
});