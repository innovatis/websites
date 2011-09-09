
var productWaypoint = function(event,direction){
    event.stopPropagation();
    
    var element = $(this),
    navHolder   = $('#sticky-nav');
    
    if(direction === 'down'){
      navHolder.addClass("sticky");
    }else{
      navHolder.removeClass("sticky");
    }
    
  };
  
var footerWaypoint = function(event,direction){
  event.stopPropagation();
  
  var element = $(this),
  navHolder   = $('#sticky-nav');
  if(direction === 'down'){
      navHolder.hide();
  }else{
      navHolder.show();
  }
  
  
};
  
$(function() {
  var scrollable     = $('.scrollable'),
      products       = $('.products'),
      header         = $('#header'),
      footerProducts = $('#products'),
      navHolder      = $('#sticky-nav');

      
  scrollable.scrollable();
  
	$.waypoints.settings.scrollThrottle = 30;
	
	products.waypoint(productWaypoint);
	footerProducts.waypoint(footerWaypoint, {offset:navHolder.height()+30});
	
	
	
	
});