import more from "./assets/icons/more.svg";
import logo from "./assets/icons/logo.svg";
import weatherTemp from "./assets/icons/weather/sunnyCloudy.svg";
import { getCountry, getWeather } from "./api";

export async function loadResult(city) {
  city = capitalize(city);
  const weatherData = await getWeather(city);
  const mainDiv = document.getElementById("main");
  const country = await getCountry(city);
  const hour = weatherData.current.time.split(":")[0];
  const timeOfDay = hour < 6 || hour > 18 ? "" : "day";
  console.log(hour);
  document.getElementById("content").classList = timeOfDay;
  mainDiv.innerHTML = `
        <div id="brief">
            <img src="#" id="weather-img">
            <div id="brief-info">
                <div id="name">
                    <h1>${country}</h1>
                    <h2>${city}</h2>
                </div>
                <h2>${weatherData.current.temp}°F</h2>
            </div>
        </div>
        <div id="details">
            <div class="details-tile">
                <h3 style="font-size: 2rem;">Real Feel</h3>
                <h1 style="font-size: 5rem;">${weatherData.current.feel}°F</h1>
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
                            <td>${Math.round(weatherData.forecast.day1)}°F</td>
                            <td>${Math.round(weatherData.forecast.day2)}°F</td>
                            <td>${Math.round(weatherData.forecast.day3)}°F</td>
                            <td>${Math.round(weatherData.forecast.day4)}°F</td>
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

  weatherImg.src = weatherTemp;

  for (const tile of tableTiles) tile.src = weatherTemp;
}

export function loadHome() {
  const mainDiv = document.getElementById("main");
  mainDiv.innerHTML = `
        <img id="home-logo" src="#">
        <p>This is a pretty weather app mate</p>
    `;
  loadImages();
  document.getElementById("home-logo").src = logo;

  const icons = importAll(
    require.context("./assets/icons/weather", false, /\.svg$/),
  );
  console.log(icons);
}

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

/*function loadWeatherIcon(temp) {
  const icons = importAll(
    require.context("./assets/icons/weather", false, /\.svg$/),
  );
  switch (temp) {
    case "clear":
      return icons.sunny - clear;
    case "rain":
      return icons.rain;
  }
}*/

function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
