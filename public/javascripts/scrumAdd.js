$(function(){
  $(".memoBtn").click(function(){
    var header = $("#header").val();
    var date = $("#date").val();
    var content = $("#content").val();
    $.ajax({
      method:"POST",
      url:"http://localhost:3000/scrumList",
      success:function(list){

        var length = list.length
        if(list == "a"){
          length = 1;
        }
        else{
          length = length + 1;
        }
        $.ajax({
          method:"POST",
          url:"http://localhost:3000/addScrum",
          data:{"header":header,"date":date,"content":content,"setNum":length},
          success:function(data){
            console.log(data)
            if(data == "0"){
               window.location = "http://localhost:3000/scrum"
             }
            else{
              alert("server error 500")
            }

          },
          error:function(){

          }
        });
      },
      error:function(){

      }
    });
  });
});
