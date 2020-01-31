/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  //Escape function to protect against script injection
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Function to computer the elapsed time since tweet creation
  const timeElapsed = function(tweetObj) {
    let timeEl = ((Number(Date.now()) - Number(tweetObj.created_at)) / 1000);

    let timeElStr = "";
    
    if (timeEl >= 31536000) {
      timeElStr += `${(Math.floor(timeEl / 31536000))} y `;
      timeEl -= (Math.floor(timeEl / 31536000)) * 31536000;

    } if (timeEl >= 86400) {
      timeElStr += `${(Math.floor(timeEl / 86400))} d `;
      timeEl -= (Math.floor(timeEl / 86400)) * 86400;

    } if (timeEl >= 3600) {
      timeElStr += `${(Math.floor(timeEl / 3600))} h `;
      timeEl -= (Math.floor(timeEl / 3600)) * 3600;

    } if (timeEl >= 60) {
      timeElStr += `${(Math.floor(timeEl / 60))} min `;
      timeEl -= (Math.floor(timeEl / 60)) * 60;
    } else if (timeEl < 60) {
      timeElStr += `0 min `;
    }
    return timeElStr + "ago";
  };

  //Function to create the html for the tweet object
  const createTweetElement = function(tweetObj) {

    let tweetTemplate = `
    <article class="tweets">
      <header>
        <div class="img-name">
          <img src="${escape(tweetObj.user.avatars)}">
          <span class="name tweets">${escape(tweetObj.user.name)}</span>
        </div>
        <span class="username tweets">${escape(tweetObj.user.handle)}</span>
      </header>
        <p><b>${escape(tweetObj.content.text)}</b></p>
      <footer>
        <span class="time tweets">${timeElapsed(tweetObj)}</span>
        <div id="symbols">
          <img src="https://img.icons8.com/ultraviolet/40/000000/good-quality.png">
          <img src="https://img.icons8.com/office/40/000000/hummingbird.png">
          <img src="https://img.icons8.com/officel/40/000000/empty-flag.png">
        </div>
      </footer>
    </article>
  `;
    return tweetTemplate;
  };


  //Function that initiates the creation of the html for each tweet and then prepends it to the page html.
  let tweetsContainer = $("#tweets-container");
  const renderTweets = function(tweetsObjArr) {
    tweetsContainer.empty();
    tweetsObjArr.forEach((value) => {
      $("#tweets-container").append(createTweetElement(value));
    });
  };


  //This function is used within the main post function to get the tweets and display them on the page.
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function(tweetData) {
      renderTweets(tweetData);
    });
  };

  //Function to implement the sliding of and text within the error messages
  const errorMessages = function(message) {
    let para = $("div.error-messages > p");
    const slideUp = function() {
      $("section.error-messages").slideUp();
    };
    $("section.error-messages").slideDown();
    setTimeout(slideUp,2000);
    para.html(message);
  };


  //This is the main function for posting new tweets and then getting the tweet data object.
  $("#tweet-form").on("submit", function(event) {
    event.preventDefault();

    let data = $("[name='text']").val();

    if (data === "" || data === null) {
      errorMessages("What'd you do that for? There's nothing here!");
      return;

    } else if (data.length > 140) {
      errorMessages("Toooooooooo loooooooooong!");
      return;

    } else {
      data = $(this).serialize();

      $.ajax({
        url: "/tweets",
        method: "POST",
        data: data
      }).then(function() {
        $("#tweet-form").trigger("reset"); //resets the form field
        $(".counter").text(140);
        loadTweets();
      });
    }
  });

  //Function to handle the toggling of the tweet visibility based on clicking the "new tweet" button.
  const toggleTweet = function() {
    let newTweet = $("#new-tweet");

    newTweet.css("display") === "none" ? newTweet.slideDown() : newTweet.slideUp();
    $("[name='text']").focus();
  };

  //This allows for a universal toggle of the tweet.
  $("#tweet input").on("click", toggleTweet);

});