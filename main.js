$(function () {
  $(".star").on("click", function () {
    if ($(this).prop("name") == "star-outline") {
      $(this).parent("div").css("background", "rgb(251, 252, 186)");
      $(this).attr("name", "star");
    } else {
      $(this).parent("div").css("background", "rgb(230, 230, 230)");
      $(this).attr("name", "star-outline");
    }
  });

  $("#checkbox").change(function () {
    if (this.checked) {
      $(this).parent("div").css("background", "#757575");
    } else {
      $(this).parent("div").css("background", "#F2F2F2");
    }
  });
});

$("#checkbox").change(function () {
  if (this.checked) {
    $("#delete").button("enable");
  } else {
    $("#delete").button("disable");
  }
});