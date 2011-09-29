(function() {
  window.FakeGoogle = {
    maps: {
      LatLng: function(x, y) {},
      MapTypeId: {
        ROADMAP: 1
      },
      Marker: function() {},
      Map: function(a, b) {
        return {
          getCenter: function() {
            return {
              lat: 1,
              lng: 1
            };
          },
          set_center: function() {}
        };
      }
    }
  };
  window.google = FakeGoogle;
  module('Map.API', {
    setup: function() {
      return window.google = FakeGoogle;
    },
    teardown: function() {
      return window.google = null;
    }
  });
  test('Map Object Loaded', 1, function() {
    console.log(window.google);
    return ok(Map, "Map Loaded");
  });
  test('Api Present', 2, function() {
    var map;
    map = new Map();
    ok(map.run);
    return ok(map.center);
  });
  test('adding a location', 1, function() {
    var loc, map;
    map = new Map();
    loc = {
      position: {
        x: 1,
        y: 2
      }
    };
    map.addLocation(loc);
    return equal(1, map.locationCount(), "Correct Location Count");
  });
  test('adding two locations', 2, function() {
    var loc, map;
    map = new Map();
    loc = {
      position: {
        x: 1,
        y: 2
      }
    };
    map.addLocation(loc);
    equal(1, map.locationCount());
    map.addLocation(loc);
    return equal(2, map.locationCount());
  });
  test('locationAtIndex', 2, function() {
    var loc1, loc2, map;
    map = new Map();
    loc1 = {
      x: 1,
      y: 2
    };
    loc2 = {
      x: 3,
      y: 4
    };
    map.addLocation(loc1);
    map.addLocation(loc2);
    equal(loc1, map.locationAtIndex(0));
    return equal(loc2, map.locationAtIndex(1));
  });
  test('removing a location removes it', 2, function() {
    var loc1, loc2, map;
    map = new Map();
    loc1 = {
      x: 1,
      y: 2
    };
    loc2 = {
      x: 3,
      y: 4
    };
    map.addLocation(loc1);
    map.addLocation(loc2);
    map.removeLocation(loc1);
    equal(map.locationCount(), 1);
    return equal(loc2, map.locationAtIndex(0));
  });
  module('Map.MapDomDriver', {
    setup: function() {
      return window.google = FakeGoogle;
    },
    teardown: function() {
      return window.google = null;
    }
  });
  test('Object Loaded', 1, function() {
    return ok(Map.drivers.Dom);
  });
  test('Api Present', 1, function() {
    var driver;
    driver = new Map.drivers.Dom;
    return ok(driver.center);
  });
  test('Dom Driver Accepts element to attach map to', 1, function() {
    var driver, element;
    element = $('#map');
    driver = new Map.drivers.Dom(element);
    return equal(element, driver.element);
  });
  test('map returns its map object', 1, function() {
    var driver;
    driver = new Map.drivers.Dom();
    return deepEqual(driver.map(), driver.theMap);
  });
  test('Dom Driver defaults to element to "#map"', 1, function() {
    var driver;
    driver = new Map.drivers.Dom();
    return ok(driver.element.is('#map'));
  });
  test('Dom Driver returns its current center', 1, function() {
    var driver;
    driver = new Map.drivers.Dom();
    return ok(driver.center().lat);
  });
  test('adding a marker', 1, function() {
    var driver;
    driver = new Map.drivers.Dom();
    driver.pushLocation({
      position: {}
    });
    return equal(driver.locationCount(), 1);
  });
  test('adding two markers', 1, function() {
    var driver;
    driver = new Map.drivers.Dom();
    driver.pushLocation({
      position: {}
    });
    driver.pushLocation({
      position: {}
    });
    return equal(driver.locationCount(), 2);
  });
}).call(this);
