import "./css/reset.css";
import "./css/styles.css";
import { loadHome, loadLocations, searchCity, hideWaiting } from "./load";

const searchBar = document.getElementById("searchInput");
const icon = document.getElementById("icon");
const locationsBtn = document.getElementById("locations");

icon.addEventListener("click", (e) => {
  e.preventDefault();
  loadHome();
});

if (localStorage.length === 1) {
  const list = {
    locations: Array.from(new Set()),
  };
  localStorage.setItem("list", JSON.stringify(list));
}

locationsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const saved = document.getElementById("saved");

  saved.style.display = saved.style.display === "none" ? "flex" : "none";
  saved.style.visibility =
    saved.style.visibility === "hidden" ? "visible" : "hidden";
  loadLocations();
});

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const city = searchBar.value;
    if (!city) return;
    console.log("Searching for:", city);
    searchCity(city);
    searchBar.value = "";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  Promise.resolve()
    .then(() => loadHome())
    .finally(() => {
      hideWaiting();
    });
});
