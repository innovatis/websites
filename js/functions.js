var Primal = Primal || {};

(function(){

  Primal.form = form = {};
  form.mailPath = 'http://primalmailer.heroku.com/mail';
  //form.mailPath = 'http://127.0.0.1:9292/mail';

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
 $('#form form').submit(function(e){
    var element = $(this);
    if(Primal.form.validateAll()){
      $('#form').fadeOut();
      $('.actions').hide();
      $("#form_spinner").fadeIn(100);
      $.ajax({
        url: Primal.form.mailPath,
        data: $('form').serialize(),
        dataType: 'jsonp'
      })
        .success(function(data) {
          $("#form_spinner").fadeOut();
          $("#form_success").fadeIn();
        }).

        error(function(data) {
          $("#form_spinner").fadeOut();
          $("#form_error").fadeIn();
        }
      );
    }
    return false;
  });

  $('#contact-form input').keyup(Primal.form.validate);
});
