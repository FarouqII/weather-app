import "./css/reset.css";
import "./css/styles.css";
import { loadResult } from "./loadResult";

const searchBar = document.getElementById("searchInput");
const waitingDiv = document.getElementById("waiting");

searchBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const city = searchBar.value;
    if (!city) return;
    console.log("Searching for:", city);
    searchCity(city);
  }
});

async function searchCity(city) {
  try {
    waitingDiv.style.display = "flex"; // show waiting screen
    await loadResult(city); // wait for loadResult to finish
  } catch (err) {
    console.error(err); // handle any errors
  } finally {
    waitingDiv.style.display = "none"; // always hide waiting screen
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadResult("Berlin").finally(() => {
    waitingDiv.style.display = "none";
  });
});
