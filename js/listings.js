(function(){
  
  // Code/logic
  var filterListings = function(e){
    var target   = $(e.target),
        value    = target.val(),
        
        value_bedroom   = $("#show-bedrooms").val(),
        value_price     = $("#show-price"   ).val(),
        value_location  = $("#show-location").val(),
        value_property  = $("#show-property").val();
        
        selectorBedroom   =  value_bedroom  === "" ? "[data-bedrooms]"    : "[data-bedrooms="+value_bedroom+"]",
        selectorPrice     =  value_price    === "" ? "[data-price-range]" : "[data-price-range="+value_price+"]",
        selectorProperty  =  value_property === "" ? "[data-type]"        : "[data-type="+value_property+"]",
        selectorLocation  =  value_location === "" ? "[data-location]"    : "[data-location="+value_location+"]",
        
        masterQuery = selectorBedroom + selectorPrice + selectorProperty + selectorLocation,
        
        listings         = $('.listing'), 
        filteredlistings = listings.filter(masterQuery);
  
     listings.
       stop().
       fadeOut('fast',function(){
         
         setTimeout(function(){
           
           filteredlistings.
             fadeIn('fast'); 
           if(masterQuery.length === 0){
             $('#no-results').
              css( {'height': '65px','width': '100%'})
           }
           
         },500);
     });
   },
   
   reset = function(){
     $(".home-selector").val("").trigger("change");
   };
   
  // Attach listeners once document is ready.
  $(function(){
    $(".home-selector").change(filterListings);
    $('.update-list-button').click(reset);
  });
    
})();