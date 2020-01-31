$(document).ready(() => {
  
  let scrollButton = $("#scroll-button");
  

  const scrollFunction = function() {

    if ($("html").scrollTop() > 647) {
      $("#tweet").css("display", "none");

    } else {
      $("#tweet").css("display", "");
    }
  
    if ($("html").scrollTop() > 20) {
      scrollButton.css("display", "block");

    } else {
      scrollButton.css("display", "none");
    }
  };

  const scrToTop = function() {
    $("html").scrollTop(0);
  };

  $(document).on("scroll", scrollFunction);
  
  scrollButton.on("click", function(event) {
    event.preventDefault();
    scrToTop();
  });

});