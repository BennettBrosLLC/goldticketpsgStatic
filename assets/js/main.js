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

    raceResults = raceResults.sort((a, b) => b.total - a.total);
    raceResults.forEach((race, index) => {
      if (
        race.total > 0 &&
        race.active === "Y" &&
        race["name_of_race"] !== ""
      ) {
        const div = document.createElement("div");
        div.className =
          "position-absolute p-5 top-50 start-50 translate-middle background-controller";
        div.classList.add(index === 0 ? "ourshow" : "ourhidden");
        const title = document.createElement("h2");
        const acheivement1 = document.createElement("h3");
        const memberContainer = document.createElement("div");
        const topper = document.createElement("img");
        //need to put topper in a div with classes "row border-bottom border-5 border-dark p-3" that contains another div with classes div class="col justify-content-start"
        //accompany the topper in the first inner div with the title and the following text: Earn a Golden Ticket by winning one of these races.
        topper.className = "boardtopper";
        if (race["type_of_race"] === "mtg") {
          topper.src = "assets/images/mtg.webp";
        } else if (race["type_of_race"] === "ygoh") {
          topper.src = "assets/images/ygoh.webp";
        } else if (race["type_of_race"] === "boardgames") {
          topper.src = "assets/images/boardgames.webp";
        } else if (race["type_of_race"] === "warhammer") {
          topper.src = "assets/images/warhammer.webp";
        } else if (race["type_of_race"] === "dungeonsanddragons") {
          topper.src = "assets/images/dungeonsanddragons.webp";
        } else if (race["type_of_race"] === "vanguard") {
          topper.src = "assets/images/vanguard.webp";
        } else if (race["type_of_race"] === "pathfinder") {
          topper.src = "assets/images/pathfinder.webp";
        }
        div.appendChild(topper);
        title.textContent = race["name_of_race"];
        div.id = race["race_code"];
        acheivement1.textContent = race["acheivement1"];
        div.appendChild(title);
        div.appendChild(acheivement1);
        div.appendChild(memberContainer);
        div.dataset.count = race.total; // this could be useful in the future
        //add a solid thin black border to the div
        div.classList.add("race-container");
        raceCollection.push(div); // this is where it gets added
        document.getElementById("raceContainer").appendChild(div);
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
              k["occurrence"]++;
            }
          });
        } else {
          // If not! Then create a new object initialize
          // it with the present iteration key's value and
          // set the occurrence to 1
          if (x["Approved"] === "Y") {
            let a = {};
            a[key] = x[key];
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
    let namealreadyadded = [];

    memberResults.data.forEach((member) => {
      //add rows and column here to force the names to go into lines respectively
      for (let i = 0; i < arr2.length; i++) {
        if (
          member.name === arr2[i].name &&
          !namealreadyadded.includes(member.name)
        ) {
          if (arr2[i].occurrence === 1) {
            const div = document.createElement("div");
            const name = document.createElement("p");
            namealreadyadded.push(member.name);
            name.textContent = member["name"];
            div.appendChild(name);
            document.getElementById(member.racecode).appendChild(div);
          } else if (arr2[i].occurrence === 2) {
            const div = document.createElement("div");
            const name = document.createElement("p");
            namealreadyadded.push(member.name);
            name.textContent = member["name"];
            div.appendChild(name);
            document.getElementById(member.racecode).appendChild(div);
          } else if (arr2[i].occurrence === 3) {
            const div = document.createElement("div");
            const name = document.createElement("p");
            namealreadyadded.push(member.name);
            name.textContent = member["name"];
            div.appendChild(name);
            document.getElementById(member.racecode).appendChild(div);
          } else if (arr2[i].occurrence === 4) {
            const div = document.createElement("div");
            const name = document.createElement("p");
            namealreadyadded.push(member.name);
            name.textContent = member["name"];
            div.appendChild(name);
            document.getElementById(member.racecode).appendChild(div);
          }
        }
      }
      //add data to specified columns here
    });
    // raceResults.forEach((race, index) => {
    //   if (
    //     race.total > 0 &&
    //     race.active === "Y" &&
    //     race["name_of_race"] !== ""
    //   ) {
    //     const div = document.createElement("div");
    //     div.className =
    //       "position-absolute p-5 top-50 start-50 translate-middle background-controller";
    //     div.classList.add(index === 0 ? "ourshow" : "ourhidden");
    //     const title = document.createElement("h2");
    //     const memberContainer = document.createElement("div");
    //     title.textContent = race["name_of_race"];
    //     div.id = race["race_code"];
    //     div.appendChild(title);
    //     div.appendChild(memberContainer);
    //     div.dataset.count = race.total; // this could be useful in the future
    //     //add a solid thin black border to the div
    //     div.classList.add("race-container");
    //     raceCollection.push(div); // this is where it gets added
    //     document.getElementById("raceContainer").appendChild(div);
    //   }
    // });
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
