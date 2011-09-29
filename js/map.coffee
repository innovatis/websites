(($,window) ->

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

  class Map
    constructor: () ->
      @driver = new Map.drivers.Dom

    run:           -> @driver.run()
    center:        -> @driver.center()
    map:           -> @driver.map()
    locationCount: -> @driver.locationCount()
    locations:     -> @driver.locations
    addLocation: (location)    -> @driver.pushLocation(location)
    locationAtIndex: (index)   -> @driver.locationAt(index)
    removeLocation: (location) -> @driver.removeLocation(location)


  Map.drivers ?= {}

  class Map.drivers.Dom
    constructor: (@element,@newOptions={}) ->
      @element ?= $ '#map'
      defaults =
        zoom:      2
        center:    Cities.winnipeg
        mapTypeId: google.maps.MapTypeId.ROADMAP

      @options   = $.extend true,{},defaults, @newOptions
      @locations = []
      this

    pushLocation: (loc) ->
      loc.markerOptions =
        map: this.map(),
        position: loc.position

      l = new Map.Location(loc)

      this.click l.marker, l.openInfoWindow

      @locations.push(l)

    click: (entity,fcn) ->
      google.maps.event.addListener entity, 'click', fcn

    locationCount:       -> @locations.length

    locationAt:  (index) -> @locations[index]
    removeLocation: (location) ->
      @locations = @locations.filter (element) ->
        element.position isnt location.position

    map: ->
      @theMap ?= new google.maps.Map(@element[0],@options)
      @theMap

    markerFor: (location) ->
      markerOptions =
        map: this.map(),
        position: new google.maps.LatLng(location.lat, location.lng)

      new google.maps.Marker markerOptions

    run: -> this.map()

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

  class Map.Location
    constructor: (@options={markerOptions:{}}) ->
      @marker = new google.maps.Marker(@options.markerOptions)
      @isOpen   = no
      @map    = @options.markerOptions.map
      @infoWindow = null
      @position = @options.position
      @content = "no content"

    openInfoWindow: =>
      @infoWindow = new SmartInfoWindow
        position: @position
        map:      @map
        content:  @content

      @isOpen = yes

    closeInfoWindow:  =>
      @infoWindow.close() if @infoWindow
      @isOpen = no

    toggleInfoWindow: =>
      if @isOpen
        this.closeInfoWindow()
      else
        this.openInfoWindow()

  window.Map = Map
).call(this,$,window)
