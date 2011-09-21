module 'Map.API'

test 'Map Object Loaded', 1, ->
  ok Map

test 'Api Present', 2, ->
  map = new Map()
  ok map.run
  ok map.center

test 'adding a location', 1, ->
  map = new Map()
  location =
    x: 1,
    y: 2

  map.addLocation(location)

  equal 1, map.locationCount()

test 'adding two locations', 2, ->
  map = new Map()
  location =
    x: 1,
    y: 2

  map.addLocation(location)

  equal 1, map.locationCount()
  map.addLocation(location)

  equal 2, map.locationCount()

test 'locationAt', 2, ->
  map = new Map()
  location1 =
    x: 1,
    y: 2

  location2 =
    x: 3,
    y: 4

  map.addLocation(location1)
  map.addLocation(location2)

  equal location1, map.locationAt(0)
  equal location2, map.locationAt(1)

test 'removing a location removes it', 2, ->
  map = new Map()
  location1 =
    x: 1,
    y: 2

  location2 =
    x: 3,
    y: 4

  map.addLocation(location1)
  map.addLocation(location2)

  map.removeLocation(location2)

  equal map.locationCount(), 1
  equal location1, map.locationAt(0)

module 'Map.MapDomDriver'

# mocks
window.google =
  maps:
    LatLng: (x,y) ->
    MapTypeId:
      ROADMAP: 1
    Map:(a,b) ->
      {
        getCenter:  -> { lat:1, lng: 1},
        set_center: ->
      }

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
