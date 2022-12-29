$("html").addClass("js");

$(function () {
  var timer = setInterval(showDiv, 5000);

  var counter = 0;

  function showDiv() {
    if (counter == 0) {
      counter++;
      return;
    }

    $("div", "#container")
      .stop()
      .hide()
      .filter(function () {
        console.log(this.id.match("div" + counter));
        return this.id.match("div" + counter);
      })
      .show("fast");
    counter == 3 ? (counter = 0) : counter++;
  }
});
