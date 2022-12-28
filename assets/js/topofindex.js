var activeraces = [];

var psgsettings =
  "https://docs.google.com/spreadsheets/d/1i2lAHd1gzd3G1-UGbj-MxwRmNSVcbSCF0DvjAD5Um50/pub?output=csv";

//Import Settings from Details Sheet
function init() {
  Papa.parse(psgsettings, {
    download: true,
    header: true,
    complete: getsettings,
  });
}
//Begin Building settings as global variable
currentsettings = [];
function getsettings(results) {
  var settings = results.data;
  currentsettings = settings;
  sortlogic();
}
//Wait for DOM load
window.addEventListener("DOMContentLoaded", init);
var activeraces = [];
//Begin Sort Logic upon complete import of settings then parse End-User Input
async function sortlogic() {
  //Check information from Global Settings variable to filter by active racecodes
  const settingsbuilder = currentsettings.filter((newsettings) => {
    let i = 0;
    do {
      if (newsettings.active === "Y") {
        activeraces.push("#" + newsettings.race_code);
      }
    } while (i < newsettings.length);
  });
}

$("html").addClass("js");

$(function () {
  var timer = setInterval(showDiv, 10000);

  var counter = 0;

  function showDiv() {
    if (counter == 0) {
      counter++;
      return;
    }

    $("div", activeraces.join())
      .stop()
      .hide()
      .filter(function () {
        return this.id.match(+counter);
      })
      .show(900);
    counter == 3 ? (counter = 0) : counter++;
  }
});
