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
});

function newlist() {
  var ul = document.getElementById("mylist");
  var li = document.createElement("li");
  var nameinput = document.getElementById("nameinput").value;
  console.log(nameinput);
  if (nameinput === "") {
    alert("you need to write something");
  } else {
    li.appendChild(document.createTextNode(nameinput));
    ul.appendChild(li);
    li.setAttribute("class", "card");
  }
  document.getElementById("nameinput").value = "";
}