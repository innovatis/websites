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
        message          = $('#message'),
        loading          = $('#loading');
  
     loading.removeClass("loading-complete").addClass("loading").fadeIn();
     
     listings.
       stop().
       fadeOut('fast',function(){         
         setTimeout(function(){
           var length = filteredListings.length;
           
           setTimeout(function(){
            
              loading.
                removeClass("loading").
                fadeOut(function(){
                  loading.addClass("loading-complete");
                });
             
           },500);
           
           filteredListings.
            delay(400).
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
   },
   
   cleanDate = function(date){
     // IE Fix, seems IE wont parse the date without GMT specification...
     if(!$.browser.msie || /GMT/i.test(date)){
       // maybe twitter adds this
       return date;
     }else{
       // otherwise lets role with a hotfix.
       return date.replace(/([+-]\d{4}\s\d{4})/,"GMT $1");
    }
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
              '<p class="tweet-time"><span class="timeago" title="'+cleanDate(item.created_at)+'"></span></p>'+
              '<div class="tweet-bubble-top"></div>'+
              '<div class="tweet-bubble-middle">'+
                '<p class="tweet">'+item.text+'</p>'+
              '</div>'+
              '<div class="tweet-bubble-bottom"></div>'+
            '</div>');
          });
        
        tweets.
          find('.timeago').
          timeago();
    });

    $(".home-selector").change(filterListings).trigger('change');
    // quick UX adjustment for IE, maybe UA sniff if it causes trouble on others
    $(".home-selector").keyup(filterListings);
    $('.update-list-button').click(reset);
  });
      
  //contact form submit
 $('.submit-form').click(function(){
    if($("requiredField").val()){
      
    }else{

    }
  });
     
  //eNews form lightbox
  $("a#show-panel").click(function(){  
    $("#lightbox, #lightbox-panel").fadeIn(300);  
  })  
  $("a#close-panel").click(function(){  
    $("#lightbox, #lightbox-panel").fadeOut(300);  
  });
  
  $('.submit-enews-signup').click(function(){
     if($("requiredField").val()){
       
     }else{
     }
   });
   
   $('[data-mailform]').live('mailform.success',function(){
     $("#lightbox, #lightbox-panel").delay(2000).fadeOut(300);      
   });
  
  // listings lightbox
  $(".request-viewing").click(function(e){ 
    var target = $(e.target),
    listing    = target.closest('.listing'),
    address    = listing.data('address');
    
    $("#lightbox-panel-listings input[name=listing_address]").val(address)
    
    $("#lightbox-listings, #lightbox-panel-listings").fadeIn(300);  
  })  
  $("a#request-viewing-close").click(function(){  
    $("#lightbox-listings, #lightbox-panel-listings").fadeOut(300);  
  });
  
  $('.viewing-request').click(function(){
     if($("requiredField").val()){
       
     }else{
     }
   });
   
   $('[data-mailform]').live('mailform.success',function(e){
     var target = $(e.target);
     
     $("#lightbox-listings, #lightbox-panel-listings").
      delay(2000).
      fadeOut(300,function(){
        target.find('.mailform-error,.mailform-success,.mailform-loading').hide();
        target.find('.actions,.inputs').show();
        target.find("input[disabled]").removeAttr("disabled");
      });
   });
   
  
   //lazy load maps
    $('.map-tab').live('click',function() { 
      var element  = $(this),
      paneSelector = element.attr("href"),
      pane         = $(paneSelector),
      iframe       = pane.find('iframe'),
      oldSrc       = iframe.attr('src'),
      newSrc       = iframe.data('lazy-src');

      if(!oldSrc){
        iframe.attr('src',newSrc);
      }
    });  
});