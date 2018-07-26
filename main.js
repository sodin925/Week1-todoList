/*jshint esversion: 6 */
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
      var x = this;
      if ($("#delete").on("click", function () {
          $(x).parent("div").remove();
          document.getElementById("delete").disabled = true;
        }));
    } else {
      $(this).parent("div").css("background", "#F2F2F2");
      document.getElementById("delete").disabled = true;
    }
  });
  $.ajax({
    url: "http://localhost:3000/todo",
    method: "get",
    dataType: "json",
    data: {},
  }).done(function (res) {
    // console.log(res);
    $("#mylist").empty();
    res.forEach(function (todo) {
      var newli = document.createElement("li"); //list
      var newckb = document.createElement("input"); //checkbox
      newckb.setAttribute("type", "checkbox");
      newckb.setAttribute("class", "checkbox");
      newli.innerText = "名稱: " + todo.title + " " + "到期日: " + todo.time + " " + "備註: " + todo.memo;
      newli.appendChild(newckb);
      document.getElementById("mylist").appendChild(newli);
    });

  }).fail(function (err) {
    console.log(err);
  });
  $("#OK").on("click", function () {
    let title = $("#nameinput").val().trim();
    let time = $("#date").val() + " " + $("#time").val();
    let memo = $("#text1").val();
    if (!title) return false;
    $.ajax({
      url: "http://localhost:3000/todo",
      method: "post",
      dataType: "json",
      data: {
        title: title,
        time: time,
        memo: memo
      }
    });
  });

});