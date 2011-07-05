$(function(){
  $("#show-price").change(function(e){
    var target =$(e.target);
    var value = target.val();
    $(".listing").not("[data-type=value]").hide()
    $(".listing").e("[data-type=value]").show()
  })
});


// 
// $(".listing").not("[data-type=condo]").hide()
//


// $(function(){
//   $("#show-price").change(function(e){
//     var target =$(e.target);
//     var value = target.val();
//     (".listing").not("[data-type=value]").hide()
//     (".listing").e("[data-type=value]").show()
//   })
// });