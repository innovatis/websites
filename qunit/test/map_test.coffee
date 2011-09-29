window.FakeGoogle =
  maps:
    LatLng: (x,y) ->
    MapTypeId:
      ROADMAP: 1
    Marker: ->
    Map:(a,b) ->
      {
        getCenter:  -> { lat:1, lng: 1},
        set_center: ->
      }
    event:
      addListener: ->
    OverlayView: ->

class window.SmartInfoWindow
  close: ->
window.google = FakeGoogle

module 'Map.API'

test 'Map Object Loaded', 1, ->
  ok Map, "Map Loaded"

test 'Api Present', 2, ->
  map = new Map()
  ok map.run
  ok map.center

test 'adding a location', 1, ->
  map = new Map()
  loc =
    position:
      x: 1
      y: 2

  map.addLocation(loc)

  equal 1, map.locationCount(), "Correct Location Count"

test 'adding two locations', 2, ->
  map = new Map()
  loc =
    position:
      x: 1
      y: 2

  map.addLocation(loc)

  equal 1, map.locationCount()
  map.addLocation(loc)

  equal 2, map.locationCount()

test 'locationAtIndex', 2, ->
  map = new Map()
  loc1=
    position:
      x: 1
      y: 2

  loc2=
    position:
      x: 3
      y: 4

  map.addLocation(loc1)
  map.addLocation(loc2)

  equal map.locationAtIndex(0).position, loc1.position
  equal map.locationAtIndex(1).position, loc2.position

test 'removing a location removes it', 2, ->
  map = new Map()
  loc1 =
    position:
      x: 1,
      y: 2

  loc2 =
    position:
      x: 3
      y: 4

  map.addLocation(loc1)
  map.addLocation(loc2)

  map.removeLocation(loc1)

  equal map.locationCount(), 1
  equal map.locationAtIndex(0).position, loc2.position

module 'Map.MapDomDriver'

test 'Object Loaded', 1, ->
  ok Map.drivers.Dom

test 'Api Present', 1, ->
  driver = new Map.drivers.Dom
  ok driver.center

test 'Dom Driver Accepts element to attach map to', 1, ->
  element = $ '#map'
  driver = new Map.drivers.Dom(element)

  equal element, driver.element

test 'map returns its map object',1, ->
  driver = new Map.drivers.Dom()
  deepEqual driver.map(), driver.theMap

test 'Dom Driver defaults to element to "#map"', 1, ->
  driver = new Map.drivers.Dom()
  ok driver.element.is('#map')

test 'Dom Driver returns its current center', 1, ->
  driver = new Map.drivers.Dom()
  ok driver.center().lat

test 'adding a marker', 1, ->
  driver = new Map.drivers.Dom()
  driver.pushLocation({position: {}})
  equal driver.locationCount(), 1

test 'adding two markers', 1, ->
  driver = new Map.drivers.Dom()
  driver.pushLocation({position:{}})
  driver.pushLocation({position:{}})
  equal driver.locationCount(), 2

module 'Map.Location'

test "exists", 1 , ->
  ok Map.Location, "class Exists"

test "initial isOpen is no", 1, ->
  loc = new Map.Location
  same loc.isOpen, no

test "isOpen is always acurrate", 4, ->
  loc = new Map.Location
  loc.openInfoWindow()
  same loc.isOpen, yes, "Location knows its open"
  loc.closeInfoWindow()
  same loc.isOpen, no,  "Location knows its closed"
  loc.toggleInfoWindow()
  same loc.isOpen, yes, "Location knows its open"
  loc.toggleInfoWindow()
  same loc.isOpen, no,  "Location knows its closed"
