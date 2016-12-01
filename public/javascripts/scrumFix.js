$(function(){
  $(document).ready(function(){
    $.ajax({
      method:"POST",
      url:"http://localhost:3000/fixSetValue",
      success:function(data){
        if(data != "1"){
          $("#header").val(data[0]["header"])
          $("#date").val(data[0]["date"])
          $("#content").val(data[0]["content"])
        }
        else{
          alert("Access Denied")
        }
      },
      error:function(){
        alert("Server Error 500")
      }
    });
  });

  $(".memoBtn").click(function fixScrum(){
    var header = $("#header").val()
    var date = $("#date").val()
    var content = $("#content").val()

    $.ajax({
      method:"POST",
      url:"http://localhost:3000/returnFixScrum",
      data:{"header":header,"date":date,"content":content},
      success:function(data){
        if(data == "0"){
          window.location ="scrum.html"
        }
        else{
          alert("Access Denied")
        }
      },
      error:function(){
        alert("Server Error 500")
      }
    })


  });
});
