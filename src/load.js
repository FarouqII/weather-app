import more from "./assets/icons/more.svg";
import logo from "./assets/icons/logo.svg";
import { getCountry, getWeather } from "./api";

const icons = importAll(
  require.context("./assets/icons/weather", false, /\.svg$/),
);

const conditionToIcon = {
  Partiallycloudy: "sunnyUnclear",
  Clear: "sunnyClear",
  Rain: "sunnyRain",
  Overcast: "sunnyCloudy",

  NightPartiallycloudy: "nightUnclear",
  NightClear: "nightClear",
  NightRain: "nightRain",
  NightOvercast: "nightCloudy",
};

export async function loadResult(city) {
  city = capitalize(city);
  const weatherData = await getWeather(city);
  const mainDiv = document.getElementById("main");
  const country = await getCountry(city);
  const hour = weatherData.current.time.split(":")[0];
  const timeOfDay = hour < 6 || hour > 18 ? "" : "day";
  document.getElementById("content").classList = timeOfDay;
  mainDiv.innerHTML = `
        <div id="brief">
            <img src="#" id="weather-img">
            <div id="brief-info">
                <div id="name">
                    <h1>${country}</h1>
                    <h2>${city}</h2>
                </div>
                <h2>${Math.round(weatherData.current.temp)}°F</h2>
            </div>
        </div>
        <div id="details">
            <div class="details-tile">
                <h3 style="font-size: 2rem;">Real Feel</h3>
                <h1 style="font-size: 5rem;">${Math.round(weatherData.current.feel)}°F</h1>
            </div>
            <div class="details-tile">
                <h3 style="font-size: 2rem;">Humidity</h3>
                <h1 style="font-size: 5rem;">${Math.round(weatherData.current.humidity)}%</h1>
            </div>
            <div class="details-tile">
                <table>
                    <tbody>
                        <tr>
                            <th>Tomorrow</th>
                            <th>${getFutureDateLabel(2)}</th>
                            <th>${getFutureDateLabel(3)}</th>
                            <th>${getFutureDateLabel(4)}</th>
                        </tr>
                        <tr>
                            <td><img class="table-img" src="#"></td>
                            <td><img class="table-img" src="#"></td>
                            <td><img class="table-img" src="#"></td>
                            <td><img class="table-img" src="#"></td>
                        </tr>
                        <tr>
                            <td>${Math.round(weatherData.forecast.day0.temp)}°F</td>
                            <td>${Math.round(weatherData.forecast.day1.temp)}°F</td>
                            <td>${Math.round(weatherData.forecast.day2.temp)}°F</td>
                            <td>${Math.round(weatherData.forecast.day3.temp)}°F</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

  function getFutureDateLabel(daysFromToday) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromToday);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  loadImages();
  const weatherImg = document.getElementById("weather-img");
  const tableTiles = document.querySelectorAll(".table-img");
  const conditions =
    timeOfDay === "day"
      ? weatherData.current.conditions.split(",")[0]
      : `Night${weatherData.current.conditions.split(",")[0]}`;
  console.log(conditions);
  weatherImg.src = icons[conditionToIcon[conditions]];
  for (let i = 0; i < tableTiles.length; i++) {
    const forecastConditions =
      weatherData.forecast[`day${i}`].conditions.split(",")[0];
    tableTiles[i].src = icons[conditionToIcon[forecastConditions]];
  }
}

export function loadHome() {
  document.getElementById("content").classList = "day";
  const mainDiv = document.getElementById("main");
  mainDiv.innerHTML = `
        <img id="home-logo" src="#">
        <p>This is a pretty weather app mate</p>
    `;
  loadImages();
  document.getElementById("home-logo").src = logo;
}

// ----------------------------------------------------------------------

function loadImages() {
  const moreBtn = document.getElementById("more");
  const logoBtn = document.getElementById("logo");

  moreBtn.src = more;
  logoBtn.src = logo;
}

function importAll(r) {
  let icons = {};
  r.keys().forEach((key) => {
    const name = key.replace("./", "").replace(".svg", "");
    icons[name] = r(key);
  });
  return icons;
}

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
