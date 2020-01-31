
$(document).ready(() => {

  $("[name='text']").on("keyup",function() {
    let charRem = 140 - $(this).val().length;

    if (charRem >= 0) {
      $(".counter").css("color","#545149").text(charRem);

    } else {
      $(".counter").css("color","red").text(charRem);

    }

  });
  
});