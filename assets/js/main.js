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

const getObjData = async () => {
  const response = await fetch(
    "https://docs.google.com/spreadsheets/d/1YC4vzjepcRs5wcna0ZZFEPCcWJHKru-iZzKY3uWwuE4/pub?output=csv"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.blob();
};

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
      if (
        race.total > 0 &&
        race.active === "Y" &&
        race["name_of_race"] !== ""
      ) {
        //define useable elements for top divs--------------------------------------------------------------------------------------------------|

        const topdiv = document.createElement("div");
        const topofracediv = document.createElement("div");
        const topofraceimgdiv = document.createElement("div");
        const topofracetitlediv = document.createElement("div");
        const outtertitle = document.createElement("h1");
        const descriptor = document.createElement("h3");
        const innertitle = document.createElement("strong");
        const acheivement1 = document.createElement("h3");
        const acheivement2 = document.createElement("h3");
        const acheivement3 = document.createElement("h3");
        const acheivement4 = document.createElement("h3");
        const topper = document.createElement("img");

        //top divs--------------------------------------------------------------------------------------------------|

        topdiv.className =
          "position-absolute p-5 top-50 start-50 translate-middle background-controller";
        topdiv.classList.add(
          FirstIndex.name_of_race === race["name_of_race"]
            ? "ourshow"
            : "ourhidden"
        );
        topofracediv.className = "row border-bottom border-5 border-dark p-3";
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
        achievementbox1.className = "p-3  bg-dark text-white";
        achievementbox2.className = "p-3  bg-dark text-white";
        achievementbox3.className = "p-3  bg-dark text-white";
        achievementbox4.className = "p-3  bg-dark text-white";
        //racerboxes-----------------------------------------------------------------------------------|
        box1col.className = "col";
        box2col.className = "col";
        box3col.className = "col";
        box4col.className = "col";
        box1.className = "p-3  bg-secondary";
        box2.className = "p-3  bg-secondary";
        box3.className = "p-3  bg-secondary";
        box4.className = "p-3  bg-secondary";
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
        achievementbox1.appendChild(acheivement1);
        achievementbox2.appendChild(acheivement1);
        achievementbox3.appendChild(acheivement1);
        achievementbox4.appendChild(acheivement1);
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
        const prizebox1col = document.createElement("div");
        const prizebox2col = document.createElement("div");
        const prizebox3col = document.createElement("div");
        const prizebox4col = document.createElement("div");
        const prizebox1 = document.createElement("div");
        const prizebox2 = document.createElement("div");
        const prizebox3 = document.createElement("div");
        const prizebox4 = document.createElement("div");
        const prizeboxspan1 = document.createElement("span");
        const prizeboxspan2 = document.createElement("span");
        const prizeboxspan3 = document.createElement("span");
        const prizeboxspan4 = document.createElement("span");
        bottomdiv.className =
          "fixed-bottom justify-content-end p-3 row row-cols-2 pt-xl-5 row-cols-lg-4 g-2 g-lg-3";
        prizebox1col.className = "col";
        prizebox2col.className = "col";
        prizebox3col.className = "col";
        prizebox4col.className = "col";
        prizebox1col.style = "width: 180px;";
        prizebox2col.style = "width: 180px;";
        prizebox3col.style = "width: 180px;";
        prizebox4col.style = "width: 180px;";
        prizebox1.className = "p-3  bg-secondary";
        prizebox2.className = "p-3  bg-secondary";
        prizebox3.className = "p-3  bg-secondary";
        prizebox4.className = "p-3  bg-secondary";
        prizeboxspan1.className = "material-icons md-120";
        prizeboxspan2.className = "material-icons md-120";
        prizeboxspan3.className = "material-icons md-120";
        prizeboxspan4.className = "material-icons md-120";
        prizeboxspan1.textContent =
          race["Prize1"] === "Y" ? "lock_open" : "lock";
        prizeboxspan2.textContent =
          race["Prize2"] === "Y" ? "lock_open" : "lock";
        prizeboxspan3.textContent =
          race["Prize3"] === "Y" ? "lock_open" : "lock";
        prizeboxspan4.textContent =
          race["Prize4"] === "Y" ? "lock_open" : "lock";
        prizebox1.appendChild(prizeboxspan1);
        prizebox2.appendChild(prizeboxspan2);
        prizebox3.appendChild(prizeboxspan3);
        prizebox4.appendChild(prizeboxspan4);
        prizebox1col.appendChild(prizebox1);
        prizebox2col.appendChild(prizebox2);
        prizebox3col.appendChild(prizebox3);
        prizebox4col.appendChild(prizebox4);
        bottomdiv.appendChild(prizebox1col);
        bottomdiv.appendChild(prizebox2col);
        bottomdiv.appendChild(prizebox3col);
        bottomdiv.appendChild(prizebox4col);

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
      } else if (arr2[z].occurrence === 2) {
        div2.textContent += arr2[z]["name"];
      } else if (arr2[z].occurrence === 3) {
        div3.textContent += arr2[z]["name"];
      } else if (arr2[z].occurrence === 4) {
        div4.textContent += arr2[z]["name"];
      }
      linebreak = document.createElement("br");
      div1.appendChild(linebreak);
      linebreak = document.createElement("br");
      div2.appendChild(linebreak);
      linebreak = document.createElement("br");
      div3.appendChild(linebreak);
      linebreak = document.createElement("br");
      div4.appendChild(linebreak);
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
