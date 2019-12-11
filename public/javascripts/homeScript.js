$(function () {
  function searchStudy(data){
    $.get("/openstudy-list/1", {
      name : $("#name").val(),
    },function(data, status){
     if(data.res){
        window.location = "/openstudy-list/1";
     } else {
         alert(data.msg);
     }
    });
  }

  $("#searchBtn").click(function(){
    console.log('search butn click');
    var name = $("#name").val();
    $.ajax({
        type: "GET",
        data: name,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data) {
          window.location = "/openstudy-list/1/" + name;
        },
        error: function (e) {
          console.log("ERROR : ", e);
          alert("fail");
        }
    });
  });

    //본문에 이미지 첨부
    var formData = new FormData();
    var isImgAttached = false; 
    var file = null;
    $("#inputGroupFile04").change(function (e) {
      console.log("uploader called");
      file = e.target.files[0];
      console.log(file);
      alert(file + 'mg selected');
      //$('#imgLabel').val("이미지 선택 됨");
      formData.append('img', file);
      isImgAttached = true;
    });
    function sendPost(data){
        $.post("/study/create", {
            name : $("#modal_name").val(),
            info : $("#modal_info").val(),
            imgUrl : data.url,
          },function(data, status){
           if(data.res){
               window.location = "/study-list/1";
           } else {
               alert(data.msg);
           }
          });
    }
    $("#submitBtn").click(function(){
      console.log('submit butn click');
      if(isImgAttached && file != null){
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: "/img",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
              sendPost(data);
            },
            error: function (e) {
              console.log("ERROR : ", e);
              $("#btnSubmit").prop("disabled", false);
              alert("fail");
            }
          });
      } else {
        sendPost({url : "/uploads/course-1.jpg"});
      }
    });
    
//////////////////////////////        
});



    
    