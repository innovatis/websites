$(function(){
  $("a#show-panel").click(function(e){
    e.preventDefault();  
    $("#lightbox, #lightbox-panel").fadeIn(300);  
  })  
  $("a#close-panel").click(function(e){
    e.preventDefault();  
    $("#lightbox, #lightbox-panel").fadeOut(300);  
  });
  
  $('.submit-enews-signup').click(function(e){
     e.preventDefault();
     if($("requiredField").val()){
       
     }else{
     }
   });
   
   $('[data-mailform]').live('mailform.success',function(){
     $("#lightbox, #lightbox-panel").delay(2000).fadeOut(300);      
   });
});