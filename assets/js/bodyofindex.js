//Define URLs for Data Import
var responses =
  "https://docs.google.com/spreadsheets/d/1YC4vzjepcRs5wcna0ZZFEPCcWJHKru-iZzKY3uWwuE4/pub?output=csv";

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

//Begin Sort Logic upon complete import of settings then parse End-User Input
async function sortlogic(results) {
  Papa.parse(responses, {
    download: true,
    header: true,
    complete: newsort,
  });

  //Begin Sorting End-User Input
  async function newsort(results) {
    var settings = currentsettings;
    var data = results.data;
    var firstbox = "";
    var secondbox = "";
    var thirdbox = "";
    var fourthbox = "";
    let valuesAlreadySeenOnce = "";
    let valuesAlreadySeenTwice = "";
    let valuesAlreadySeenThrice = "";
    let valuesAlreadySeenQuad = "";
    let secondresults = false;
    let thirdresults = false;
    let fourthresults = false;
    var activeraces = [];
    var divids = [];
    //Check information from Global Settings variable to filter by active racecodes
    const settingsbuilder = settings.filter((newsettings) => {
      let i = 0;
      do {
        if (newsettings.active === "Y") {
          activeraces.push(newsettings.race_code);
        }
      } while (i < newsettings.length);
    });
    //Logic for Filtering Position in race
    const systemfilter = data.filter((system) => {
      let z = 0;
      do {
        numbertoloop = 0;
        ApprovedRacers = [];
        CurrentRace = [];
        let target = system.name;

        data.forEach((system) => {
          for (let key in system) {
            // system.keys(name);
            // console.log(`${key}: ${system[key]}`);
            cities
              .filter((city) => city.population < 3000000)
              .sort((c1, c2) => c1.population - c2.population)
              .map((city) => console.log(city.name + ":" + city.population));
            console.log(Object.values(system[3]));
            // console.log(system[key.name]);
          }
        });

        // let i = 0;
        // do {
        //   {
        //     divids = divids += system.racecode;
        //     if (system.system === "mtg") {
        //       headerimage = "assets/images/MTGWhite.webp";
        //     }
        //     if (system.system === "ygoh") {
        //       headerimage = "assets/images/Yugioh_Logo.webp";
        //     }
        //     if (system.system === "boardgames") {
        //       headerimage = "assets/images/Game_Night_Logo_Color.webp";
        //     }
        //     if (system.system === "warhammer") {
        //       headerimage = "assets/images/Warhammer-40K-Logo.webp";
        //     }
        //     if (system.system === "dungeonsanddragons") {
        //       headerimage = "assets/images/dd-logo.webp";
        //     }
        //     if (system.system === "vanguard") {
        //       headerimage = "assets/images/CFVG.webp";
        //     }
        //     if (system.system === "pathfinder") {
        //       headerimage = "assets/images/pathfinder-rpg-logo.webp";
        //     }
        //     if (system.Approved === "Y") {
        //       //if value has been seen once set results to true
        //       firstresults = valuesAlreadySeenOnce.includes(
        //         JSON.stringify(system.name)
        //       );
        //       valuesAlreadySeenOnce += JSON.stringify(system.name);
        //       if (
        //         (firstresults = valuesAlreadySeenOnce.includes(
        //           JSON.stringify(system.name)
        //         ))
        //       ) {
        //         secondresults = valuesAlreadySeenTwice.includes(
        //           JSON.stringify(system.name)
        //         );
        //         valuesAlreadySeenTwice += JSON.stringify(system.name);
        //         if (secondresults) {
        //           thirdresults = valuesAlreadySeenThrice.includes(
        //             JSON.stringify(system.name)
        //           );
        //           valuesAlreadySeenThrice += JSON.stringify(system.name);
        //           secondbox += system.name + "<br>";
        //           firstbox = firstbox.replace(system.name + "<br>", "");

        //           if (thirdresults) {
        //             fourthresults = valuesAlreadySeenQuad.includes(
        //               JSON.stringify(system.name)
        //             );
        //             valuesAlreadySeenQuad += JSON.stringify(system.name);
        //             thirdbox += system.name + "<br>";
        //             secondbox = secondbox.replace(system.name + "<br>", "");
        //             secondbox = secondbox.replace(system.name + "<br>", "");
        //             if (fourthresults) {
        //               fourthbox += system.name + "<br>";
        //               thirdbox = thirdbox.replace(system.name + "<br>", "");
        //               thirdbox = thirdbox.replace(system.name + "<br>", "");
        //               thirdbox = thirdbox.replace(system.name + "<br>", "");
        //             }
        //           }
        //         }
        //       }
        //     }
        //   } else {
        //     firstbox += system.name + "<br>";
        //   }
        //   if (firstbox == 0) {
        //     firstbox += "Maybe You?";
        //   }
        //   if (secondbox == 0) {
        //     secondbox += "Maybe You?";
        //   }
        //   if (thirdbox == 0) {
        //     thirdbox += "Maybe You?";
        //   }
        //   if (fourthbox == 0) {
        //     fourthbox += "Maybe You?";
        //   }
        //   console.log("system = " + system.system + " firstbox = ");
        //   i++;
        // } while (i < system.length);

        z++;
      } while (z < activeraces.length);
    });
    document.getElementById("innercontent").innerHTML = fourthbox;
  }
}
