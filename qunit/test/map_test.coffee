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
window.google = FakeGoogle
module 'Map.API',
  setup: ->
    window.google = FakeGoogle
  teardown: ->
    window.google = null

test 'Map Object Loaded', 1, ->
  console.log(window.google)
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
  loc1 =
    x: 1,
    y: 2

  loc2 =
    x: 3,
    y: 4

  map.addLocation(loc1)
  map.addLocation(loc2)

  equal loc1, map.locationAtIndex(0)
  equal loc2, map.locationAtIndex(1)

test 'removing a location removes it', 2, ->
  map = new Map()
  loc1 =
    x: 1,
    y: 2

  loc2 =
    x: 3,
    y: 4

  map.addLocation(loc1)
  map.addLocation(loc2)

  map.removeLocation(loc1)

  equal map.locationCount(), 1
  equal loc2, map.locationAtIndex(0)

module 'Map.MapDomDriver',
  setup: ->
    window.google = FakeGoogle
  teardown: ->
    window.google = null

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
