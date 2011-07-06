$(function(){
  $("#show-bedrooms").change(function(e){
    var target   = $(e.target),
        value    = target.val(),
        selector =  value === "" ? "[data-bedrooms]" : "[data-bedrooms="+value+"]",
        listings = $('.listing'); 
    
    // console.log(value,selector);
    
    listings.
      not(selector).
      hide();
      
    listings.
       filter(selector).
       show();
  })
});


$(function(){
  $("#show-price").change(function(e){
    var target   = $(e.target),
        value    = target.val(),
        selector =  value === "" ? "[data-price-range]" : "[data-price-range="+value+"]",
        listings = $('.listing'); 
    
    // console.log(value,selector);
    
    listings.
      not(selector).
      hide();
      
    listings.
       filter(selector).
       show();
  })
});


$(function(){
  $("#show-location").change(function(e){
    var target   = $(e.target),
        value    = target.val(),
        selector =  value === "" ? "[data-location]" : "[data-location="+value+"]",
        listings = $('.listing'); 
    
    // console.log(value,selector);
    
    listings.
      not(selector).
      hide();
      
    listings.
       filter(selector).
       show();
  })
});


$(function(){
    $("#show-property").change(function(e){
      var target   = $(e.target),
          value    = target.val(),
          selector =  value === "" ? "[data-type]" : "[data-type="+value+"]",
          listings = $('.listing'); 
  
      // console.log(value,selector);
  
      listings.
        not(selector).
        hide();
  
      listings.
         filter(selector).
         show();
    })
});


$(function(){
  
  //reset the list
  $('.update-list-button').click(function(){
    $("#show-bedrooms").val("");
    $("#show-price").val("");
    $("#show-location").val("");
    $("#show-property").val("");
    $("#listings").show();
  })
});