(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    var Isotope, Search;
    Search = (function() {
      function Search(options) {
                if (options != null) {
          options;
        } else {
          options = {};
        };
        this.actions = options.action;
        this._state = {};
        this.isotope = new Isotope;
      }
      Search.prototype.filter = function(field) {
        var _base, _ref;
        if (this._state.filters && this._state.filters[0] === '*') {
          this._state = {};
        }
                if ((_ref = (_base = this._state).filters) != null) {
          _ref;
        } else {
          _base.filters = [];
        };
        this._state.filters.push(field);
        return this;
      };
      Search.prototype.unfilter = function(filter) {
        var _ref;
                if ((_ref = this._state) != null) {
          _ref;
        } else {
          this._state = {};
        };
        if (filter) {
          this._state.filters = this._state.filters.filter(function(element) {
            return element !== filter;
          });
        } else {
          this._state.filters = ['*'];
        }
        return this;
      };
      Search.prototype.sort = function(field, ascending) {
        if (field == null) {
          field = '';
        }
        if (ascending == null) {
          ascending = {};
        }
        this._state = {};
        this._state.sortBy = {
          asc: ascending.asc || ascending.sortAscending,
          field: field
        };
        return this;
      };
      Search.prototype.shuffle = function() {
        this._shuffleNextRun = true;
        return this;
      };
      Search.prototype.newIsotopeOptions = function() {
        var result;
        if (this._shuffleNextRun) {
          return 'shuffle';
        }
        result = {};
        if (this._state.sortBy) {
          result.sortBy = this._state.sortBy.field;
          result.sortAscending = this._state.sortBy.asc;
        }
        if (this._state.filters) {
          result.filter = this._state.filters.join(',');
        }
        return result;
      };
      Search.prototype.run = function() {
        this.isotope.run(this.newIsotopeOptions());
        this._shuffleNextRun = false;
        return this;
      };
      return Search;
    })();
    Isotope = (function() {
      function Isotope(selector, overrides) {
        this.selector = selector != null ? selector : '#isotope-container';
        this.overrides = overrides != null ? overrides : {};
        this.setDefaults();
        this.onReady();
      }
      Isotope.prototype.setDefaults = function() {
        var getSortCriteriaFromItem;
        getSortCriteriaFromItem = {
          priority: function(element) {
            return element.data('priority');
          },
          categories: function(element) {
            var classes, klass, potentialClasses, _fn, _i, _len;
            potentialClasses = element.prop('class').split(' ');
            classes = [];
            _fn = function(klass) {
              if (!/item/.test(klass)) {
                return classes.push(klass);
              }
            };
            for (_i = 0, _len = potentialClasses.length; _i < _len; _i++) {
              klass = potentialClasses[_i];
              _fn(klass);
            }
            return classes;
          }
        };
        this.defaultOptions = {
          itemSelector: '.item',
          layoutMode: 'fitRows',
          masonry: {
            rowHeight: 220
          },
          getSortData: getSortCriteriaFromItem
        };
        return this.initialOptions = $.extend(true, {}, this.defaultOptions, this.overrides);
      };
      Isotope.prototype.onReady = function() {
        return this.element = $(this.selector).isotope(this.initialOptions);
      };
      Isotope.prototype.run = function(newOptions) {
        var options;
        if (newOptions == null) {
          newOptions = {};
        }
        if (newOptions === "shuffle") {
          options = "shuffle";
        } else {
          options = $.extend(true, {}, this.initialOptions, newOptions);
        }
        this.element.isotope(options);
        return true;
      };
      return Isotope;
    })();
    window.Isotope = Isotope;
    window.Search = Search;
    return $(function() {
      var search;
      search = new Search;
      search.run();
      return $('#isotope-actions .action').click(__bind(function(e) {
        var action, activeCount, allLi, element, filter, filterCount, parentLi, sort, unfiltered, unfilteredLi, wasActive;
        element = $(e.target);
        parentLi = element.closest('li');
        allLi = $('#isotope-actions li');
        unfiltered = allLi.find('.action[data-action=unfilter]');
        unfilteredLi = unfiltered.closest('li');
        e.preventDefault();
        action = element.data('action');
        filter = element.data('filters');
        sort = element.data('sort');
        switch (element.data('action')) {
          case 'filter':
            wasActive = parentLi.is('.active');
            unfilteredLi.removeClass('active');
            if (wasActive) {
              parentLi.removeClass('active');
              search.unfilter(filter);
            } else {
              parentLi.addClass('active');
              search.filter(filter);
            }
            activeCount = allLi.filter('.active').length;
            filterCount = allLi.find('[data-action=filter]').length;
            if (activeCount === 0) {
              unfilteredLi.addClass('active');
            } else if (activeCount === filterCount) {
              allLi.removeClass('active');
              unfilteredLi.addClass('active');
            }
            break;
          case 'sort':
            search.sort(sort);
            break;
          case 'unfilter':
            allLi.removeClass('active');
            unfilteredLi.addClass('active');
            search.unfilter();
            break;
          case 'shuffle':
            search.shuffle();
        }
        console.log(element, search.newIsotopeOptions());
        return search.run();
      }, this));
    });
  }).call(this, $);
}).call(this);
