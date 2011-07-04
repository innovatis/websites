(function($){

  $.fn.liveTabs = function(options){
    this.each(function(){
      var tabBar = $(this),
          config = $.extend(true,{
        tabs:  tabBar,
        tabCollectionSelector: tabBar.selector
      },options),
        tab = new Tab(config).init();
    });

    return this;
  };

  // set you own global custom prefix
  var PREFIX = $.fn.liveTabs.PREFIX = $.fn.liveTabs.PREFIX || '',
         Tab = $.fn.liveTabs.Tab    = function(options){
    $.extend(this,options);
  };

  Tab.prototype = {
    currentClass: PREFIX+'state-current',
    tabSelector:  'a',
    styles: {
      plain: function(e){
        var a = $(this),
        paneId = a.attr("data-pane") || a.attr('href');

        if(!paneId || paneId.m){
          throw("Pane Id must be specified");
        }

        $(paneId).
          siblings().
            hide().
            removeClass(Tab.prototype.currentClass).
            end().
          show().
          addClass(Tab.prototype.currentClass).
          trigger('tabLoad');
      },

      ajax: function(e){
        var a        = $(this),
        href         = a.attr('href'),
        paneSelector = a.attr("data-pane");

        if(!href || !paneSelector){
          throw("Ajax Tab Failed -- we need both href and paneSelector");
        }

        $(paneSelector).load(href,function(data){
          $(this).
            empty().
            append(data).
            show().
            addClass(Tab.prototype.currentClass).
            siblings().
              removeClass(Tab.prototype.currentClass).
              hide().
              end().
            trigger('tabLoad');
        });
      }
    },

    afterLoad: function(){
      this.tabs.trigger('afterLoad');
    },

    tabItems: function(){
      return this.tabs.find(this.tabSelector);
    },

    currentTabSelector: function(){
      return '.' + this.currentClass;
    },

    currentTab: function(){
      return this.tabs.find(this.tabSelector).filter(this.currentTabSelector());
    },

    init: function(){

      this.
        tabItems().
        live('click',{ liveTabs: this},
          function(e){
            e.preventDefault();

            var a          = $(this),
              liveTabs     = e.data.liveTabs,
              tabs         = a.closest(liveTabs.tabCollectionSelector),
              historyName  = tabs.attr("data-model"),
              state        = {},
              href         = a.attr('href');

              if(!href){
                throw("[livetabs] no pane selector specified");
              }

              var style        = href && href.charAt(0) !== "#" ? 'ajax' : 'plain';

              if(!href || href.match(/^#$/)){
                throw("[livetabs] Invalid Pane Selector -> ["+href+"]");
              }

              state[historyName] = a.attr("data-id");

              // OMG STEAK
              if($.bbq) $.bbq.pushState(state);

              liveTabs.
                currentTab().
                removeClass(liveTabs.currentClass);

              a.addClass(liveTabs.currentClass);

            liveTabs.styles[style].call(this,e);

          });

      if(this.currentTab().length < 1){
        this.tabItems().first().trigger('click');
      }

      return false;
    }
  };

  $(function(){
    jQuery('.'+PREFIX+'tab-bar').liveTabs();
  });

})($);
