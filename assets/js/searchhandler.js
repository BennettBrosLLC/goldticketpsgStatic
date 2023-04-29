document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  });

  function handleSearch(event) {
      event.preventDefault();
      const searchTerm = searchInput.value.toLowerCase();
      let found = false;

      // loop through all elements with ids that start with "MTG" or "VAN"
      const elements = document.querySelectorAll('[id^="MTG"],[id^="YGO"],[id^="BDG"],[id^="WRH"],[id^="DND"],[id^="VAN"],[id^="PFR"],[id^="TKM"],[id^="FAB"]');
      for (let i = 0; i < elements.length; i++) {
          const element = elements[i];
          const text = element.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
              // scroll to the element and highlight it
              element.style.backgroundColor = "yellow";
              element.scrollIntoView({ behavior: "smooth" });
              found = true;
          } else {
              element.style.backgroundColor = "white";
          }
      }

      if (!found) {
          alert("No results found.");
      }
  }
});