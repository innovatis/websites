(function($) {
  var actsAsPopup, postHandler, togglePopup;
  postHandler = function(data, button) {
    var popup, popupContent, shouldCacheAjax;
    popupContent = data;
    popup = button.data('popupElement');
    shouldCacheAjax = button.is('[data-cache-ajax]');
    if (!popup) {
      popup = $(popupContent).hide();
      popup.insertAfter(button);
      button.data('popupElement', popup);
    }
    return togglePopup(popup, button);
  };
  togglePopup = function(popup, button) {
    var closesOnClick, closesOnClickSelector, closesOnExternalClick;
    closesOnClick = popup.is('[data-close-on-click]');
    closesOnClickSelector = popup.data('closeOnClick');
    closesOnExternalClick = popup.is('[data-close-on-external-click]');
    if (closesOnExternalClick) {
      $('body').one('click', function(e) {
        if (popup.find($(e.target)).length === 0) {
          return popup.hide();
        }
      });
    }
    if (button.data('popup') !== 'initialized') {
      button.data('popup', 'initialized');
      button.exoPositionRelative(popup);
      if (closesOnClick) {
        if (closesOnClickSelector) {
          popup.find(closesOnClickSelector).click(function() {
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
  };
  actsAsPopup = function(e) {
    var ajaxIsCacheable, ajaxIsntCached, button, element, href, isAjax, popup, shouldMakeAjaxCall;
    e.preventDefault();
    button = $(e.target);
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
      return $.get(href, function(data) {
        return postHandler(data, button);
      });
    } else {
      popup = element || $(href);
      return togglePopup(popup, button);
    }
  };
  $.fn.exoPopup = function() {
    return this.live('click', actsAsPopup);
  };
  $.fn.exoPositionRelative = function(child, opts) {
    var childLeft, childTop, offsetLeft, offsetTop, options, parent;
    parent = this;
    options = opts || {};
    childTop = child.data('popupTop');
    childLeft = child.data('popupLeft');
    offsetTop = childTop || options.top || 0;
    offsetLeft = childLeft || options.left || 0;
    $(window).resize(function(e) {
      var left, offset, top;
      offset = parent.offset();
      top = offset.top + offsetTop;
      left = offset.left + offsetLeft;
      return child.css({
        left: left,
        top: top
      });
    });
    return $(window).trigger('resize');
  };
  return $(function() {
    return $('[data-popup-trigger]').exoPopup();
  });
})(jQuery);
