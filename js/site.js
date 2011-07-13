$(function(){

  $("#main-menu .main-nav > li a").live("click", function(e){
    var menuButton = $(e.target).closest('li');
    if(menuButton.hasClass("menu-open")){
      menuButton.find(".dropdown").slideUp(function(){
        menuButton.removeClass("menu-open");
      });
    } else {
      $("#main-menu .main-nav > li").each(function(){
        $(this).find(".dropdown").slideUp(function(){
          menuButton.removeClass("menu-open");
        });
      });
      menuButton.addClass("menu-open");
      menuButton.find(".dropdown").slideDown();
    }
    return false;
  });

});