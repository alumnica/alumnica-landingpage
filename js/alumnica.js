(function($, global, document) {
  $(function() {
    // Start of use strict
    "use strict";

    $("#navbar").load("nav_bar.html", function(){
      var hamburger = $(".hamburger");

      hamburger.click(function() {
        $(this).toggleClass("is-active");
      });
    })

    $("#footer").load("footer.html");

    //Input's Label Interaction
    var input = $("input");
    var textarea = $("textarea");

    input.focus(function() {
      $(this)
        .parents(".form-group")
        .addClass("focused");
    });

    input.blur(function() {
      var inputValue = $(this).val();
      if (inputValue == "") {
        $(this)
          .parents(".form-group")
          .removeClass("focused");
      }
    });

    textarea.focus(function() {
      $(this)
        .parents(".form-group")
        .addClass("focused");
    });

    textarea.blur(function() {
      var inputValue = $(this).val();
      if (inputValue == "") {
        $(this)
          .parents(".form-group")
          .removeClass("focused");
      }
    });

    function sendMail() {
      emailjs.sendForm("gmail", "template_sJc33IhK", "#contact-form").then(
        function(response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function(error) {
          console.log("FAILED...", error);
        }
      );
    }
    // End of use strict
  });
})(jQuery, window, document);
