$(function(){
  $("#show-price").change(function(e){
    var target   = $(e.target),
        value    = target.val(),
        selector =  value === "" ? "[data-price-range]" : "[data-price-range="+value+"]",
        listings = $('.listing'); 
    
    console.log(value,selector);
    
    listings.
      not(selector).
      hide();
      
    listings.
       filter(selector).
       show();
  })
});