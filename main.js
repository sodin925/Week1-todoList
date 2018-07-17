$(function () {

  $(".star").on("click", function () {
    $(".star").parent("div").toggleClass("favorite");
    // if ($(".star").prop("name") == "star-outline") {
    //   $(".star").parent("div").css("background", "#FFFFBB");
    //   $(".star").attr("name", "star");
    // } else {
    //   $(".star").parent("div").css("background", "#F2F2F2");
    //   $(".star").attr("name", "star-outline");
    // }
  });

  document.getElementById("delete").disabled = true;
  $("#checkbox").change(function () {
    if (this.checked) {
      $("#checkbox").parent("div").css("background", "rgb(124, 124, 124)");
      document.getElementById("delete").disabled = false;
    } else {
      $("#checkbox").parent("div").css("background", "#F2F2F2");
      document.getElementById("delete").disabled = true;
    }
  });

});