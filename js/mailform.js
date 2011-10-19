$(function(){
   //contact form submit
  $('.submit-button').click(function(){
    if($("requiredField").val()){
      
    }else{
  
    }
  });
  
  reset = function(){
     $(".input").val("").trigger("change");
   },
  
  //contact form reset
  $('.reset-button').click(reset);
  
});