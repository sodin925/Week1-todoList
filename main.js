/*jshint esversion: 6 */

var switchPage = function() {
  $(".container").css("display", "none");
  $(".menu").css("color", "#00408B");
  this.style.color = "#FFFFFF";
  console.log(this.attributes.id.textContent);
};

$(".menu").on("click", switchPage);

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

  // new method.
  $(document).on("click", ".checkbox", function() {
    if (this.checked)
      $(this).parent().css("background", "#808080");
      if (!this.checked)
        $(this).parent().css("background", "");
  });
  
  $("#delete").on("click", function(){
    $(".checkbox:checked").each(function(){
      $(this).parent().remove();
    });
  });
  // endredion new method


  // document.getElementById("delete").disabled = true;
  // $("input").change(function () {
  //   console.log(this);
  //   if (this.checked) {
  //     $(this).parent("div").css("background", "#808080");
  //     document.getElementById("delete").disabled = false;
  //     var x = this;
  //     if ($("#delete").on("click", function () {
  //         $(x).parent("div").remove();
  //         document.getElementById("delete").disabled = true;
  //       }));
  //   } else {
  //     $(this).parent("div").css("background", "#F2F2F2");
  //     document.getElementById("delete").disabled = true;
  //   }
  // });

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

      // newckb.onclick = function () {
      //   console.log(newli);

      // };

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