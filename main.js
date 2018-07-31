/*jshint esversion: 6 */


function checkList() {
  var allList = mylist.getElementsByTagName("li");
  var wantToDelete = [];
  for (var i = 0; i < allList.length; i++) {
    var thisItem = allList[i];
    var now = new Date();
    if (new Date(thisItem.deadLine) < now) {
      console.log(thisItem.deadLine);
      var cloned = document.createElement("li");
      cloned.innerHTML = thisItem.innerHTML;
      complete.appendChild(cloned);
      wantToDelete.push(thisItem);
    }
  }
  wantToDelete.forEach(function (a) {
    a.remove();
  });
}



$(function () {
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

      newli.deadLine = todo.time;
      newli.innerText = "名稱: " + todo.title + " " + "到期日: " + todo.time + " " + "備註: " + todo.memo;
      newli.appendChild(newckb);
      document.getElementById("mylist").appendChild(newli);

    });
    var scanner = setInterval(checkList, 1000);
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

//navbar click
$(".menu").on("click", function () {
  $(".container").css("display", "none");
  $(".menu").css("color", "#00408B");
  $(this).css("color", "#FFFFFF");
  $("#" + this.id.substring(1)).css("display", "");
});

$(".heart").on("click", function () {
  if ($(this).prop("name") == "heart-empty") {
    $(this).parent("div").css("background", "#FFFFBB");
    $(this).attr("name", "heart");
  } else {
    $(this).parent("div").css("background", "#F2F2F2");
    $(this).attr("name", "heart-empty");
  }
});

// new method.
$(document).on("click", ".checkbox", function () {
  if (this.checked)
    $(this).parent().css("background", "#808080");
  if (!this.checked)
    $(this).parent().css("background", "");
});

$("#delete").on("click", function () {
  $(".checkbox:checked").each(function () {
    $(this).parent().remove();
  });
});