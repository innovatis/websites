$(function(){
  $("#show-bedrooms").val($.query.get('show-bedrooms'));
  $("#show-price").val($.query.get('show-price'));
  $("#show-property").val($.query.get('show-property'));
  $("#show-location").val($.query.get('show-location'));
  var wait;
  
  // Code/logic
  if(jQuery.support.opacity){
    wait = 500;
  }else{
    jQuery.fx.off = true;
    wait = 0;
  }
  
  var filterListings = function(e){
    var target   = $(e.target),
        value    = target.val(),
        
        value_bedroom   = $("#show-bedrooms").val(),
        value_price     = $("#show-price"   ).val(),
        value_location  = $("#show-location").val(),
        value_property  = $("#show-property").val(),
        
        selectorBedroom   =  value_bedroom  === "" ? "[data-bedrooms]"    : "[data-bedrooms="+value_bedroom+"]",
        selectorPrice     =  value_price    === "" ? "[data-price-range]" : "[data-price-range="+value_price+"]",
        selectorProperty  =  value_property === "" ? "[data-type]"        : "[data-type="+value_property+"]",
        selectorLocation  =  value_location === "" ? "[data-location]"    : "[data-location="+value_location+"]",
        
        masterQuery = selectorBedroom + selectorPrice + selectorProperty + selectorLocation,
        
        listings         = $('.listing'), 
        filteredListings = listings.filter(masterQuery),
        message          = $('#message');
        // loading          = $('#loading')
  
     listings.
       stop().
       fadeOut('fast',function(){         
         setTimeout(function(){
           var length = filteredListings.length;
           
           // if ($("#loading").is("loading")) {
           //              $("#loading").removeClass("loading");
           //            } else {
           //              $("#loading").addClass("loading-complete");
           //            }
           
           // $("#loading").
           //             removeClass("loading").
           //             addClass("loading-complete");
           
           filteredListings.
            // delay(400).
            fadeIn('fast'); 
           
           if(length === 0 && message.hasClass("results")){
             message.
              removeClass("results").
              addClass("no-results");
              
           }else if(length > 0 && message.hasClass("no-results")){
              message.
                addClass("results").
                removeClass("no-results");
           }
           
         },wait);
     });
   },
   
   reset = function(){
     $(".home-selector").val("").trigger("change");
   };
   
  // Attach listeners once document is ready.
  $(function(){
    
    function dateHumanize(date){
      return date;
    }

    $.getJSON("http://twitter.com/statuses/user_timeline.json?screen_name=philmosher&count=2&callback=?",
      function(data){

        var tweets = $('#twitter-feed .tweets');
        tweets.empty()

        $.each(data, function(i,item){
          //$("#twitter-feed").append("<li>"+item.text+"</li>");
          tweets.append(   
            '<div class="tweet-bubble">'+
              '<p class="tweet-time">About <span class="timeago">'+dateHumanize(item.created_at)+'</span> ago</p>'+
              '<div class="tweet-bubble-top"></div>'+
              '<div class="tweet-bubble-middle">'+
                '<p class="tweet">'+item.text+'</p>'+
              '</div>'+
              '<div class="tweet-bubble-bottom"></div>'+
            '</div>');
        });
    });

    $(".home-selector").change(filterListings).trigger('change');
    // quick UX adjustment for IE, maybe UA sniff if it causes trouble on others
    $(".home-selector").keyup(filterListings);
    $('.update-list-button').click(reset);
  });
    
});