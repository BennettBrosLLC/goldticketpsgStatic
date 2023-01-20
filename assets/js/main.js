const raceIntervalCallback = () => {
  const currentDivIndex = raceCollection.findIndex((div) =>
    div.classList.contains("ourshow")
  );
  const nextDivIndex =
    currentDivIndex === raceCollection.length - 1 ? 0 : currentDivIndex + 1;
  const currentDiv = raceCollection[currentDivIndex];
  const nextDiv = raceCollection[nextDivIndex];
  currentDiv.classList.remove("ourshow");
  currentDiv.classList.add("ourhiding");
  nextDiv.classList.remove("ourhidden");
  nextDiv.classList.add("ourshow");
  setTimeout(() => {
    currentDiv.classList.remove("ourhiding");
    currentDiv.classList.add("ourhidden");
  }, 250);
};

let raceInterval = false;

const startRaceInterval = () => {
  if (!raceInterval) {
    raceInterval = setInterval(raceIntervalCallback, 30000);
  }
};

const stopRaceInterval = () => {
  if (raceInterval) {
    clearInterval(raceInterval);
    raceInterval = false;
  }
};

//Import User Submitted Racers
const getObjData = async () => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/1YC4vzjepcRs5wcna0ZZFEPCcWJHKru-iZzKY3uWwuE4/pub?output=csv"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.blob();
};

//Import Active race info from Settings sheet
const getSettingData = async () => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/1i2lAHd1gzd3G1-UGbj-MxwRmNSVcbSCF0DvjAD5Um50/pub?output=csv"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.blob();
};

const getObjJSON = async () => {
  let returnableResults;
  await getObjData()
    .then((blob) => {
      return blob.text();
    })
    .then((csv) => {
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          returnableResults = results;
        },
      });
    });
  return returnableResults;
};

const getSettingJSON = async () => {
  let returnableResults;
  await getSettingData()
    .then((blob) => {
      return blob.text();
    })
    .then((csv) => {
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          returnableResults = results;
        },
      });
    });
  return returnableResults;
};

// outside of any other structures you need to define this so that its available in your script
let raceCollection = [];
let arr2 = [];
let newRaceResults = [];

