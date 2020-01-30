/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // console.log("I\'m ready");

  //Tweet data to load into the page
/*   const data = [
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
  ]; */

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }



  //Function to computer the elapsed time since tweet creation
  const timeElapsed = function(tweetObj) {
    let timeEl = ((Number(Date.now()) - Number(tweetObj.created_at)) / 1000); //Date.now() returns the current Date() as usual, but as a string of digits rather than a formatted date.
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
      <span class="tweet tweets">W X Y Z</span>
    </footer>
    </article>
  `;

    return tweetTemplate;

  };


  //Function that initiates the creation of the html for each tweet and then appends it to the page html.
  const renderTweets = function(tweetsObjArr) {
    tweetsObjArr.forEach((value) => {
      $("#tweets-container").prepend(createTweetElement(value));
    });
  };

  //renderTweets(data);




  // AJAX post method to submit new tweet and store in the tweet database without redirecting the page.

/* const postTweetToServer = function(event) {
  let data = $(this).val()

} */


  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    }).then(function(tweetData) {
      renderTweets(tweetData);
    });
  };

  const errorMessages = function(message) {
    let para = $("div.error-messages > p");
    const slideUp = function() {
      $("section.error-messages").slideUp();
    };
    $("section.error-messages").slideDown();
    setTimeout(slideUp,2000);
    para.html(message);
  }

/* When you have time turn this into a standalone function in a handlers.js file */
  $("#tweet-form").on("submit", function(event) {

    event.preventDefault();
    //Here we receive the data, but we must serialize it for submission via the HTTP post request. It will simply exist as a regular string otherwise.

    /* let para = $("div.error-messages > p"); */
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

  const toggleTweet = function() {
    let newTweet = $("#new-tweet");

    newTweet.css("display") === "none" ? newTweet.slideDown() : newTweet.slideUp();
    $("[name='text']").focus();
  };

  //This allows for a universal toggle of the tweet.
  $("#tweet input").on("click", toggleTweet);

});



//When an error is triggered, slide the error box into view and insert the error text.

