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
      },
      event: {
        addListener: function() {}
      },
      OverlayView: function() {}
    }
  };
  window.SmartInfoWindow = (function() {
    function SmartInfoWindow() {}
    SmartInfoWindow.prototype.close = function() {};
    return SmartInfoWindow;
  })();
  window.google = FakeGoogle;
  module('Map.API');
  test('Map Object Loaded', 1, function() {
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
      position: {
        x: 1,
        y: 2
      }
    };
    loc2 = {
      position: {
        x: 3,
        y: 4
      }
    };
    map.addLocation(loc1);
    map.addLocation(loc2);
    equal(map.locationAtIndex(0).position, loc1.position);
    return equal(map.locationAtIndex(1).position, loc2.position);
  });
  test('removing a location removes it', 2, function() {
    var loc1, loc2, map;
    map = new Map();
    loc1 = {
      position: {
        x: 1,
        y: 2
      }
    };
    loc2 = {
      position: {
        x: 3,
        y: 4
      }
    };
    map.addLocation(loc1);
    map.addLocation(loc2);
    map.removeLocation(loc1);
    equal(map.locationCount(), 1);
    return equal(map.locationAtIndex(0).position, loc2.position);
  });
  module('Map.MapDomDriver');
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
  module('Map.Location');
  test("exists", 1, function() {
    return ok(Map.Location, "class Exists");
  });
  test("initial isOpen is no", 1, function() {
    var loc;
    loc = new Map.Location;
    return same(loc.isOpen, false);
  });
  test("isOpen is always acurrate", 4, function() {
    var loc;
    loc = new Map.Location;
    loc.openInfoWindow();
    same(loc.isOpen, true, "Location knows its open");
    loc.closeInfoWindow();
    same(loc.isOpen, false, "Location knows its closed");
    loc.toggleInfoWindow();
    same(loc.isOpen, true, "Location knows its open");
    loc.toggleInfoWindow();
    return same(loc.isOpen, false, "Location knows its closed");
  });
}).call(this);
