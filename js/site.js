$(function(){

  $("#main-menu .main-nav > li").live("click", function(e){
    var menuButton = $(e.target).closest('li');
    console.log("in handler");
    if(menuButton.hasClass("menu-open")){
      console.log("has class");
      menuButton.find(".dropdown").slideUp(function(){
        menuButton.removeClass("menu-open");
      });
    } else {
      menuButton.addClass("menu-open");
      menuButton.find(".dropdown").slideDown();
    }

  });

});