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

Promise.all([getSettingJSON(), getObjJSON()]).then(
  ([raceResults, memberResults]) => {
    /*console.log("Race Results", raceResults.data);*/ // debug point
    console.log("MemberResults", memberResults.data); // debug point
    // add a "total" property to each race in the activeRaces array
    raceResults = raceResults.data.map((race) => ({ ...race, total: 0 }));
    memberResults.data.forEach((member) => {
      const i = raceResults.findIndex(
        (race) => race["race_code"] === member.racecode
      );
      console.log(i);
      raceResults[i].total++;
    });
    raceResults = raceResults.sort((a, b) => b.total - a.total);
    console.log("active races", raceResults); // debug point

    raceResults.forEach((race) => {
      if (
        race.total > 0 ||
        race.active === "Y" ||
        race["name_of_race"] !== ""
      ) {
        const div = document.createElement("div");
        const title = document.createElement("h2");
        const memberContainer = document.createElement("div");
        title.textContent = race["name_of_race"];
        div.id = race["race_code"];
        div.appendChild(title);
        div.appendChild(memberContainer);
        div.dataset.count = "0"; // this could be useful in the future
        //add a solid thin black border to the div
        div.style.border = "1px solid black";
        div.style.margin = "10px 0";
        div.style.padding = "10px";
        document.getElementById("raceContainer").appendChild(div);
      }
    });

    memberResults.data.forEach((member) => {
      const div = document.createElement("div");
      const name = document.createElement("p");
      name.textContent = member["name"];
      div.appendChild(name);
      document.getElementById(member.racecode).appendChild(div);
    });
  }
);

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
