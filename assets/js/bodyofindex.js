var public_spreadsheet_url =
  "https://docs.google.com/spreadsheets/d/1YC4vzjepcRs5wcna0ZZFEPCcWJHKru-iZzKY3uWwuE4/pub?output=csv";

function init() {
  Papa.parse(public_spreadsheet_url, {
    download: true,
    header: true,
    complete: showInfo,
  });
}

function init2() {
  Papa.parse(public_spreadsheet_url, {
    download: true,
    header: true,
    complete: showInfo2,
  });
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener("DOMContentLoaded", init2);

function showInfo(results) {
  var data = results.data;
  var mtgcfirstbox = "";
  var mtgcsecondbox = "";
  var mtgcthirdbox = "";
  var mtgcfourthbox = "";
  let valuesAlreadySeenOnce = "";
  let valuesAlreadySeenTwice = "";
  let valuesAlreadySeenThrice = "";
  let valuesAlreadySeenQuad = "";
  let secondresults = false;
  let thirdresults = false;
  let fourthresults = false;
  const mtgcsystemfilter = data.filter((system) => {
    let i = 0;
    do {
      if (system.system === "mtgc" && system.Approved === "Y") {
        //if value has been seen once set results to true
        firstresults = valuesAlreadySeenOnce.includes(
          JSON.stringify(system.name)
        );
        valuesAlreadySeenOnce += JSON.stringify(system.name);
        if (
          (firstresults = valuesAlreadySeenOnce.includes(
            JSON.stringify(system.name)
          ))
        ) {
          secondresults = valuesAlreadySeenTwice.includes(
            JSON.stringify(system.name)
          );
          valuesAlreadySeenTwice += JSON.stringify(system.name);
          if (secondresults) {
            thirdresults = valuesAlreadySeenThrice.includes(
              JSON.stringify(system.name)
            );
            valuesAlreadySeenThrice += JSON.stringify(system.name);
            mtgcsecondbox += system.name + "<br>";
            mtgcfirstbox = mtgcfirstbox.replace(system.name + "<br>", "");

            if (thirdresults) {
              fourthresults = valuesAlreadySeenQuad.includes(
                JSON.stringify(system.name)
              );
              valuesAlreadySeenQuad += JSON.stringify(system.name);
              mtgcthirdbox += system.name + "<br>";
              mtgcsecondbox = mtgcsecondbox.replace(system.name + "<br>", "");
              mtgcsecondbox = mtgcsecondbox.replace(system.name + "<br>", "");
              if (fourthresults) {
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
  document.getElementById("mtgdemobox1").innerHTML = mtgcfirstbox;
  document.getElementById("mtgdemobox2").innerHTML = mtgcsecondbox;
  document.getElementById("mtgdemobox3").innerHTML = mtgcthirdbox;
  document.getElementById("mtgdemobox4").innerHTML = mtgcfourthbox;
}

function showInfo2(results) {
  var data = results.data;
  var ygohfirstbox = "";
  var ygohsecondbox = "";
  var ygohthirdbox = "";
  var ygohfourthbox = "";
  let valuesAlreadySeenOnce = "";
  let valuesAlreadySeenTwice = "";
  let valuesAlreadySeenThrice = "";
  let valuesAlreadySeenQuad = "";
  let secondresults = false;
  let thirdresults = false;
  let fourthresults = false;
  const ygohsystemfilter = data.filter((system) => {
    let i = 0;
    do {
      if (system.system === "ygoh" && system.Approved === "Y") {
        //if value has been seen once set results to true
        firstresults = valuesAlreadySeenOnce.includes(
          JSON.stringify(system.name)
        );
        valuesAlreadySeenOnce += JSON.stringify(system.name);
        if (
          (firstresults = valuesAlreadySeenOnce.includes(
            JSON.stringify(system.name)
          ))
        ) {
          secondresults = valuesAlreadySeenTwice.includes(
            JSON.stringify(system.name)
          );
          valuesAlreadySeenTwice += JSON.stringify(system.name);
          if (secondresults) {
            thirdresults = valuesAlreadySeenThrice.includes(
              JSON.stringify(system.name)
            );
            valuesAlreadySeenThrice += JSON.stringify(system.name);
            ygohsecondbox += system.name + "<br>";
            ygohfirstbox = ygohfirstbox.replace(system.name + "<br>", "");

            if (thirdresults) {
              fourthresults = valuesAlreadySeenQuad.includes(
                JSON.stringify(system.name)
              );
              valuesAlreadySeenQuad += JSON.stringify(system.name);
              ygohthirdbox += system.name + "<br>";
              ygohsecondbox = ygohsecondbox.replace(system.name + "<br>", "");
              ygohsecondbox = ygohsecondbox.replace(system.name + "<br>", "");
              if (fourthresults) {
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
  document.getElementById("ygohdemobox1").innerHTML = ygohfirstbox;
  document.getElementById("ygohdemobox2").innerHTML = ygohsecondbox;
  document.getElementById("ygohdemobox3").innerHTML = ygohthirdbox;
  document.getElementById("ygohdemobox4").innerHTML = ygohfourthbox;
}
