---
extension: js
filter:    coffeescript
layout:    nil
---

Onq ?=  {}

(($) ->

  $.fn.op   = (value,speed,fcn) ->
    element = $ this
    max     = element.data('maxOpacity')
    values  =
      opacity: max || value

    unless jQuery.support.opacity
      # only IE (hopefully)
      value   = value || 1
      values  =
        filter: 'alpha(opacity = 100);'

      element.css 'filter','alpha(opacity=100)'
    else
      element.animate values,speed,fcn

  $.fn.opIn = (speed,fcn) ->
    this.op 1, speed, fcn

  $.fn.opOut = (speed,fcn) ->
    this.op 0, speed, fcn


  Onq.Scenes = []

  class Onq.Scene
    constructor: (@selector) ->
      @root = $ @selector
      @triggered = {}
      # maybe use jQuery event queue, if possible to shard..
      # @queue =
      @root.data 'Scene', this
      Onq.Scenes.push this

    run: ->
      this.load()
      this.start()

    load: ->
      @loaded = true
      this

    unload: ->
      @loaded = false
      this

    start: ->
      $.fx.off   = this.stopped = false
      @triggered = {}
      @root.unbind()
      @root.fadeIn()
      this

    stop:  ->
      $.fx.off = this.stopped = true
      @root.unbind()
      this

    reRun: ->
      @$('.transparent').opOut 0
      this.run()

    $: (selector) ->
      @root.find selector

    bind: (event,fcn) ->
      @root.bind event, fcn

    trigger: (event) ->
      if @triggered[event]
        console.log(this,"[alreadyTriggered] No Trigger",event)
      else
        @root.trigger(event) and this.didTrigger(event)

    didTrigger: (event) ->
      @triggered[event] = true
      console.log(this,"[didTrigger]",event)
      this

    appear: (selector,duration) ->
      @$(selector or '*').opIn duration or 1000, =>
        this.trigger '@appear'+selector unless @stopped

    hide: (selector,duration) ->
      @$(selector or '*').opOut duration or 1000, =>
        # shouldnt be global
        this.trigger 'hide.' + selector unless @stopped

    after: (event,action,selectorOrFcn,duration) ->
      this.bind event, =>
        # do some checking, make sure the selector exists
        this[action] selectorOrFcn, duration unless @stopped

      this

  class Onq.Scene.SportsBar extends Onq.Scene
    constructor: ->
      super "#sports-bar"
      @ambientLights = @$ '.ambient-lights'

    start: ->
      super
      @.after('@backWallFadeIn',           'cycleAmbientLights').
        after('@backWallFadeIn',           'appear', '.bar').
        after('@appear.bar',               'appear', '.bar-with-waitress').
        after('@appear.bar',               'appear', '.people-background-with-theatre').
        after('@appear.bar-with-waitress', 'appear', '.bar-with-people').
        after('@appear.bar-with-waitress', 'appear', '.people-balcony').
        after('@appear.bar-with-people',   'appear', '.waitress-middle-of-Scene').
        after('@appear.bar-with-people',   'appear', '.people-forground').
        after('@appear.people-forground',  'appear', '.lights')

      # star the whole animation
      @.$('.back-wall').fadeIn 1000, => this.trigger '@backWallFadeIn'

      this

    cycleAmbientLights: ->
      index = 0
      Scene  = this

      (->
        callee     = arguments.callee
        current    = Scene.ambientLights.eq(index)
        newOpacity = if current.css('opacity') > 0.9 then 0 else 1

        current.op newOpacity,1000, ->
          index = (index+1) % (Scene.ambientLights.length)
          index = 1 if index is 0
          callee() unless Scene.stopped
      )()

  class Onq.Scene.NightClub extends Onq.Scene
    constructor: -> super "#night-club"

    start: ->
      super
      @.after('@backgroundAppear',            'appear', '.bg-people').
        after('@appear.bg-people',            'appear', '.balcony-people').
        after('@appear.balcony-people',       'appear', '.people').
        after('@appear.bg-people',            'appear', '.people-at-table').
        after('@appear.bg-people',            'appear', '.table').
        after('@appear.bg-people',            'appear', '.person-at-table-arm').
        after('@appear.bg-people',            'appear', '.rack').
        after('@appear.rack',                 'appear', '.monitors').
        after('@appear.rack',                 'appear', '.dj-table').
        after('@appear.rack',                 'appear', '.mixers').
        after('@appear.rack',                 'appear', '.dj').
        after('@appear.rack',                 'appear', '.center-light-beam').
        after('@appear.dj',                   'appear', '.silhouette').
        after('@appear.rack',                 'appear', '.left-light-beam-blue').
        after('@appear.left-light-beam-blue', 'appear', '.middle-light-beam-red').
        after('@appear.rack',                 'appear', '.right-light-beam-purple').
        after('@appear.center-light-beam',    'appear', '.scene-shine').
        after('@appear.lights-blue',          'cycleLightBeams')

      # star the whole animation
      @.$('.bg').fadeIn 1000, => this.trigger '@backgroundAppear'

      this
    cycleLightBeams: ->
      console.log("cycling light beams")

  class Onq.Scene.Restaurant extends Onq.Scene
    constructor: -> super "#restaurant"

    start: ->
      super
      @.after('@backgroundAppear', 'appear', '.tv').
        after('@appear.tv',        'appear', '.people-5').
        after('@appear.tv',        'appear', '.tables-4').
        after('@appear.people-5',  'appear', '.people-4').
        after('@appear.tv',        'appear', '.tables-3').
        after('@appear.tables-3',  'appear', '.people-3').
        after('@appear.tables-3',  'appear', '.tables-2').
        after('@appear.tables-2',  'appear', '.people-2').
        after('@appear.tables-2',  'appear', '.tables-1').
        after('@appear.tables-1',  'appear', '.people-1').
        after('@appear.people-1',  'appear', '.speakers')

      @.$(':not(.transparent)').fadeIn 1000, => this.trigger '@backgroundAppear'

  class Onq.Scene.Hall extends Onq.Scene
    constructor: -> super "#hallway"

    start: ->
      super
      @.after('@backgroundAppear',    'appear', '.speakers').
        after('@appear.speakers',     'appear', '.ceiling-lights').
        after('@backgroundAppear',    'appear', '.dj-table').
        after('@appear.dj-table',     'appear', '.beat-box-guy').
        after('@appear.dj-table',     'appear', '.mixer-2').

        after('@appear.side-dj', 'appear', '.cd-player').
        after('@appear.side-dj', 'appear', '.cd-player-cords').

        after('@appear.side-dj', 'appear', '.laptop').
        after('@appear.side-dj', 'appear', '.laptop-cord').
        after('@appear.speakers', 'appear', '.side-dj').
        after('@appear.speakers', 'appear', '.mixer-1').

        after('@appear.side-dj', 'appear', '.people-dancing').

        after('@appear.people-dancing', 'appear', '.silhouette').
        after('@appear.people-dancing', 'appear', '.darkness').
        after('@appear.darkness', 'appear', '.light-1').
        after('@appear.darkness', 'appear', '.light-2').

        #after('something', 'appear', '.light-1-glow-white').
        #after('something', 'appear', '.light-1-glow-yellow').
        #after('something', 'appear', '.light-1-glow').
        #after('something', 'appear', '.light-2-glow-white').
        #after('something', 'appear', '.light-2-glow-yellow').
        #after('something', 'appear', '.light-2-glow').
        after('@appear.light-beam-white', 'appear', '.light-beam-blue-1').
        #after('something', 'appear', '.light-beam-blue-2').
        #after('something', 'appear', '.light-beam-blue-3').
        after('@appear.light-beam-blue-1', 'appear', '.light-beam-blue-4').
        #after('something', 'appear', '.light-beam-green-1').
        after('@appear.light-beam-white', 'appear', '.light-beam-green-2').
        #after('something', 'appear', '.light-beam-green-3').
        after('@appear.light-beam-green-2', 'appear', '.light-green-blue-4').
        #after('something', 'appear', '.light-beam-purple-1').
        #after('something', 'appear', '.light-beam-purple-2').
        after('@appear.light-beam-white', 'appear', '.light-beam-purple-3').
        after('@appear.light-beam-purple-3', 'appear', '.light-beam-purple-4').
        #after('something', 'appear', '.light-beam-red-1').
        #after('something', 'appear', '.light-beam-red-2').
        #after('something', 'appear', '.light-beam-red-3').
        after('@appear.light-beam-white', 'appear', '.light-beam-red-4').
        after('@appear.darkness', 'appear', '.light-beam-white').

        after('@appear.darkness', 'appear', '.disco-ball').
        after('@appear.darkness', 'appear', '.disco-ball-shine-1').
        after('@appear.darkness', 'appear', '.disco-ball-shine-2').
        after('@appear.darkness', 'appear', '.disco-ball-shine-3')
        #after('@appear.light-beam-white', 'loadInBeams').
        #after('@loadInBeams', 'cycleBeams').
        #after('@appear.disco-ball', 'cycleDiscoBallSHine')

      @.$(':not(.transparent)').fadeIn 1000, => this.trigger '@backgroundAppear'

  class Onq.Scene.Patio extends Onq.Scene
    constructor: -> super "#patio"

    start: ->
      super
      @.after('@backgroundAppear',  'appear', '.tables-1').
        after('@appear.tables-1',   'appear', '.people-1').
        after('@appear.tables-1',          'appear', '.tables-2').
        after('@appear.tables-1',          'appear', '.people-2').

        after('@appear.tables-1',          'appear', '.tables-3').
        after('@appear.tables-1',          'appear', '.people-3').

        after('@appear.tables-3',          'appear', '.tables-4').
        after('@appear.tables-3',          'appear', '.people-4').

        after('@appear.tables-4',          'appear', '.tables-5').
        after('@appear.tables-4',          'appear', '.people-5').

        after('@appear.tables-5',          'appear', '.people').
        after('@appear.people',            'appear', '.people-6')

      @.$(':not(.transparent)').fadeIn 1000, => this.trigger '@backgroundAppear'
  class Onq.Scene.Hotel extends Onq.Scene
    constructor: -> super "#hotel"

    start: ->
      super
      @.after('@backgroundAppear',         'appear', '.front_desk').
        after('@backgroundAppear'       ,  'appear', '.bellboy').
        after('@backgroundAppear'       ,  'appear', '.busboy').
        after('@appear.busboy'          ,  'appear', '.concierge').
        after('@appear.busboy'          ,  'appear', '.girl').
        after('@appear.busboy'          ,  'appear', '.red_shirt_guy').
        after('@appear.red_shirt_guy'   ,  'appear', '.suitcase').
        after('@appear.busboy'          ,  'appear', '.white_shirt_guy').
        after('@appear.white_shirt_guy' ,  'appear', '.woman').
        after('@appear.white_shirt_guy' ,  'appear', '.little_boy')

      @.$(':not(.transparent)').fadeIn 1000, => this.trigger '@backgroundAppear'

  $ ->
    (new Onq.Scene.NightClub)
    (new Onq.Scene.SportsBar)
    (new Onq.Scene.Restaurant)
    (new Onq.Scene.Hall)
    (new Onq.Scene.Patio)
    (new Onq.Scene.Hotel)

    Scenes = $('.scene')
    $('.scene-thumb').click(->
      thumb        = $(this)
      SceneSelector = thumb.data('Scene')

      scene.stop().root.fadeOut() for scene in Onq.Scenes

      $(SceneSelector).
        data('Scene').
        reRun()

    ).first()
).call(this,$)
