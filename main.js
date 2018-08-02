/*jshint esversion: 6 */


var html = "";
function createHtml() {
  html = [
    '          <div class="card-header" id="item1" name="todo">',
    '            <input type="checkbox" class="checkbox">',
    '            <label style="margin-right:400px;">{{title}}</label>',
    '            <ion-icon class="heart" name="heart-empty"></ion-icon>',
    '            <ion-icon class="create" name="create" data-toggle="collapse" data-target="#note1" aria-expanded="false" aria-controls="note1"></ion-icon>',
    '          </div>',
    '          <div id="note1" class="collapse" aria-labelledby="item1">',
    '            <div class="card-body">',
    '              <form>',
    '                <div>',
    '                  <label for="text1">',
    '                    <ion-icon name="build"></ion-icon>名稱</label>',
    '                  <textarea type="text" class="form-control" id="name1" rows="1">{{title}}</textarea>',
    '                </div>',
    '                <div>',
    '                  <label for="date1">',
    '                    <ion-icon name="calendar"></ion-icon>到期日</label>',
    '                  <div class="row">',
    '                    <div class="col">',
    '                      <textarea type="text" class="form-control" id="date1" rows="1">{{date}}</textarea>',
    '                    </div>',
    '                    <div class="col">',
    '                      <textarea type="text" class="form-control" id="time1" rows="1">{{time}}</textarea>',
    '                    </div>',
    '                  </div>',
    '                </div>',
    '                <div>',
    '                  <label for="file1">',
    '                    <ion-icon name="attach"></ion-icon>匯入檔案</label>',
    '                  <input type="file" class="form-control-file" id="file1">',
    '                </div>',
    '                <div>',
    '                  <label for="text1">',
    '                    <ion-icon name="chatbubbles"></ion-icon>備註</label>',
    '                  <textarea class="form-control" id="text1" rows="3">{{memo}}</textarea>',
    '                </div>',
    '                <div class="form-check">',
    '                  <input type="checkbox" class="form-check-input" id="exampleCheck1">',
    '                  <label class="form-check-label" for="exampleCheck1">還沒想好要怎麼用</label>',
    '                </div>',
    '              </form>',
    '            </div>',
    '          </div>',
  ].join("");
  // console.log(html);
  html.replace("{{title}}", todoTitle);
  html.replace("{{date}}", todoDate);
  html.replace("{{time}}", todoTime);
  html.replace("{{memo}}", todoMemo);
}
createHtml();

function checkList() {
  var allList = mylist.getElementsByTagName("div");
  var wantToDelete = [];
  for (var i = 0; i < allList.length; i++) {
    var thisItem = allList[i];
    var now = new Date();
    if (new Date(thisItem.deadLine) < now) {
      // console.log(thisItem.deadLine);
      var cloned = document.createElement("div");
      // console.log(html);

      var newHtml = html;
      newHtml = newHtml.replace("{{title}}", todoTitle);
      newHtml = newHtml.replace("{{date}}", todoDate);
      newHtml = newHtml.replace("{{time}}", todoTime);
      newHtml = newHtml.replace("{{memo}}", todoMemo);

      thisItem.innerHTML = newHtml;
      cloned.innerHTML = thisItem.innerHTML;
      complete.appendChild(cloned);
      wantToDelete.push(thisItem);
    }
  }
  wantToDelete.forEach(function (a) {
    a.remove();
  });
}


var todoTitle = "";
var todoDate = "";
var todoTime = "";
var todoMemo = "";
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
      var newli = document.createElement("div"); //list
      var newckb = document.createElement("input"); //checkbox
      newckb.setAttribute("type", "checkbox");
      newckb.setAttribute("class", "checkbox");

      todoTitle = todo.title;
      todoDate = todo.date;
      todoTime = todo.time;
      todoMemo = todo.memo;

      newli.deadLine = todo.date + " " + todo.time;
      newli.innerText = "名稱: " + todo.title + " " + "到期日: " + todo.date + " " + todo.time + " " + "備註: " + todo.memo;
      newli.appendChild(newckb);
      document.getElementById("mylist").appendChild(newli);

    });
    // var scanner = setInterval(checkList, 1000);
    checkList();
  }).fail(function (err) {
    console.log(err);
  });

  $("#OK").on("click", function () {
    let title = $("#nameinput").val().trim();
    let date = $("#date").val();
    let time = $("#time").val();
    let memo = $("#text1").val();
    if (!title) return false;
    $.ajax({
      url: "http://localhost:3000/todo",
      method: "post",
      dataType: "json",
      data: {
        title: title,
        date: date,
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

