var Onq = Onq || {};
(function($){
  $.fn.op   = function(value,speed,fcn){
    var values = {
      opacity: value
    };
    if(!jQuery.support.opacity){
      /* only IE (hopefully) */
      value = value || 1;

      values = {
        filter: 'alpha(opacity = 100);'
      };
      return $(this).css('filter','alpha(opacity=100)');
    }else{
      return $(this).animate(values,speed,fcn);
    }

  };

  $.fn.opIn = function(speed,fcn){
    return $(this).op(1,speed,fcn);
  };

  $.fn.opOut = function(speed,fcn){
    return $(this).op(0,speed,fcn);
  };


  Onq.rooms = [];
  Onq.Room = function(selector){
    this.selector = selector;
  }

  Onq.Room.prototype = {
    run: function(){
      this.load();
      this.start();
    },

    $: function(selector){
      return this.root.find(selector);
    },

    bind: function(event,fcn){
      return this.root.bind(event,fcn);
    },

    show: function(selector,duration){
      return this.$(selector||'*').opIn(duration||1000,function(){
        $(document).trigger('@show'+selector);
      });
    },

    hide: function(selector,duration){
      return this.$(selector||'*').opOut(duration||1000,function(){
        // shouldnt be global
        $(document).trigger('hide.'+selector);
      });
    },

    after: function(event,action,selectorOrFcn,duration){
      var that = this;
      // shouldnt be global
      // store current state, if stopped it will resume
      $(document).bind(event, function(){
        that[action](selectorOrFcn,duration);
      });
      return this;
    }
  };

  Onq.rooms.sportsBar   = new Onq.Room("#sports-bar");
  Onq.rooms.sportsBar.load = function(){
    this.root          = $(this.selector);
    this.ambientLights = this.root.find('.ambient-lights');
    this.previous      = this.root.clone();
    this.root.data("room",this);
  }

  Onq.rooms.sportsBar.start = function(){
    var that = this;
    $.fx.off = this.stopped = false;

    // ugly but simple enough for now
    this.after('@backWallFadeIn',         'cycleAmbientLights').
         after('@backWallFadeIn',         'show', '.bar').
         after('@show.bar',               'show', '.bar-with-waitress').
         after('@show.bar',               'show', '.people-background-with-theatre').
         after('@show.bar-with-waitress', 'show', '.bar-with-people').
         after('@show.bar-with-waitress', 'show', '.people-balcony').
         after('@show.bar-with-people',   'show', '.waitress-middle-of-room').
         after('@show.bar-with-people',   'show', '.people-forground').
         after('@show.people-forground',  'show', '.lights');

    this.$('.back-wall').fadeIn(1000,function(){
      $(this).trigger('@backWallFadeIn');
    })
  };

  Onq.rooms.sportsBar.stop = function(){
    $.fx.off = this.stopped = true;
    return this;
  };

  Onq.rooms.sportsBar.cycleAmbientLights = function(){
    var index = 0,
        that  = this;

    (function(){
      var thater = arguments.callee,
      current    = that.ambientLights.eq(index),
      newOpacity = current.css('opacity') > 0.9 ? 0 : 1;

      current.op(newOpacity,1000,function(){
        index = (index+1)% (that.ambientLights.length);
        if(index == 0){ index = 1 }
        if(!that.stopped){
          thater();
        }
      });
    })()
  };

  $(function(){
    //Onq.rooms.sportsBar.run();
  });

})($)
