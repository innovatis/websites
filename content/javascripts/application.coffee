---
extension: js
filter:    coffeescript
layout:    nil
---

$ ->
  $('#stefan').
    live('mouseover',-> $('.tv-screen-yellow-glow').stop().op(1,300)).
    live('mouseout', -> $('.tv-screen-yellow-glow').stop().op(0,300))

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
