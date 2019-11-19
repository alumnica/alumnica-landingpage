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

function send_suscriber(){
  console.log("in suscribe")

  fetch('http://127.0.0.1:8000/contacts/suscriber/', {
  	method: 'post',
    headers: new Headers({
		'Content-Type': 'application/json',
    'Accept': 'application/json'
    }),
  	body: JSON.stringify({
  		email: document.getElementById('email_suscriber').value,
  	})
  });
}

function send_contact(){
  console.log("in contact")

  fetch('http://127.0.0.1:8000/contacts/contact/', {
  	method: 'post',
    headers: new Headers({
		'Content-Type': 'application/json',
    'Accept': 'application/json'
    }),
  	body: JSON.stringify({
      name: document.getElementById('nombre').value,
  		email: document.getElementById('email').value,
      phone: document.getElementById('telefono').value,
      msg: document.getElementById('mensaje').value,

  	})
  });
}
