(function($){

  var validateInput = function(){
    var input = $(this),
    val         = $.trim(input.val()),
    name        = input.attr('name'),
    inputDiv    = input.closest('.input'),
    required    = input.is('[required]') || inputDiv.is('.required'),
    empty       = val === "";

    if(required && empty) {
      inputDiv && inputDiv.addClass("error");
      input.addClass("error");
    }else{
      inputDiv && inputDiv.removeClass("error");
      input.removeClass("error");
    }
  },

  onSubmit = function(e){
    e.preventDefault();

    var form   = $(this),
    data       = form.data(),
    url        =  'http://innomailer.heroku.com/0.0.1/mail',
    //url        =  'http://127.0.0.1:9292/0.0.1/mail',
    options    = {
      url:      url,
      data:     form.serialize() +'&api_key='+data.mailform,
      dataType: 'jsonp'
    },

    rootSelector     = data['mailform-root'],
    completeSelector = data['mailform-complete'],
    errorSelector    = data['mailform-error'],
    successSelector  = data['mailform-success'],
    loadingSelector  = data['mailform-loading'],
    inputsSelector   = data['mailform-inputs'],
    actionsSelector  = data['mailform-actions'],

    root             = rootSelector ? $(rootSelector) : form,

    elements         = {
      root:     root,
      complete: completeSelector ? $(completeSelector) : root.find('.mailform-complete'),
      error:    errorSelector    ? $(errorSelector)    : root.find('.mailform-error'),
      success:  successSelector  ? $(successSelector)  : root.find('.mailform-success'),
      loading:  loadingSelector  ? $(loadingSelector)  : root.find('.mailform-loading'),
      actions:  actionsSelector  ? $(actionsSelector)  : root.find('.actions'),
      inputs:   inputsSelector   ? $(inputsSelector)   : root.find('.inputs')
    };

    form.data('mailform-elements', elements);

    elements.loading.fadeIn();
    elements.complete.fadeOut();
    elements.error.fadeOut();

    form.trigger('mailform.loading');

    if(form.validateForm()){
      form.
        find("input").
        attr("disabled",true);

      $.ajax(options).
        success(function(obj){ onSuccess(obj,form)});
    }else{
      onSuccess({
        status:  500,
        message: 'Please input all required fields'
      }, form);
    }
  },

  onSuccess = function(obj,form){
    var response = typeof obj === "object" ? obj : $.parseJSON(obj),
    status       = response.status,
    message      = response.message || 'success',
    errorMessage = '',
    elements     = form.data('mailform-elements');

    if(status===200){
      form.trigger("mailform.success");
      form.
        find('.inputs,.actions').fadeOut(function(){
          elements.
            success.
            text(message).
            fadeIn();
      });
    }

    if(status===500){
      form.find('[disabled]').removeAttr('disabled');
      errorMessage = message;
      form.trigger("mailform.error",{
        message: errorMessage
      });
      elements.
        error.
        text(errorMessage).
        fadeIn();

    }else{
      elements.
        error.
        fadeOut();
    }

    elements.
      loading.
      fadeOut();

    elements.complete.fadeIn();

    form.trigger('mailform.complete');
  };


  $.fn.validateForm = function(){
    var form = $(this);

    form.
      find('input,textarea').
      each(validateInput);

    return form.
      find('.error').
      length == 0;
  };

  $.fn.mailform = function(options){
    this.live('submit',onSubmit);
  };

})(jQuery);

$(function(){
  $('[data-mailform]').mailform();
});