---
extension: js
filter:    coffeescript
layout:    nil
---

$ ->
  $( "ul.tabs" ).tabs("div.panes > .pane")
  $( "ul.tabs li" ).live 'click', ->
    $( "ul.tabs li" ).removeClass("active")
    $(this).addClass("active")
  $( ".top ul" ).tabs(".top .image")
  $( ".top ul li").live 'click', ->
    $( '.top ul li' ).removeClass("current")
    $(this).addClass("current")
  $("select.manufacturer").live 'change', ->
    $("a.submit").attr("href", $("select.manufacturer").val())



