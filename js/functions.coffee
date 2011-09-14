(($) ->
  class Search
    constructor: (options) ->
      options ?= {}
      @actions = options.action
      @_state  = {}
      @isotope = new Isotope

    filter:   (field) ->
      @_state = {} if @_state.filters and @_state.filters[0] is '*'
      @_state.filters ?= []
      @_state.filters.push field
      this

    unfilter: (filter) ->
      @_state ?= {}
      if filter
        @_state.filters =  @_state.filters.filter (element) -> element isnt filter
      else
        @_state.filters = ['*']

      this

    sort:     (field='', ascending={}) ->
      @_state = {}
      @_state.sortBy =
        asc:   ascending.asc || ascending.sortAscending
        field: field

      this

    shuffle: ->
      @_shuffleNextRun = yes
      this

    newIsotopeOptions: ->
      return 'shuffle' if @_shuffleNextRun

      result = {}

      if @_state.sortBy
        result.sortBy        = @_state.sortBy.field
        result.sortAscending = @_state.sortBy.asc

      if @_state.filters
        result.filter        = @_state.filters.join(',')

      result

    run: ->
      @isotope.run this.newIsotopeOptions()
      @_shuffleNextRun = no
      this

  class Isotope
    constructor: (@selector = '#isotope-container', @overrides= {}) ->

      this.setDefaults()
      this.onReady()

    setDefaults: ->
      # helpers
      getSortCriteriaFromItem =
        priority: (element) ->
          element.data('priority')

        categories: (element) ->
          potentialClasses = element.
            prop('class').
            split(' ')

          classes  = []
          for klass in potentialClasses
           do (klass) ->
            classes.push klass unless /item/.test(klass)

          classes

       @defaultOptions =
         itemSelector: '.item'
         layoutMode:   'fitRows'
         masonry : true
         getSortData:  getSortCriteriaFromItem

      @initialOptions = $.extend true, {}, @defaultOptions, @overrides

    onReady: ->
      @element = $(@selector).isotope(@initialOptions)

    run: (newOptions = {}) ->
      # merge default and new Options
      if newOptions is "shuffle"
        options = "shuffle"
      else
        options = $.extend(true,{},@initialOptions,newOptions)

      @element.isotope options

      true# not a monad

  window.Isotope = Isotope
  window.Search  = Search

  $ ->

    search = new Search
    search.run()

    $('#isotope-actions .action').click (e) =>
      element  = $ e.target
      parentLi = element.closest('li')
      allLi    = $ '#isotope-actions li'

      unfiltered   = allLi.find('.action[data-action=unfilter]')
      unfilteredLi = unfiltered.closest('li')

      e.preventDefault()

      action = element.data 'action'
      filter = element.data 'filters'
      sort   = element.data 'sort'

      switch element.data('action')
        when 'filter'

          wasActive = parentLi.is '.active'

          unfilteredLi.removeClass('active')

          if wasActive
            parentLi.removeClass('active')
            search.unfilter filter
          else
            parentLi.addClass('active')
            search.filter   filter

          activeCount = allLi.filter('.active').length
          filterCount = allLi.find('[data-action=filter]').length
          if activeCount is 0 
            unfilteredLi.addClass('active')
          else if activeCount is filterCount
            allLi.removeClass('active')
            unfilteredLi.addClass('active')

        when 'sort'
          search.sort sort

        when 'unfilter'
          allLi.removeClass('active')
          unfilteredLi.addClass('active')

          search.unfilter()

        when 'shuffle' then search.shuffle()

      console.log element, search.newIsotopeOptions()
      search.run()

).call(this,$)
