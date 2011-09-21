(function() {
  (function($) {
    var Cities, Map, _ref;
    Map = (function() {
      function Map(locations) {
        this.locations = locations != null ? locations : [];
        this.driver = new Map.drivers.Dom;
      }
      Map.prototype.center = function() {
        return this.driver.center();
      };
      Map.prototype.map = function() {
        return this.driver.map();
      };
      Map.prototype.addLocation = function(location) {
        return this.driver.pushLocation(location);
      };
      Map.prototype.locationCount = function() {
        return this.driver.locationCount();
      };
      Map.prototype.locationAt = function(index) {
        return this.driver.locationAt(index);
      };
      Map.prototype.removeLocation = function(location) {
        return this.driver.removeLocation(location);
      };
      Map.prototype.run = function() {
        return this.driver.run();
      };
      return Map;
    })();
        if ((_ref = Map.drivers) != null) {
      _ref;
    } else {
      Map.drivers = {};
    };
    Map.drivers.Dom = (function() {
      function Dom(element, newOptions) {
        var defaults, _ref2;
        this.element = element;
        this.newOptions = newOptions != null ? newOptions : {};
                if ((_ref2 = this.element) != null) {
          _ref2;
        } else {
          this.element = $('#map');
        };
        defaults = {
          zoom: 2,
          center: Cities.winnipeg,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.options = $.extend(true, {}, defaults, this.newOptions);
        this.locations = [];
        this;
      }
      Dom.prototype.pushLocation = function(location) {
        var markerOptions;
        markerOptions = {
          map: this.map(),
          position: location.position
        };
        location.marker = new google.maps.Marker(markerOptions);
        return this.locations.push(location);
      };
      Dom.prototype.locationCount = function() {
        return this.locations.length;
      };
      Dom.prototype.locationAt = function(index) {
        return this.locations[index];
      };
      Dom.prototype.removeLocation = function(location) {
        return this.locations = this.locations.filter(function(element) {
          return element !== location;
        });
      };
      Dom.prototype.map = function() {
        var _ref2;
                if ((_ref2 = this.theMap) != null) {
          _ref2;
        } else {
          this.theMap = new google.maps.Map(this.element[0], this.options);
        };
        return this.theMap;
      };
      Dom.prototype.markerFor = function(location) {
        var markerOptions;
        markerOptions = {
          map: this.map(),
          position: new google.maps.LatLng(location.lat, location.lng)
        };
        return new google.maps.Marker(markerOptions);
      };
      Dom.prototype.run = function() {
        return this.map();
      };
      Dom.prototype.center = function(lat, lng) {
        if (lat && lng) {
          this.setCenter(lat, lng);
        }
        return this.getCurrentCenter();
      };
      Dom.prototype.getCurrentCenter = function() {
        return this.map().getCenter();
      };
      Dom.prototype.setCenter = function(lat, lng) {
        var newCenter;
        newCenter = new google.maps.LatLng(lat, lng);
        this.map().set_center(newCenter);
        return newCenter;
      };
      return Dom;
    })();
    window.Map = Map;
    Cities = {};
    window.Cities = Cities;
    return $(function() {
      Cities.chicago = new google.maps.LatLng(41.850033, -87.6500523);
      Cities.anchorage = new google.maps.LatLng(61.2180556, -149.9002778);
      Cities.mexico = new google.maps.LatLng(19.4270499, -99.1275711);
      Cities.equator = new google.maps.LatLng(0, 0);
      Cities.london = new google.maps.LatLng(51.5001524, -0.1262362);
      Cities.johannesburg = new google.maps.LatLng(-26.201452, 28.045488);
      Cities.kinshasa = new google.maps.LatLng(-4.325, 15.322222);
      Cities.sydney = new google.maps.LatLng(-33.867139, 151.207114);
      return Cities.winnipeg = new google.maps.LatLng(49.88454445583448, -97.04631347656247);
    });
  }).call(this, $);
}).call(this);
