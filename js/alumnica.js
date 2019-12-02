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

    function string_validation(ele) {
      let inputValue = ele.val();
      let form = ele.parents(".validate-form");
      form.removeClass("failed");

      let prevent_xss_attack = /[\<\>\&]/;

      if (inputValue === "" || inputValue.match(prevent_xss_attack)) {
        ele.addClass("is-invalid");
        form.addClass("failed");
      } else {
        ele.removeClass("is-invalid");
      }
    }

    function email_validation(ele) {
      let inputValue = ele.val();
      let form = ele.parents(".validate-form");
      form.removeClass("failed");

      let valid_email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (inputValue === "" || !valid_email_regex.test(inputValue)) {
        ele.addClass("is-invalid");
        form.addClass("failed");
      } else {
        ele.removeClass("is-invalid");
      }
    }

    //Name InputValidation
    $(".string-validation").blur(function() {
      string_validation($(this));
    });

    //Email InputValidation
    $(".email-validation").blur(function() {
      email_validation($(this));
    });

    //Phone InputValidation
    $(".phone-validation").blur(function() {
      let inputValue = $(this).val();
      let form = $("#contact_form");
      form.removeClass("failed");
      let valid_mex_tel_regex = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;

      if (!valid_mex_tel_regex.test(inputValue)) {
        $(this).addClass("is-invalid");
        form.addClass("failed");
      } else {
        $(this).removeClass("is-invalid");
      }

      if (inputValue === "") {
        $(this).removeClass("is-invalid");
      }
    });

    //contact_form
    $("#contact_button").click(function(e) {
      e.preventDefault();
      e.stopPropagation();

      let form = $("#contact_form");

      let name = $("#nombre");
      let email = $("#email");
      let phone = $("#telefono");
      let msg = $("#mensaje");

      string_validation(name);
      string_validation(msg);
      email_validation(email);

      if (!form.hasClass("failed")) {
        fetch("http://127.0.0.1:8000/contacts/contact/", {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
          }),
          body: JSON.stringify({
            name: name.val(),
            email: email.val(),
            phone: phone.val(),
            msg: msg.val()
          })
        });

        $("#success_contact").toggleClass("d-none");
        $(
          "<h3>¡Muchas gracias por tu interés " + name.val() + "!</h3>"
        ).prependTo("#success_contact");
        form.toggleClass("d-none");
      } else {
        return false;
      }
    });

    //subscriber_form
    $("#subscriber_button").click(function(e) {
      console.log("in suscribe");
      e.preventDefault();
      e.stopPropagation();

      let form = $("#subscribe_form");
      let email = $("#email_suscriber");

      email_validation(email);

      if (!form.hasClass("failed")) {
        fetch("http://127.0.0.1:8000/contacts/suscriber/", {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json"
          }),
          body: JSON.stringify({
            email: email.val()
          })
        });

        $("#success_subscriber").toggleClass("d-none");
        form.toggleClass("d-none");
      } else {
        return false;
      }
    });

    // End of use strict
  });
})(jQuery, window, document);
