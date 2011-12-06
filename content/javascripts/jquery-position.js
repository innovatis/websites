(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    var RelativePositioning;
    RelativePositioning = (function() {
      function RelativePositioning(parent, child, opts) {
        this.parent = parent;
        this.child = child;
        this.opts = opts != null ? opts : {};
        this.respondToResize = __bind(this.respondToResize, this);;
        if (!this.parent) {
          throw "[Relative Positioning] Missing a Parent";
        }
        if (!this.child) {
          throw "[Relative Positioning] Missing a Child";
        }
        this.parent = $(this.parent);
        this.child = $(this.child);
        this.options = this.opts;
        this.index = RelativePositioning.positionings.length || 0;
        RelativePositioning.positionings.push(this);
      }
      RelativePositioning.prototype.disable = function() {
        $(window).unbind("resize", this.respondToResize);
        RelativePositioning.positionings.splice(this.index, 1);
        return this.child.data("position-object", void 0);
      };
      RelativePositioning.prototype.position = function() {
        return $(window).resize(this.respondToResize).trigger('resize');
      };
      RelativePositioning.prototype.respondToResize = function(e) {
        var left, leftFromParent, offset, offsetLeft, offsetTop, top, topFromParent;
        topFromParent = this.child.data('popupTop') || this.parent.data('popupTop');
        leftFromParent = this.child.data('popupLeft') || this.parent.data('popupLeft');
        offsetTop = this.options.top || topFromParent || 0;
        offsetLeft = this.options.left || leftFromParent || 0;
        if (this.options.top === "none") {
          offsetTop = 0;
        }
        if (this.options.left === "none") {
          offsetLeft = 0;
        }
        offset = this.parent.offset();
        top = offset.top + offsetTop;
        left = offset.left + offsetLeft;
        return this.child.css({
          left: left,
          top: top
        });
      };
      return RelativePositioning;
    })();
    RelativePositioning.positionings = [];
    $.fn.positionRelativeTo = function(parent, opts) {
      var positionObject;
      if (!(this.length > 0)) {
        return;
      }
      parent = parent || this.data('position-relative-to');
      positionObject = new RelativePositioning(parent, this, opts);
      positionObject.position();
      return this.data('position-object', positionObject);
    };
    $.fn.positionRelative = function(child, opts) {
      var positionObject;
      if (!(this.length > 0)) {
        return;
      }
      child = child || this.data('position-relative');
      positionObject = new RelativePositioning(this, child, opts);
      positionObject.position();
      return child.data('position-object', positionObject);
    };
    $.fn.exoPositionRelative = $.fn.positionRelative;
    return $(function() {
      $('[data-position-relative-to]').positionRelativeTo();
      return $('[data-position-relative]').positionRelative();
    });
  })(jQuery);
}).call(this);
