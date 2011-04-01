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

  $(".phone-input").change(function() {
    var ph1 = $("#phone1").val(),
        ph2 = $("#phone2").val(),
        ph3 = $("#phone3").val();
    $("#phone-real").val('' + ph1 + '-' + ph2 + '-' + ph3);
  });

  $(".skyjack-list a").click(function(e) {
    var rel=$(this).attr('rel');
    $(".skyjack-list li").removeClass("current");
    $(this).parent().addClass("current");
    $("#man-on-lift").fadeOut();
    $("#skyjack-details-column .content").fadeOut();
    $("#skyjack-details-column .content."+rel).fadeIn();

    e.preventDefault();
  });

  var triggers = $(".modalInput").overlay({

    // some mask tweaks suitable for modal dialogs
    mask: {
      color: '#000000',
      loadSpeed: 200,
      opacity: 0.6
    },

    closeOnClick: false
  });

  $("#meetourteam li a").click(function(e) {
    var cat = $(this).attr('data-tab');
    $(".person-category").hide();
    $(".person-category."+cat).fadeIn();
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
