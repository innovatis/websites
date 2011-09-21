module 'Isotope.API'

test 'Search Object Loaded', 1, ->
  ok Search

test 'API Present', 6, ->
  search = new Search
  ok search
  ok search.filter
  ok search.unfilter
  ok search.sort
  ok search.shuffle
  ok search.run

test "methods exec",6, ->
  search = new Search

  ok search.filter()
  ok search.unfilter()
  ok search.sort()
  ok search.shuffle()
  ok search.filter()
  ok search.run()

test 'all monads', ->
  search = new Search

  ok search.
       filter().
       unfilter().
       sort().
       shuffle().
       filter().
         run()

module 'Isotope.state'

test 'private api',1, ->
  search = new Search
  ok search._state

module "Isotope.state.filters"

test 'filtering sets state', 1, ->
  search = new Search
  search.filter 'room'
  deepEqual search._state.filters, ['room']

test 'filtering mutliple times sets stores all filters', 2, ->
  search = new Search
  search.filter 'room'
  deepEqual search._state.filters, ['room']

  search.filter 'store'
  deepEqual search._state.filters, ['room','store']

test 'unfiltering with no state, sets the default filter', 1, ->
  search = new Search
  search.unfilter()
  deepEqual search._state.filters, ['*']

test 'given filters couch,apple,orange, unfiltering apple only removes apple', 1, ->
  search = new Search
  search.filter('couch')
  search.filter('apple')
  search.filter('orange')
  search.unfilter('couch')

  deepEqual search._state.filters, ['apple','orange']

test 'unfiltering after a filter unsets the filter, and sets *', 3, ->
  search = new Search
  search.filter 'room'

  deepEqual search._state.filters, ['room']

  ok search.unfilter()
  deepEqual ['*'], search._state.filters

test 'unfiltering before a filter set filter to *, then filtering sets correctly', 3, ->
  search = new Search

  ok search.unfilter()
  deepEqual search._state.filters, ['*']

  search.filter 'room'
  deepEqual search._state.filters, ['room']

test 'Sorting sets state', 2, ->
  search = new Search
  search.sort 'priority', asc: yes
  equal search._state.sortBy.field, 'priority'
  equal search._state.sortBy.asc,   yes

module 'Isotope.Isotop Integration'

test 'stateToIsotop', ->
  search = new Search
  ok search.newIsotopeOptions

test 'shuffling',1, ->
  search = new Search
  search.shuffle()
  equal search.newIsotopeOptions(), 'shuffle'

test 'sortBy',1, ->
  search = new Search
  search.sort('something', asc: true)

  expected =
    sortBy: 'something'
    sortAscending: true

  deepEqual search.newIsotopeOptions(), expected

test 'shuffle then sort',1, ->
  search = new Search
  search.shuffle()
  search.run()
  search.sort('something', asc: true)

  expected =
    sortBy: 'something'
    sortAscending: true

  deepEqual search.newIsotopeOptions(), expected


module "Isotope.Isotope Wrapper"

test "Isotope", 1, ->
  ok Isotope

test "API", 1, ->
  isotope = new Isotope
  ok isotope.run