Promise.all([getSettingJSON(), getObjJSON()]).then(
  ([raceResults, memberResults]) => {
    memberResults.data;

    // add a "total" property to each race in the activeRaces array
    raceResults = raceResults.data.map((race) => ({ ...race, total: 0 }));
    // console.log(raceResults);
    // console.log(memberResults);
    memberResults.data.forEach((member) => {
      const i = raceResults.findIndex(
        (race) => race["race_code"] === member.racecode
      );
      raceResults[i].total++;
    });

    function findFirstIndex(race) {
      return race.active === "Y";
    }

    let FirstIndex = raceResults.find((race) => findFirstIndex(race));

    raceResults = raceResults.sort((a, b) => b.total - a.total);
    raceResults.forEach((race, index) => {
      //race init
      if (race.active === "Y" && race["name_of_race"] !== "") {
        //define useable elements for top divs--------------------------------------------------------------------------------------------------|

        const topdiv = document.createElement("div");
        const topofracediv = document.createElement("div");
        const topofraceimgdiv = document.createElement("div");
        const topofracetitlediv = document.createElement("div");
        const outtertitle = document.createElement("h1");
        const descriptor = document.createElement("h3");
        const innertitle = document.createElement("strong");
        const topper = document.createElement("img");

        //top divs--------------------------------------------------------------------------------------------------|

        topdiv.className =
          "position-absolute p-5 top-50 start-50 translate-middle border-5 background-controller rounded border border-warning";
        topdiv.classList.add(
          FirstIndex.name_of_race === race["name_of_race"]
            ? "ourshow"
            : "ourhidden"
        );
        topofracediv.className = "row p-3";
        topofraceimgdiv.className = "col justify-content-start";
        topofracetitlediv.className = "col p-3 justify-content-end text-center";
        topper.className = "boardtopper";
        let descriptorgametype = "";
        if (race["type_of_race"] === "mtg") {
          topper.src = "assets/images/mtg.webp";
          descriptorgametype = "Magic";
        } else if (race["type_of_race"] === "ygoh") {
          topper.src = "assets/images/ygoh.webp";
          descriptorgametype = "Yu-Gi-OH!";
        } else if (race["type_of_race"] === "boardgames") {
          topper.src = "assets/images/boardgames.webp";
          descriptorgametype = "BoardGames";
        } else if (race["type_of_race"] === "warhammer") {
          topper.src = "assets/images/warhammer.webp";
          descriptorgametype = "WarHammer";
        } else if (race["type_of_race"] === "dungeonsanddragons") {
          topper.src = "assets/images/dungeonsanddragons.webp";
          descriptorgametype = "D&D";
        } else if (race["type_of_race"] === "vanguard") {
          topper.src = "assets/images/vanguard.webp";
          descriptorgametype = "Cardfight! Vanguard";
        } else if (race["type_of_race"] === "pathfinder") {
          topper.src = "assets/images/pathfinder.webp";
          descriptorgametype = "Pathfinder";
        }
        topofracediv.appendChild(topofraceimgdiv);
        topofracediv.appendChild(topofracetitlediv);
        topofraceimgdiv.appendChild(topper);
        innertitle.textContent = race["name_of_race"];
        descriptor.textContent =
          "Earn a " +
          descriptorgametype +
          " Golden Ticket by winning this race.";
        topdiv.id = race["race_code"];
        outtertitle.appendChild(innertitle);
        topofracetitlediv.appendChild(outtertitle);
        topofracetitlediv.appendChild(descriptor);
        topdiv.appendChild(topofracediv);

        //define useable elements for top divs--------------------------------------------------------------------------------------------------|

        const centraldiv = document.createElement("div");
        const achievementbox1col = document.createElement("div");
        const achievementbox2col = document.createElement("div");
        const achievementbox3col = document.createElement("div");
        const achievementbox4col = document.createElement("div");
        const achievementbox1 = document.createElement("div");
        const achievementbox2 = document.createElement("div");
        const achievementbox3 = document.createElement("div");
        const achievementbox4 = document.createElement("div");
        const box1col = document.createElement("div");
        const box2col = document.createElement("div");
        const box3col = document.createElement("div");
        const box4col = document.createElement("div");
        const box1 = document.createElement("div");
        const box2 = document.createElement("div");
        const box3 = document.createElement("div");
        const box4 = document.createElement("div");

        //central divs--------------------------------------------------------------------------------------------------|

        //define all classes for central divs
        centraldiv.className =
          "row text-center row-cols-2 row-cols-lg-4 g-2 g-lg-3";
        //achievements---------------------------------------------------------------------------------------|
        achievementbox1col.className = "col";
        achievementbox2col.className = "col";
        achievementbox3col.className = "col";
        achievementbox4col.className = "col";
        achievementbox1.className = "p-3 bg-dark text-white rounded";
        achievementbox2.className = "p-3 bg-dark text-white rounded";
        achievementbox3.className = "p-3 bg-dark text-white rounded";
        achievementbox4.className = "p-3 bg-dark text-white rounded";
        //racerboxes-----------------------------------------------------------------------------------|
        box1col.className = "col centralboxes text-white";
        box2col.className = "col centralboxes text-white";
        box3col.className = "col centralboxes text-white";
        box4col.className = "col centralboxes text-white";
        box1.className =
          "p-3 centralbox bg-secondary rounded border border-dark border-1";
        box2.className =
          "p-3 centralbox bg-secondary rounded border border-dark border-1";
        box3.className =
          "p-3 centralbox bg-secondary rounded border border-dark border-1";
        box4.className =
          "p-3 centralbox bg-secondary rounded border border-dark border-1";

        box1.style = "height: 25vh";
        box2.style = "height: 25vh";
        box3.style = "height: 25vh";
        box4.style = "height: 25vh";
        //set ids for racerboxes
        box1.id = race["race_code"] + race["type_of_race"] + "box1";
        box2.id = race["race_code"] + race["type_of_race"] + "box2";
        box3.id = race["race_code"] + race["type_of_race"] + "box3";
        box4.id = race["race_code"] + race["type_of_race"] + "box4";
        //define achievements
        achievementbox1.textContent = race["acheivement1"];
        achievementbox2.textContent = race["acheivement2"];
        achievementbox3.textContent = race["acheivement3"];
        achievementbox4.textContent = race["acheivement4"];

        //properly append the achievements
        achievementbox1col.appendChild(achievementbox1);
        achievementbox2col.appendChild(achievementbox2);
        achievementbox3col.appendChild(achievementbox3);
        achievementbox4col.appendChild(achievementbox4);

        //properly build name list containers
        centraldiv.appendChild(achievementbox1col);
        centraldiv.appendChild(achievementbox2col);
        centraldiv.appendChild(achievementbox3col);
        centraldiv.appendChild(achievementbox4col);
        box1col.appendChild(box1);
        box2col.appendChild(box2);
        box3col.appendChild(box3);
        box4col.appendChild(box4);
        centraldiv.appendChild(box1col);
        centraldiv.appendChild(box2col);
        centraldiv.appendChild(box3col);
        centraldiv.appendChild(box4col);

        //bottom divs--------------------------------------------------------------------------------------------------|
        const bottomdiv = document.createElement("div");
        const currentracecodecol = document.createElement("div");
        const prizebox1col = document.createElement("div");
        const prizebox2col = document.createElement("div");
        const prizebox3col = document.createElement("div");
        const prizebox4col = document.createElement("div");
        const prizebox5col = document.createElement("div");
        const prizebox6col = document.createElement("div");
        const currentracecode = document.createElement("div");
        const prizebox1 = document.createElement("div");
        const prizebox2 = document.createElement("div");
        const prizebox3 = document.createElement("div");
        const prizebox4 = document.createElement("div");
        const prizebox5 = document.createElement("div");
        const prizebox6 = document.createElement("div");
        const currentracecodespan = document.createElement("span");
        const prizeboxspan1 = document.createElement("span");
        const prizeboxspan2 = document.createElement("span");
        const prizeboxspan3 = document.createElement("span");
        const prizeboxspan4 = document.createElement("span");
        const prizeboxspan5 = document.createElement("span");
        const prizeboxspan6 = document.createElement("span");
        const prizeboxtextspan1 = document.createElement("span");
        const prizeboxtextspan2 = document.createElement("span");
        const prizeboxtextspan3 = document.createElement("span");
        const prizeboxtextspan4 = document.createElement("span");
        const prizeboxtextspan5 = document.createElement("span");
        const prizeboxtextspan6 = document.createElement("span");
        bottomdiv.className =
          "fixed-bottom justify-content-end row row-cols-2 pt-xl-5 row-cols-lg-auto g-2 g-lg-3 text-center";
        prizebox1col.className = "col-1";
        prizebox2col.className = "col-1";
        prizebox3col.className = "col-1";
        prizebox4col.className = "col-1";
        prizebox5col.className = "col-1";
        prizebox6col.className = "col-1";
        currentracecodecol.className = "col-1";
        // prizebox1col.style = "width: 10vw;";
        // prizebox2col.style = "width: 10vw;";
        // prizebox3col.style = "width: 10vw;";
        // prizebox4col.style = "width: 10vw;";
        // prizebox5col.style = "width: 10vw;";
        // prizebox6col.style = "width: 10vw;";
        prizeboxtextspan1.style = "display: block";
        prizeboxtextspan2.style = "display: block";
        prizeboxtextspan3.style = "display: block";
        prizeboxtextspan4.style = "display: block";
        prizeboxtextspan5.style = "display: block";
        prizeboxtextspan6.style = "display: block";
        currentracecodespan.style = "display: block";
        prizebox1.className =
          race["prize_level_unlock"] >= 1
            ? "p-3  bg-warning text-center rounded border-bottom border-end border-3 border-dark"
            : "p-3  bg-secondary text-center rounded border-bottom border-end border-3 border-dark";
        prizebox2.className =
          race["prize_level_unlock"] >= 2
            ? "p-3  bg-warning text-center rounded border-bottom border-end border-3 border-dark"
            : "p-3  bg-secondary text-center rounded border-bottom border-end border-3 border-dark";
        prizebox3.className =
          race["prize_level_unlock"] >= 3
            ? "p-3  bg-warning text-center rounded border-bottom border-end border-3 border-dark"
            : "p-3  bg-secondary text-center rounded border-bottom border-end border-3 border-dark";
        prizebox4.className =
          race["prize_level_unlock"] >= 4
            ? "p-3  bg-warning text-center rounded border-bottom border-end border-3 border-dark"
            : "p-3  bg-secondary text-center rounded border-bottom border-end border-3 border-dark";
        prizebox5.className =
          race["prize_level_unlock"] >= 5
            ? "p-3  bg-warning text-center rounded border-bottom border-end border-3 border-dark"
            : "p-3  bg-secondary text-center rounded border-bottom border-end border-3 border-dark";
        prizebox6.className =
          race["prize_level_unlock"] >= 6
            ? "p-3  bg-warning text-center rounded border-bottom border-end border-3 border-dark"
            : "p-3  bg-secondary text-center rounded border-bottom border-end border-3 border-dark";
        prizeboxspan1.className = "material-icons md-120";
        prizeboxspan2.className = "material-icons md-120";
        prizeboxspan3.className = "material-icons md-120";
        prizeboxspan4.className = "material-icons md-120";
        prizeboxspan5.className = "material-icons md-120";
        prizeboxspan6.className = "material-icons md-120";
        prizeboxtextspan1.className =
          "fs-7 bg-transparent text-black text-center";
        prizeboxtextspan2.className =
          "fs-7 bg-transparent text-black text-center";
        prizeboxtextspan3.className =
          "fs-7 bg-transparent text-black text-center";
        prizeboxtextspan4.className =
          "fs-7 bg-transparent text-black text-center";
        prizeboxtextspan5.className =
          "fs-7 bg-transparent text-black text-center";
        prizeboxtextspan6.className =
          "fs-7 bg-transparent text-black text-center";
        currentracecodespan.className =
          "fs-1 bg-transparent text-black text-center";
        prizeboxspan1.textContent =
          race["prize_level_unlock"] >= 1 ? "lock_open" : "lock";
        prizeboxspan2.textContent =
          race["prize_level_unlock"] >= 2 ? "lock_open" : "lock";
        prizeboxspan3.textContent =
          race["prize_level_unlock"] >= 3 ? "lock_open" : "lock";
        prizeboxspan4.textContent =
          race["prize_level_unlock"] >= 4 ? "lock_open" : "lock";
        prizeboxspan5.textContent =
          race["prize_level_unlock"] >= 5 ? "lock_open" : "lock";
        prizeboxspan6.textContent =
          race["prize_level_unlock"] >= 6 ? "lock_open" : "lock";
        prizeboxtextspan1.textContent = race["Prize1"];
        prizeboxtextspan2.textContent = race["Prize2"];
        prizeboxtextspan3.textContent = race["Prize3"];
        prizeboxtextspan4.textContent = race["Prize4"];
        prizeboxtextspan5.textContent = race["Prize5"];
        prizeboxtextspan6.textContent = race["Prize6"];
        currentracecodespan.textContent = race["race_code"];
        prizebox1.appendChild(prizeboxspan1);
        prizebox2.appendChild(prizeboxspan2);
        prizebox3.appendChild(prizeboxspan3);
        prizebox4.appendChild(prizeboxspan4);
        prizebox5.appendChild(prizeboxspan5);
        prizebox6.appendChild(prizeboxspan6);
        currentracecode.appendChild(currentracecodespan);
        prizebox1.appendChild(prizeboxtextspan1);
        prizebox2.appendChild(prizeboxtextspan2);
        prizebox3.appendChild(prizeboxtextspan3);
        prizebox4.appendChild(prizeboxtextspan4);
        prizebox5.appendChild(prizeboxtextspan5);
        prizebox6.appendChild(prizeboxtextspan6);
        prizebox1col.appendChild(prizebox1);
        prizebox2col.appendChild(prizebox2);
        prizebox3col.appendChild(prizebox3);
        prizebox4col.appendChild(prizebox4);
        prizebox5col.appendChild(prizebox5);
        prizebox6col.appendChild(prizebox6);
        currentracecodecol.appendChild(currentracecode);
        bottomdiv.appendChild(currentracecodecol);
        bottomdiv.appendChild(prizebox1col);
        bottomdiv.appendChild(prizebox2col);
        bottomdiv.appendChild(prizebox3col);
        bottomdiv.appendChild(prizebox4col);
        bottomdiv.appendChild(prizebox5col);
        bottomdiv.appendChild(prizebox6col);
        //final logic--------------------------------------------------------------------------------------------------|

        topdiv.dataset.count = race.total; // this could be useful in the future

        //add a solid thin black border to the div

        topdiv.classList.add("race-container");
        raceCollection.push(topdiv); // this is where it gets added

        //append the central div to the top div
        topdiv.appendChild(centraldiv);
        topdiv.appendChild(bottomdiv);
        document.getElementById("raceContainer").appendChild(topdiv);
      }
    });

    function findOcc(arr, key) {
      // let arr2 = [];
      arr.forEach((x) => {
        // Checking if there is any object in arr2
        // which contains the key value
        if (
          arr2.some((val) => {
            return val[key] == x[key];
          })
        ) {
          // If yes! then increase the occurrence by 1
          arr2.forEach((k) => {
            if (k[key] === x[key] && x["Approved"] === "Y") {
              if (k["racecode"] != x["racecode"]) {
                let a = {};
                a[key] = x[key];
                a["racecode"] = x["racecode"];
                a["system"] = x["system"];
                a["occurrence"] = 1;
                arr2.push(a);
              } else {
                k["occurrence"]++;
                k["racecode"] = x["racecode"];
                k["system"] = x["system"];
              }
            }
          });
        } else {
          // If not! Then create a new object initialize
          // it with the present iteration key's value and
          // set the occurrence to 1
          if (x["Approved"] === "Y") {
            let a = {};
            a[key] = x[key];
            a["racecode"] = x["racecode"];
            a["system"] = x["system"];
            a["occurrence"] = 1;
            arr2.push(a);
          }
        }
      });
      return arr2;
    }

    let arr = memberResults.data;
    let key = "name";
    findOcc(arr, key);

    //check if name already added to a div
    let z = 0;
    do {
      const div1 = document.createElement("div");
      const div2 = document.createElement("div");
      const div3 = document.createElement("div");
      const div4 = document.createElement("div");
      if (arr2[z].occurrence === 1) {
        div1.textContent += arr2[z]["name"];
        linebreak = document.createElement("br");
        div1.appendChild(linebreak);
      } else if (arr2[z].occurrence === 2) {
        div2.textContent += arr2[z]["name"];
        linebreak = document.createElement("br");
        div2.appendChild(linebreak);
      } else if (arr2[z].occurrence === 3) {
        div3.textContent += arr2[z]["name"];
        linebreak = document.createElement("br");
        div3.appendChild(linebreak);
      } else if (arr2[z].occurrence === 4) {
        div4.textContent += arr2[z]["name"];
        linebreak = document.createElement("br");
        div4.appendChild(linebreak);
      }
      if (document.getElementById(arr2[z].racecode) === null) {
      } else {
        document
          .getElementById(arr2[z].racecode + arr2[z].system + "box1")
          .appendChild(div1);
        document
          .getElementById(arr2[z].racecode + arr2[z].system + "box2")
          .appendChild(div2);
        document
          .getElementById(arr2[z].racecode + arr2[z].system + "box2")
          .appendChild(div3);
        document
          .getElementById(arr2[z].racecode + arr2[z].system + "box3")
          .appendChild(div4);
      }
      z++;
    } while (z < arr2.length);
  }
);
startRaceInterval();
/**
 * Array Key value compare and count.
 *
 * Count the number of times each key appears in the array based on the keyArray.
 *
 * @param {Object[]} objArray The array of object from which you need to compare.
 * @param {String[]} keyArray Keys to count against.
 * @param {string} propName The property name to compare against.
 * @returns {Object[]} The array of object properties with their respective totals.
 */
const countOccurrencesInArray = (objArray, keyArray, propName) => {
  // Get totals in put them into an array
  const totals = keyArray.map((key) => {
    return objArray.reduce((acc, obj) => {
      return obj[propName] === key ? acc + 1 : acc;
    }, 0);
  });

  // match the original property values with the totals and put that into array of objects
  return keyArray.map((key, index) => {
    return { [key]: totals[index] };
  });
};

/**
 * Sort an array based on the value of a single object of a property value.
 * Ensure that higher values are first.
 *
 * @param {Object[]} arr The array of object to sort.
 * @returns {Object[]} The sorted array of object.
 */
const sortArray = (arr) => {
  return arr.sort((a, b) => {
    return Object.values(b)[0] - Object.values(a)[0];
  });
};
