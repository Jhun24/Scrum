$(document).ready(function(){
  $(".loginBox").keyup(function(event){
   if (!(event.keyCode >=37 && event.keyCode<=40)) {
    var inputVal = $(this).val();
    $(this).val(inputVal.replace(/[^a-z0-9]/gi,''));
   }
  });
});


$(function(){
  $(".btn").click(function(){
    var id = $("#id").val();
    var name = $("#name").val();
    var ps = $("#ps").val();

    $.ajax({
      method:"POST",
      url:"http://localhost:3000/addId",
      data:{"id":id,"ps":ps,"name":name},
      success:function(data){
        if(data == "0"){
          window.location = "http://localhost:3000";
        }
        else{
          alert("존재하는 아이디 입니다")
        }
      },
      error:function(){

      }
    });
  });
});
