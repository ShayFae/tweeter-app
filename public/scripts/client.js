/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

// Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }


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
  renderTweets(data);

  $('form').on('submit', function(event) {
    console.log('TEST')
    event.preventDefault();
    const serTest = $('form').serialize();
    console.log(serTest)
    $.post('/tweets', serTest).then(function(data) {
      // console.log(data)
      // console.log(renderTweets(data))
      renderTweets(data);
    })
  });
  
});