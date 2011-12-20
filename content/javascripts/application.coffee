---
extension: js
filter:    coffeescript
layout:    nil
---
(->
  # remove layerX and layerY
  all = $.event.props
  len = all.length
  res = []

  while len--
    el = all[len]
    if el isnt 'layerX' and el isnt 'layerY'
      res.push el

  $.event.props = res
)()

$ ->
  $('.bounding').
    live('mouseover',(e)->
      bound = $(e.target)
      layer = $(bound.data('layer'))
      layer.stop().op(1,300)
    ).
    live('mouseout', (e) ->
      bound = $(e.target)
      layer = $(bound.data('layer'))
      layer.stop().op(0,300)
    )

  $.waypoints.settings.scrollThrottle = 30
  $('#nav-container-wrapper').waypoint (event,direction) ->
    $('#nav-container').toggleClass("sticky", direction=="down")

  $('#footer-container').waypoint(((event,direction) ->
    if direction is "down"
      $('#nav-container').hide()
    else
      $('#nav-container').show()
  ),
      offset: $('#nav-container').height())
