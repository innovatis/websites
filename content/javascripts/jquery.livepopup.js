(function() {
  (function($) {
    var actsAsPopup, postHandler, togglePopup;
    postHandler = function(data, button) {
      var popup, popupContent, shouldCacheAjax, wrapperClass;
      popupContent = data;
      popup = button.data('popupElement');
      shouldCacheAjax = button.is('[data-cache-ajax]');
      wrapperClass = button.data('wrapperClass');
      if (!popup) {
        popup = $(popupContent);
        if (!popup.is('.exo-popup')) {
          popup = $("<div class='exo-popup'></div>").html(popup);
        }
        popup.hide();
        if (wrapperClass) {
          popup.addClass(wrapperClass);
        }
        popup.insertAfter(button);
        button.data('popupElement', popup);
        button.trigger($.Event("popup:ajaxLoaded"), [popup]);
      }
      return togglePopup(popup, button);
    };
    togglePopup = function(popup, button) {
      var closesOnClick, closesOnClickSelector, closesOnExternalClick, href, isNotAjax;
      closesOnClick = popup.is('[data-close-on-click]') || button.is('[data-close-on-click]');
      closesOnClickSelector = popup.data('closeOnClick') || button.data('closeOnClick');
      closesOnExternalClick = popup.is('[data-close-on-external-click]') || button.is('[data-close-on-external-click]');
      href = button.attr('href') || button.data('href');
      isNotAjax = href[0] === '#';
      if (isNotAjax) {
        if (button.data('popup') === 'initialized') {
          button.data('popup', '');
          popup.data('position-object').disable();
          return popup.hide();
        } else {
          if (closesOnExternalClick) {
            $('body').one('click', function(e) {
              if (popup.find($(e.target)).length === 0) {
                return togglePopup(popup, button);
              }
            });
          }
          $('body').one('keydown', function(e) {
            if (e.keyCode === 27) {
              return togglePopup(popup, button);
            }
          });
          button.data('popup', 'initialized');
          button.positionRelative(popup);
          if (closesOnClick) {
            if (closesOnClickSelector) {
              popup.find(closesOnClickSelector).one('click', function(e) {
                e.preventDefault();
                return togglePopup(popup, button);
              });
            } else {
              popup.one('click', function() {
                return togglePopup(popup, button);
              });
            }
          }
          return popup.show();
        }
      } else {
        if (closesOnExternalClick) {
          $('body').one('click', function(e) {
            if (popup.find($(e.target)).length === 0) {
              return popup.hide();
            }
          });
        }
        $('body').one('keydown', function(e) {
          if (e.keyCode === 27) {
            return popup.hide();
          }
        });
        if (button.data('popup') !== 'initialized') {
          button.data('popup', 'initialized');
          button.exoPositionRelative(popup);
          if (closesOnClick) {
            if (closesOnClickSelector) {
              popup.find(closesOnClickSelector).click(function(e) {
                e.preventDefault();
                return popup.toggle();
              });
            } else {
              popup.click(function() {
                return popup.toggle();
              });
            }
          }
        }
        return popup.toggle();
      }
    };
    actsAsPopup = function(e) {
      var ajaxIsCacheable, ajaxIsntCached, ajaxSpinner, button, element, href, isAjax, popup, shouldMakeAjaxCall;
      e.preventDefault();
      button = $(this);
      href = button.attr('href') || button.data('href');
      element = button.data('popupElement');
      isAjax = href[0] !== '#';
      ajaxIsntCached = !element;
      ajaxIsCacheable = button.is('[data-cache-ajax]');
      shouldMakeAjaxCall = ajaxIsntCached || !ajaxIsCacheable;
      if (!href) {
        throw '[actsAsPopup]: href is empty';
      }
      if (isAjax && shouldMakeAjaxCall) {
        ajaxSpinner = $("<div class='spinner'></div>");
        button.after(ajaxSpinner);
        button.exoPositionRelative(ajaxSpinner, {
          left: 10,
          top: "none"
        });
        return $.get(href, function(data) {
          ajaxSpinner.remove();
          return postHandler(data, button);
        }).error(function() {
          ajaxSpinner.remove();
          return alert("There was an error retrieving the popup");
        });
      } else {
        popup = element || $(href);
        return togglePopup(popup, button);
      }
    };
    $.fn.exoPopup = function() {
      return this.live('click', actsAsPopup);
    };
    return $(function() {
      return $('[data-popup-trigger]').exoPopup();
    });
  })(jQuery);
}).call(this);
