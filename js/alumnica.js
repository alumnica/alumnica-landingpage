(function($, global, document) {
  $(function() {
    // Start of use strict
    "use strict";

    $("#footer").load("footer.html");

    $("#navbar").load("nav_bar.html", function() {
      var hamburger = $(".hamburger");

      hamburger.click(function() {
        $("#mobileMenu").collapse("toggle");
        $(this).toggleClass("is-active");
      });
    });


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

    //contact_form
    $("#contact_button").click(function send_contact() {
      console.log("in contact");
      let name = $("#nombre").val();
      let email = $("#email").val();
      let phone = $("#telefono").val();
      let msg = $("#mensaje").val();

      fetch("https://landing.alumnica.org/contacts/contact/", {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          msg: msg
        })
      });

      $("#success_contact").toggleClass("d-none");
      $("<h3>¡Muchas gracias por tu interés " + name + "!</h3>").prependTo(
        "#success_contact"
      );
      $("#contact_form").toggleClass("d-none");
    });

    //subscriber_form
    $("#subscriber_button").click(function send_subscriber() {
      console.log("in suscribe");

      let email = $("#email_suscriber").val()

      fetch("http://landing.alumnica.org/contacts/suscriber/", {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify({
          email: email
        })
      });

      $("#success_subscriber").toggleClass("d-none");
      $("#subscribe_form").toggleClass("d-none");
    });

    // End of use strict
  });
})(jQuery, window, document);
