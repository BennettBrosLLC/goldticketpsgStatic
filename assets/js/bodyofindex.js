var public_spreadsheet_url =
  "https://docs.google.com/spreadsheets/d/1YC4vzjepcRs5wcna0ZZFEPCcWJHKru-iZzKY3uWwuE4/pub?output=csv";

function init() {
  Papa.parse(public_spreadsheet_url, {
    download: true,
    header: true,
    complete: sortlogic,
  });
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("DOMContentLoaded", init2);

function sortlogic(results) {
  var data = results.data;
  var mtgcfirstbox = "";
  var mtgcsecondbox = "";
  var mtgcthirdbox = "";
  var mtgcfourthbox = "";
  let mtgcvaluesAlreadySeenOnce = "";
  let mtgcvaluesAlreadySeenTwice = "";
  let mtgcvaluesAlreadySeenThrice = "";
  let mtgcvaluesAlreadySeenQuad = "";
  let mtgcsecondresults = false;
  let mtgcthirdresults = false;
  let mtgcfourthresults = false;
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
  const mtgcsystemfilter = data.filter((system) => {
    let i = 0;
    do {
      if (system.system === "mtgc" && system.Approved === "Y") {
        //if value has been seen once set results to true
        firstresults = mtgcvaluesAlreadySeenOnce.includes(
          JSON.stringify(system.name)
        );
        mtgcvaluesAlreadySeenOnce += JSON.stringify(system.name);
        if (
          (firstresults = mtgcvaluesAlreadySeenOnce.includes(
            JSON.stringify(system.name)
          ))
        ) {
          mtgcsecondresults = mtgcvaluesAlreadySeenTwice.includes(
            JSON.stringify(system.name)
          );
          mtgcvaluesAlreadySeenTwice += JSON.stringify(system.name);
          if (mtgcsecondresults) {
            mtgcthirdresults = mtgcvaluesAlreadySeenThrice.includes(
              JSON.stringify(system.name)
            );
            mtgcvaluesAlreadySeenThrice += JSON.stringify(system.name);
            mtgcsecondbox += system.name + "<br>";
            mtgcfirstbox = mtgcfirstbox.replace(system.name + "<br>", "");

            if (mtgcthirdresults) {
              mtgcfourthresults = mtgcvaluesAlreadySeenQuad.includes(
                JSON.stringify(system.name)
              );
              mtgcvaluesAlreadySeenQuad += JSON.stringify(system.name);
              mtgcthirdbox += system.name + "<br>";
              mtgcsecondbox = mtgcsecondbox.replace(system.name + "<br>", "");
              mtgcsecondbox = mtgcsecondbox.replace(system.name + "<br>", "");
              if (mtgcfourthresults) {
                mtgcfourthbox += system.name + "<br>";
                mtgcthirdbox = mtgcthirdbox.replace(system.name + "<br>", "");
                mtgcthirdbox = mtgcthirdbox.replace(system.name + "<br>", "");
                mtgcthirdbox = mtgcthirdbox.replace(system.name + "<br>", "");
              }
            }
          } else {
            mtgcfirstbox += system.name + "<br>";
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
  if (mtgcfirstbox == 0) {
    mtgcfirstbox += "Maybe You?";
  }
  if (mtgcsecondbox == 0) {
    mtgcsecondbox += "Maybe You?";
  }
  if (mtgcthirdbox == 0) {
    mtgcthirdbox += "Maybe You?";
  }
  if (mtgcfourthbox == 0) {
    mtgcfourthbox += "Maybe You?";
  }
  document.getElementById("ygohdemobox1").innerHTML = ygohfirstbox;
  document.getElementById("ygohdemobox2").innerHTML = ygohsecondbox;
  document.getElementById("ygohdemobox3").innerHTML = ygohthirdbox;
  document.getElementById("ygohdemobox4").innerHTML = ygohfourthbox;
  document.getElementById("mtgdemobox1").innerHTML = mtgcfirstbox;
  document.getElementById("mtgdemobox2").innerHTML = mtgcsecondbox;
  document.getElementById("mtgdemobox3").innerHTML = mtgcthirdbox;
  document.getElementById("mtgdemobox4").innerHTML = mtgcfourthbox;
}
