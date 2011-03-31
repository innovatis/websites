var Primal = Primal || {};

(function(){


  Primal.form = form = {};
  form.mailPath = '/_strobe/proxy/primalmailer.heroku.com/mail';

  form.validate = function(){
    var element = $(this),
    val         = $.trim(element.val()),
    inputDiv    = element.closest('.input'),
    required    = /* element.is('[required]') */ inputDiv.hasClass('required'), /* fallback for ie bug */
    empty       = val === "",
    type        = element.attr("type");

    if(required && empty){
      inputDiv.addClass("error");
    }else{
      inputDiv.removeClass("error");
    }
  };

  form.validateAll = function(){
    $("input,textarea").each(form.validate);
    return $(".input.error").length < 1;
  };

})();

$(function(){

  var triggers = $(".modalInput").overlay({

    // some mask tweaks suitable for modal dialogs
    mask: {
      color: '#333333',
      loadSpeed: 200,
      opacity: 0.9
    },

    closeOnClick: false
  });

  $("#meetourteam li a").click(function(e) {
    var person = $(this).attr('data-tab');
    $(".person-detail").fadeOut();
    $(".person-detail."+person).fadeIn();
    e.preventDefault();
  });

 $('#form form').submit(function(e){
    var element = $(this);
    if(Primal.form.validateAll()){
      $('#form').fadeOut();
      $('.actions').hide();
      $("#form_spinner").fadeIn(100);
      $.ajax({
        type: 'POST',
        url: Primal.form.mailPath,
        data: element.serialize(),
        success: function(data) {
          $("#form_spinner").fadeOut();
          $("#form_success").fadeIn();
        },
        failure: function(data) {
          $("#form_spinner").fadeOut();
          $("#form_failure").fadeIn();
        }
      });
    }
    return false;
  });

  $('#contact-form input').keyup(Primal.form.validate);
});
