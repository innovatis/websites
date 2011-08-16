$(function(){
	$('.top').addClass('hidden');
	$.waypoints.settings.scrollThrottle = 30;
	$('#wrapper').waypoint(function(event, direction) {
		$('.top').toggleClass('hidden topcontainer', direction === "up");
	}, {
		offset: '0%'
	}).find('#nav-container').waypoint(function(event, direction) {
		$(this).parent().toggleClass('sticky', direction === "down");
		event.stopPropagation();
	});
});