$(function(){
  $(".home-selector").change(function(e){
    var target   = $(e.target),
        value    = target.val(),
        value_bedroom = $("#show-bedrooms").val(),
        value_price = $("#show-price").val(),
        value_location = $("#show-location").val(),
        value_property = $("#show-property").val();
        selectorBedroom =  value_bedroom === "" ? "[data-bedrooms]" : "[data-bedrooms="+value_bedroom+"]",
        selectorPrice =  value_price === "" ? "[data-price-range]" : "[data-price-range="+value_price+"]",
        selectorProperty =  value_property === "" ? "[data-type]" : "[data-type="+value_property+"]",
        selectorLocation =  value_location === "" ? "[data-location]" : "[data-location="+value_location+"]",
        listings = $('.listing'); 
    
    console.log(value,selectorBedroom,selectorPrice,selectorProperty,selectorLocation);
    
    // listings.
    //   not(selectorBedroom,selectorPrice,selectorProperty,selectorLocation).
    //   hide();
    //   
    // listings.
    //   filter(selectorBedroom,selectorPrice,selectorProperty,selectorLocation).
    //   show();
      
    if (value == "1-bedroom") {
      listings.
        not(selectorBedroom).
        hide();
      listings.
        filter(selectorBedroom).
        show();
        }
    if (value == "2-bedroom") {
      listings.
        not(selectorBedroom).
        hide();
      listings.
        filter(selectorBedroom).
        show();
        }
    if (value == "3-bedroom") {
      listings.
        not(selectorBedroom).
        hide();
      listings.
        filter(selectorBedroom).
        show();
        }
    if (value == "4-bedroom") {
      listings.
        not(selectorBedroom).
        hide();
      listings.
        filter(selectorBedroom).
        show();
        }  
    if (value == "3-bedroom") {
      listings.
        not(selectorBedroom).
        hide();
      listings.
        filter(selectorBedroom).
        show();
        }
    if (value == "0-150k") {
      listings.
        not(selectorPrice).
        hide();
      listings.
        filter(selectorPrice).
        show();
        }
    if (value == "150-200k") {
      listings.
        not(selectorPrice).
        hide();
      listings.
        filter(selectorPrice).
        show();
        }      
    if (value == "200-350k") {
      listings.
        not(selectorPrice).
        hide();
      listings.
        filter(selectorPrice).
        show();
        }     
    if (value == "350k-plus") {
      listings.
        not(selectorPrice).
        hide();
      listings.
        filter(selectorPrice).
        show();
        }        
    if (value == "split-level") {
      listings.
        not(selectorProperty).
        hide();
      listings.
        filter(selectorProperty).
        show();
        }    
    if (value == "townhouse") {
      listings.
        not(selectorProperty).
        hide();
      listings.
        filter(selectorProperty).
        show();
        }
    if (value == "bungalow") {
      listings.
        not(selectorProperty).
        hide();
      listings.
        filter(selectorProperty).
        show();
        }
    if (value == "condo") {
      listings.
        not(selectorProperty).
        hide();
      listings.
        filter(selectorProperty).
        show();
        }
    if (value == "osbourne") {
      listings.
        not(selectorLocation).
        hide();
      listings.
        filter(selectorLocation).
        show();
        }
    if (value == "st-vital") {
      listings.
        not(selectorLocation).
        hide();
      listings.
        filter(selectorLocation).
        show();
        }
    if (value == "river-heights") {
      listings.
        not(selectorLocation).
        hide();
      listings.
        filter(selectorLocation).
        show();
        }
    if (value == "transcona") {
      listings.
        not(selectorLocation).
        hide();
      listings.
        filter(selectorLocation).
        show();
        }
    
    
    
  })
});



$(function(){
  
  //reset the list
  $('.update-list-button').click(function(){
    $("#show-bedrooms").val("");
    $("#show-price").val("");
    $("#show-location").val("");
    $("#show-property").val("");
    $("#listings").
      filter().
      show();
  })
});