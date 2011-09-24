(($) ->

  class Map
    constructor: (@locations=[]) ->
      @driver = new Map.drivers.Dom

    center: ->
      @driver.center()

    map: ->
      @driver.map()

    addLocation: (location)   ->
      @driver.pushLocation(location)

    locationCount:            ->
      @driver.locationCount()

    locationAt: (index)       ->
      @driver.locationAt(index)

    removeLocation: (location) ->
      @driver.removeLocation(location)

    run: -> @driver.run()

  Map.drivers ?= {}

  class Map.drivers.Dom
    constructor: (@element,@newOptions={}) ->
      @element ?= $ '#map'
      defaults =
        zoom: 2,
        center: Cities.winnipeg,
        mapTypeId: google.maps.MapTypeId.ROADMAP

      @options   = $.extend true,{},defaults, @newOptions
      @locations = []
      this

    pushLocation: (location) ->
      markerOptions =
        map: this.map(),
        position: location.position

      this.map().event.addListener location.marker, 'click', (e) =>
        infobox = new SmartInfoWindow
          position: marker.getPosition(),
          map: map,
          content: content

      location.marker = new google.maps.Marker(markerOptions)
      @locations.push(location)

    locationCount:       -> @locations.length
    locationAt:  (index) -> @locations[index]
    removeLocation: (location) ->
      @locations = @locations.filter (element) ->
        element isnt location

    map: ->
      @theMap ?= new google.maps.Map(@element[0],@options)
      @theMap

    markerFor: (location) ->
      markerOptions =
        map: this.map(),
        position: new google.maps.LatLng(location.lat, location.lng)

      new google.maps.Marker markerOptions

    run: ->
      this.map()

    center: (lat,lng) ->
      if(lat and lng)
        this.setCenter(lat,lng)

      this.getCurrentCenter()

    getCurrentCenter: ->
      this.map().getCenter()

    setCenter: (lat,lng) ->
      newCenter = new google.maps.LatLng(lat,lng)
      this.map().set_center newCenter
      newCenter

  window.Map = Map

  Cities = {}
  window.Cities = Cities
  $ ->
    Cities.chicago=      new google.maps.LatLng(41.850033, -87.6500523)
    Cities.anchorage=    new google.maps.LatLng(61.2180556, -149.9002778)
    Cities.mexico=       new google.maps.LatLng(19.4270499, -99.1275711)
    Cities.equator=      new google.maps.LatLng(0,0)
    Cities.london=       new google.maps.LatLng(51.5001524, -0.1262362)
    Cities.johannesburg= new google.maps.LatLng(-26.201452, 28.045488)
    Cities.kinshasa=     new google.maps.LatLng(-4.325, 15.322222)
    Cities.sydney=       new google.maps.LatLng( -33.867139, 151.207114)
    Cities.winnipeg=     new google.maps.LatLng(49.88454445583448, -97.04631347656247)

).call(this,$)
