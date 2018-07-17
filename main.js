$(function () {


  $(".heart").on("click", function () {
    if ($(this).prop("name") == "heart-empty") {
      $(this).parent("div").css("background", "#FFFFBB");
      $(this).attr("name", "heart");
    } else {
      $(this).parent("div").css("background", "#F2F2F2");
      $(this).attr("name", "heart-empty");
    }
  });



  document.getElementById("delete").disabled = true;
  $(".checkbox").change(function () {
    if (this.checked) {
      $(this).parent("div").css("background", "#808080");
      document.getElementById("delete").disabled = false;
      if ($("#delete").on("click", function () {
          
        }));
    } else {
      $(this).parent("div").css("background", "#F2F2F2");
      document.getElementById("delete").disabled = true;
    }
  });

});