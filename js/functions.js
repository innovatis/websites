$(function() {
	$(".scrollable").scrollable({circular:true});
	
	
	$(".scrollable").scrollable().onSeek(function(e,index){
	  $('[data-seek-to]').removeClass("current");
	  $('[data-seek-to]').eq(index).addClass("current");  
	});
	
	$('[data-seek-to]').click(function(){
	  var element = $(this),
	           id = element.attr('data-seek-to'),
	          api = $('.scrollable').scrollable();
	          
	 api.seekTo(id);
  });
});