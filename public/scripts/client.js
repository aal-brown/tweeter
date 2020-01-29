/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  console.log("I\'m ready");

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
  ];


  const createTweetElement = function(tweetObj) {

    let tweetTemplate =  `
    <article class="tweets">
    <header>
      <div class="img-name">
        <img src="${tweetObj.user.avatars}">
        <span class="name tweets">${tweetObj.user.name}</span>
      </div>
      <span class="username tweets">${tweetObj.user.handle}</span>
    </header>
      <p><b>${tweetObj.content.text}</b></p>
    <footer>
      <span class="time tweets">${tweetObj.created_at}</span>
      <span class="tweet tweets">W X Y Z</span>
    </footer>
    </article>
  `;

    return tweetTemplate;

  };




/* let $tweet = createTweetElement(tweetData);

$("#tweets-container").append($tweet);

console.log($tweet); */


  const renderTweets = function(tweetsObjArr) {

    tweetsObjArr.forEach((value) => {
      $("#tweets-container").append(createTweetElement(value));
    });
  };

  renderTweets(data);

});