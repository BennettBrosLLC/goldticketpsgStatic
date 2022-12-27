var responses =
  "https://docs.google.com/spreadsheets/d/1YC4vzjepcRs5wcna0ZZFEPCcWJHKru-iZzKY3uWwuE4/pub?output=csv";

var psgsettings =
  "https://docs.google.com/spreadsheets/d/1i2lAHd1gzd3G1-UGbj-MxwRmNSVcbSCF0DvjAD5Um50/pub?output=csv";

function init() {
  Papa.parse(psgsettings, {
    download: true,
    header: true,
    complete: getsettings,
  });
}
currentsettings = [];
function getsettings(results) {
  var settings = results.data;
  currentsettings = settings;
  sortlogic();
}

window.addEventListener("DOMContentLoaded", init);

async function sortlogic(results) {
  Papa.parse(responses, {
    download: true,
    header: true,
    complete: newsort,
  });
  async function newsort(results) {
    var settings = currentsettings;
    var data = results.data;
    var mtgfirstbox = "";
    var mtgsecondbox = "";
    var mtgthirdbox = "";
    var mtgfourthbox = "";
    let mtgvaluesAlreadySeenOnce = "";
    let mtgvaluesAlreadySeenTwice = "";
    let mtgvaluesAlreadySeenThrice = "";
    let mtgvaluesAlreadySeenQuad = "";
    let mtgsecondresults = false;
    let mtgthirdresults = false;
    let mtgfourthresults = false;
    var ygohfirstbox = "";
    var ygohsecondbox = "";
    var ygohthirdbox = "";
    var ygohfourthbox = "";
    let ygohvaluesAlreadySeenOnce = "";
    let ygohvaluesAlreadySeenTwice = "";
    let ygohvaluesAlreadySeenThrice = "";
    let ygohvaluesAlreadySeenQuad = "";
    let ygohsecondresults = false;
    let ygohthirdresults = false;
    let ygohfourthresults = false;
    var activeraces = "";
    const settingsbuilder = settings.filter((newsettings) => {
      let i = 0;
      do {
        if (newsettings.active === "Y") {
          activeraces += newsettings.race_code + " ";
        }
      } while (i < newsettings.length);
    });
    console.log(activeraces);
    const mtgsystemfilter = data.filter((system) => {
      let i = 0;
      do {
        if (
          system.system === "mtg" &&
          system.Approved === "Y" &&
          activeraces.includes(system.racecode)
        ) {
          //if value has been seen once set results to true
          firstresults = mtgvaluesAlreadySeenOnce.includes(
            JSON.stringify(system.name)
          );
          mtgvaluesAlreadySeenOnce += JSON.stringify(system.name);
          if (
            (firstresults = mtgvaluesAlreadySeenOnce.includes(
              JSON.stringify(system.name)
            ))
          ) {
            mtgsecondresults = mtgvaluesAlreadySeenTwice.includes(
              JSON.stringify(system.name)
            );
            mtgvaluesAlreadySeenTwice += JSON.stringify(system.name);
            if (mtgsecondresults) {
              mtgthirdresults = mtgvaluesAlreadySeenThrice.includes(
                JSON.stringify(system.name)
              );
              mtgvaluesAlreadySeenThrice += JSON.stringify(system.name);
              mtgsecondbox += system.name + "<br>";
              mtgfirstbox = mtgfirstbox.replace(system.name + "<br>", "");

              if (mtgthirdresults) {
                mtgfourthresults = mtgvaluesAlreadySeenQuad.includes(
                  JSON.stringify(system.name)
                );
                mtgvaluesAlreadySeenQuad += JSON.stringify(system.name);
                mtgthirdbox += system.name + "<br>";
                mtgsecondbox = mtgsecondbox.replace(system.name + "<br>", "");
                mtgsecondbox = mtgsecondbox.replace(system.name + "<br>", "");
                if (mtgfourthresults) {
                  mtgfourthbox += system.name + "<br>";
                  mtgthirdbox = mtgthirdbox.replace(system.name + "<br>", "");
                  mtgthirdbox = mtgthirdbox.replace(system.name + "<br>", "");
                  mtgthirdbox = mtgthirdbox.replace(system.name + "<br>", "");
                }
              }
            } else {
              mtgfirstbox += system.name + "<br>";
            }
            i++;
          }
        }
      } while (i < system.length);
    });
    const ygohsystemfilter = data.filter((system) => {
      let i = 0;
      do {
        if (system.system === "ygoh" && system.Approved === "Y") {
          //if value has been seen once set results to true
          firstresults = ygohvaluesAlreadySeenOnce.includes(
            JSON.stringify(system.name)
          );
          ygohvaluesAlreadySeenOnce += JSON.stringify(system.name);
          if (
            (firstresults = ygohvaluesAlreadySeenOnce.includes(
              JSON.stringify(system.name)
            ))
          ) {
            ygohsecondresults = ygohvaluesAlreadySeenTwice.includes(
              JSON.stringify(system.name)
            );
            ygohvaluesAlreadySeenTwice += JSON.stringify(system.name);
            if (ygohsecondresults) {
              ygohthirdresults = ygohvaluesAlreadySeenThrice.includes(
                JSON.stringify(system.name)
              );
              ygohvaluesAlreadySeenThrice += JSON.stringify(system.name);
              ygohsecondbox += system.name + "<br>";
              ygohfirstbox = ygohfirstbox.replace(system.name + "<br>", "");

              if (ygohthirdresults) {
                ygohfourthresults = ygohvaluesAlreadySeenQuad.includes(
                  JSON.stringify(system.name)
                );
                ygohvaluesAlreadySeenQuad += JSON.stringify(system.name);
                ygohthirdbox += system.name + "<br>";
                ygohsecondbox = ygohsecondbox.replace(system.name + "<br>", "");
                ygohsecondbox = ygohsecondbox.replace(system.name + "<br>", "");
                if (ygohfourthresults) {
                  ygohfourthbox += system.name + "<br>";
                  ygohthirdbox = ygohthirdbox.replace(system.name + "<br>", "");
                  ygohthirdbox = ygohthirdbox.replace(system.name + "<br>", "");
                  ygohthirdbox = ygohthirdbox.replace(system.name + "<br>", "");
                }
              }
            } else {
              ygohfirstbox += system.name + "<br>";
            }
            i++;
          }
        }
      } while (i < system.length);
    });
    if (ygohfirstbox == 0) {
      ygohfirstbox += "Maybe You?";
    }
    if (ygohsecondbox == 0) {
      ygohsecondbox += "Maybe You?";
    }
    if (ygohthirdbox == 0) {
      ygohthirdbox += "Maybe You?";
    }
    if (ygohfourthbox == 0) {
      ygohfourthbox += "Maybe You?";
    }
    if (mtgfirstbox == 0) {
      mtgfirstbox += "Maybe You?";
    }
    if (mtgsecondbox == 0) {
      mtgsecondbox += "Maybe You?";
    }
    if (mtgthirdbox == 0) {
      mtgthirdbox += "Maybe You?";
    }
    if (mtgfourthbox == 0) {
      mtgfourthbox += "Maybe You?";
    }
    document.getElementById("ygohdemobox1").innerHTML = ygohfirstbox;
    document.getElementById("ygohdemobox2").innerHTML = ygohsecondbox;
    document.getElementById("ygohdemobox3").innerHTML = ygohthirdbox;
    document.getElementById("ygohdemobox4").innerHTML = ygohfourthbox;
    document.getElementById("mtgdemobox1").innerHTML = mtgfirstbox;
    document.getElementById("mtgdemobox2").innerHTML = mtgsecondbox;
    document.getElementById("mtgdemobox3").innerHTML = mtgthirdbox;
    document.getElementById("mtgdemobox4").innerHTML = mtgfourthbox;
  }
}
