$("html").addClass("js");

$(function () {
  var timer = setInterval(showDiv, 5000);

  var counter = 0;

  function showDiv() {
    if (counter == 0) {
      counter++;
      return;
    }

    $("#div1, #div2, #div3")
      .stop()
      .hide()
      .filter(function () {
        return this.id.match("div" + counter);
      })
      .show("fast");
    counter == 3 ? (counter = 0) : counter++;
  }
});
