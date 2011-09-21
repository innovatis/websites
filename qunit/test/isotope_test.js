(function() {
  module('Isotope.API');
  test('Search Object Loaded', 1, function() {
    return ok(Search);
  });
  test('API Present', 6, function() {
    var search;
    search = new Search;
    ok(search);
    ok(search.filter);
    ok(search.unfilter);
    ok(search.sort);
    ok(search.shuffle);
    return ok(search.run);
  });
  test("methods exec", 6, function() {
    var search;
    search = new Search;
    ok(search.filter());
    ok(search.unfilter());
    ok(search.sort());
    ok(search.shuffle());
    ok(search.filter());
    return ok(search.run());
  });
  test('all monads', function() {
    var search;
    search = new Search;
    return ok(search.filter().unfilter().sort().shuffle().filter().run());
  });
  module('Isotope.state');
  test('private api', 1, function() {
    var search;
    search = new Search;
    return ok(search._state);
  });
  module("Isotope.state.filters");
  test('filtering sets state', 1, function() {
    var search;
    search = new Search;
    search.filter('room');
    return deepEqual(search._state.filters, ['room']);
  });
  test('filtering mutliple times sets stores all filters', 2, function() {
    var search;
    search = new Search;
    search.filter('room');
    deepEqual(search._state.filters, ['room']);
    search.filter('store');
    return deepEqual(search._state.filters, ['room', 'store']);
  });
  test('unfiltering with no state, sets the default filter', 1, function() {
    var search;
    search = new Search;
    search.unfilter();
    return deepEqual(search._state.filters, ['*']);
  });
  test('given filters couch,apple,orange, unfiltering apple only removes apple', 1, function() {
    var search;
    search = new Search;
    search.filter('couch');
    search.filter('apple');
    search.filter('orange');
    search.unfilter('couch');
    return deepEqual(search._state.filters, ['apple', 'orange']);
  });
  test('unfiltering after a filter unsets the filter, and sets *', 3, function() {
    var search;
    search = new Search;
    search.filter('room');
    deepEqual(search._state.filters, ['room']);
    ok(search.unfilter());
    return deepEqual(['*'], search._state.filters);
  });
  test('unfiltering before a filter set filter to *, then filtering sets correctly', 3, function() {
    var search;
    search = new Search;
    ok(search.unfilter());
    deepEqual(search._state.filters, ['*']);
    search.filter('room');
    return deepEqual(search._state.filters, ['room']);
  });
  test('Sorting sets state', 2, function() {
    var search;
    search = new Search;
    search.sort('priority', {
      asc: true
    });
    equal(search._state.sortBy.field, 'priority');
    return equal(search._state.sortBy.asc, true);
  });
  module('Isotope.Isotop Integration');
  test('stateToIsotop', function() {
    var search;
    search = new Search;
    return ok(search.newIsotopeOptions);
  });
  test('shuffling', 1, function() {
    var search;
    search = new Search;
    search.shuffle();
    return equal(search.newIsotopeOptions(), 'shuffle');
  });
  test('sortBy', 1, function() {
    var expected, search;
    search = new Search;
    search.sort('something', {
      asc: true
    });
    expected = {
      sortBy: 'something',
      sortAscending: true
    };
    return deepEqual(search.newIsotopeOptions(), expected);
  });
  test('shuffle then sort', 1, function() {
    var expected, search;
    search = new Search;
    search.shuffle();
    search.run();
    search.sort('something', {
      asc: true
    });
    expected = {
      sortBy: 'something',
      sortAscending: true
    };
    return deepEqual(search.newIsotopeOptions(), expected);
  });
  module("Isotope.Isotope Wrapper");
  test("Isotope", 1, function() {
    return ok(Isotope);
  });
  test("API", 1, function() {
    var isotope;
    isotope = new Isotope;
    return ok(isotope.run);
  });
}).call(this);
