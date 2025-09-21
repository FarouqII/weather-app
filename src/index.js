import "./css/reset.css";
import "./css/styles.css";
import { loadHome, loadResult } from "./load";

const searchBar = document.getElementById("searchInput");
const waitingDiv = document.getElementById("waiting");

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

async function searchCity(city) {
  try {
    showWaiting();
    await loadResult(city);
  } catch (err) {
    console.error(err);
  } finally {
    hideWaiting();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.resolve()
    .then(() => loadHome())
    .finally(() => {
      hideWaiting();
    });
});

function showWaiting() {
  waitingDiv.classList.add("active");
}

function hideWaiting() {
  waitingDiv.classList.remove("active");
}
