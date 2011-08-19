---
extension: js
filter:    coffeescript
layout:    nil
---

$ ->
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
