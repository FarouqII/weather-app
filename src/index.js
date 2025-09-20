import "./css/reset.css";
import "./css/styles.css";
import more from "./assets/icons/more.svg";
import logo from "./assets/icons/logo.svg";
import weatherTemp from "./assets/icons/weather/sunny-cloudy.svg";

const moreBtn = document.getElementById("more");
const logoBtn = document.getElementById("logo");
const weatherImg = document.getElementById("weather-img");
const tableTiles = document.querySelectorAll(".table-img");

moreBtn.src = more;
logoBtn.src = logo;
weatherImg.src = weatherTemp;

for (const tile of tableTiles) tile.src = weatherTemp;
