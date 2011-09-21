(function() {
  module('Map.API');
  test('Map Object Loaded', 1, function() {
    return ok(Map);
  });
  test('Api Present', 2, function() {
    var map;
    map = new Map();
    ok(map.run);
    return ok(map.center);
  });
  test('adding a location', 1, function() {
    var location, map;
    map = new Map();
    location = {
      x: 1,
      y: 2
    };
    map.addLocation(location);
    return equal(1, map.locationCount());
  });
  test('adding two locations', 2, function() {
    var location, map;
    map = new Map();
    location = {
      x: 1,
      y: 2
    };
    map.addLocation(location);
    equal(1, map.locationCount());
    map.addLocation(location);
    return equal(2, map.locationCount());
  });
  test('locationAt', 2, function() {
    var location1, location2, map;
    map = new Map();
    location1 = {
      x: 1,
      y: 2
    };
    location2 = {
      x: 3,
      y: 4
    };
    map.addLocation(location1);
    map.addLocation(location2);
    equal(location1, map.locationAt(0));
    return equal(location2, map.locationAt(1));
  });
  test('removing a location removes it', 2, function() {
    var location1, location2, map;
    map = new Map();
    location1 = {
      x: 1,
      y: 2
    };
    location2 = {
      x: 3,
      y: 4
    };
    map.addLocation(location1);
    map.addLocation(location2);
    map.removeLocation(location2);
    equal(map.locationCount(), 1);
    return equal(location1, map.locationAt(0));
  });
  module('Map.MapDomDriver');
  window.google = {
    maps: {
      LatLng: function(x, y) {},
      MapTypeId: {
        ROADMAP: 1
      },
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
