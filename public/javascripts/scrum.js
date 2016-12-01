$(function(){
  var check;


  $(".doingBox").droppable({

     tolerance: "intersect",
     accept: ".scrum",
     hoverClass: "droppable-active",



     drop:function(event,ui){

       var inter = ui;
       $.ajax({
         method:"POST",
         url:"http://localhost:3000/changeSetPlace",
         data:{"check":check,"value":"doing"},
         success:function(data){
           if(data == "0"){
             $(".doingBox").append($(inter.draggable));
           }
           else{
             alert("Server Error 500")
           }
         }
       })
     }
   });

   $(".doneBox").droppable({

      tolerance: "intersect",
      accept: ".scrum",
      hoverClass: "droppable-active",



      drop:function(event, ui){

        var inter = ui;
        $.ajax({
          method:"POST",
          url:"http://localhost:3000/changeSetPlace",
          data:{"check":check,"value":"done"},
          success:function(data){
            if(data == "0"){
              $(".doneBox").append($(inter.draggable));
            }
            else{
              alert("Server Error 500")
            }
          }
        })
      }
    });

    $(".addBtn").click(function(){
      window.location = "http://localhost:3000/scrumAdd"
    });
  // $(".addBtn").click(function(){
  //   console.log("a")
  //   var scrum = "<div class=\"scrum\">"
  //       scrum += "<div class=\"scrumContentHeader\">"
  //       scrum += "<h1>"
  //       scrum += "Add Login"
  //       scrum += "</h1>"
  //       scrum += "</div>"
  //
  //       scrum += "<div class=\"scrumContentDate\">"
  //       scrum += "2016.10.31"
  //       scrum += "</div>"
  //
  //       scrum += "<div class=\"scrumContentContent\">"
  //       scrum += "Good"
  //       scrum += "</div>"
  //
  //       scrum += "<div class=\"scrumContentBtn\">"
  //       scrum += "<div class=\"memoBtn\">"
  //       scrum += "Change"
  //       scrum += "</div>"
  //       scrum += "</div>"
  //       scrum += "</div>"
  //       console.log(scrum)
  //       $(".todoBox").append(scrum);
  //
  //       $(".scrum").draggable({
  //         revert:"invalid",
  //          appendTo:"body",
  //          cursor:"pointer",
  //          helper: 'clone',
  //
  //      });
  // });
  $(".scrum").draggable({
      revert:"invalid",
     appendTo:"body",
     cursor:"pointer",
     helper: 'clone',

     drag:function(){
       var e= $(this).html()
       console.log(e);
     }
   });

    // front js finish

    window.onload = function sessionIdCheck(){
      $.ajax({
        method:"POST",
        url:"http://localhost:3000/sessionIdCheck",
        success:function(data){
          if(data == "1"){
            window.location = "login.html"
          }
          else{
            $.ajax({
              method:"POST",
              url:"http://localhost:3000/scrumList",
              success:function(list){
                console.log(list)
                if(list == "1"){
                  alert("No Scrum Data")
                }
                else{
                  for(var i = 0; i<list.length; i++){
                    var scrum = "<div class=\"scrum\">"
                    scrum += "<div id=\""+list[i]["setNum"]+"\" class=\"scrumContentHeader\">"
                    scrum += "<h1>"
                    scrum += list[i]["header"]
                    scrum += "</h1>"
                    scrum += "</div>"

                    scrum += "<div class=\"scrumContentDate\">"
                    scrum += list[i]["date"]
                    scrum += "</div>"

                    scrum += "<div class=\"scrumContentContent\">"
                    scrum += list[i]["content"]
                    scrum += "</div>"

                    scrum += "<div class=\"scrumContentBtn\">"
                    scrum += "<div class=\"BtnBox\">"
                    scrum += "<div id=\""+list[i]["setNum"]+"\" class=\"memoBtn\">"
                    scrum += "Change"
                    scrum += "</div>"
                    scrum += "</div>"
                    scrum += "</div>"
                    scrum += "</div>"


                    if(list[i]["setPlace"] == "todo"){
                      $(".todoBox").append(scrum);

                      $(".scrum").draggable({
                        revert:"invalid",
                         appendTo:"body",
                         cursor:"pointer",
                         helper: 'clone',

                         drag:function(){
                           var getHtml = $(this).html()
                           var frSplit = getHtml.split("div id=\"")
                           var data = frSplit[1].split("\"")
                           check = data[0];
                         }

                     });
                    }
                    else if(list[i]["setPlace"] == "doing"){
                      $(".doingBox").append(scrum);

                      $(".scrum").draggable({
                        revert:"invalid",
                         appendTo:"body",
                         cursor:"pointer",
                         helper: 'clone',

                         drag:function(){
                           var getHtml = $(this).html()
                           var frSplit = getHtml.split("div id=\"")
                           var data = frSplit[1].split("\"")
                           check = data[0];
                         }
                     });
                    }
                    else if(list[i]["setPlace"] == "done"){
                      $(".doneBox").append(scrum);

                      $(".scrum").draggable({
                        revert:"invalid",
                         appendTo:"body",
                         cursor:"pointer",
                         helper: 'clone',

                         drag:function(){
                           var getHtml = $(this).html()
                           var frSplit = getHtml.split("div id=\"")
                           var data = frSplit[1].split("\"")
                           check = data[0];
                         }

                     });
                    }
                  }

                  $(".BtnBox").click(function memoClick(){
                    var txt = $(this).html()
                    var data = txt.split("id=\"")
                    var setNum = data[1].split("\"")
                    console.log(setNum[0])

                    $.ajax({
                      method:"POST",
                      url:"http://localhost:3000/scrumFix",
                      data:{"setNum":setNum[0]},
                      success:function(data){
                          if(data == "0"){
                            window.location = "http://localhost:3000/fix"
                          }
                      }
                    })
                  });

                }

              },
              error:function(){
                alert("server error 500")
              }
            });
          }
        },
        error:function(){

        }

      });

    }

    $(".scrumLogout").click(function(){
      $.ajax({
        method:"POST",
        url:"http://localhost:3000/logout",
        success:function(data){
          if(data == "1"){
            window.location = "login.html"
          }
        },
        error:function(){
          alert("server Error 500")
        }
      });
    });




});
