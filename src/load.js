import more from "./assets/icons/more.svg";
import logo from "./assets/icons/Cyclone.png";
import { getCountry, getWeather } from "./api";

const waitingDiv = document.getElementById("waiting");

const icons = importAll(
  require.context("./assets/icons/weather", false, /\.svg$/),
);
const conditionToIcon = {
  Partiallycloudy: "sunnyUnclear",
  Clear: "sunnyClear",
  Rain: "sunnyRain",
  Overcast: "sunnyCloudy",
  Snow: "rain",

  NightPartiallycloudy: "nightUnclear",
  NightClear: "nightClear",
  NightRain: "nightRain",
  NightOvercast: "nightCloudy",
};

export async function loadResult(city) {
  loadLocations();
  city = capitalize(city);
  const unit = checkUnit();
  const weatherData = await getWeather(city);
  //CONSOLE LOG
  console.log(weatherData);
  const mainDiv = document.getElementById("main");
  const country = await getCountry(city);
  const hour = weatherData.current.time.split(":")[0];
  let timeOfDay = "";
  if (hour >= 6 && hour < 9) {
    timeOfDay = "sunrise";
  } else if (hour >= 9 && hour < 18) {
    timeOfDay = "day";
  } else if (hour >= 18 && hour < 21) {
    timeOfDay = "sunset";
  } else {
    timeOfDay = "";
  }
  let saveBtn = ``;
  saveBtn = `<button id="saveBtn">Save City</button>`;
  document.querySelector("body").classList = timeOfDay;
  mainDiv.innerHTML = `
        <div style="display: flex; gap: 5px; margin-top: 5px; margin-bottom: auto;">
          <div id="unitsButtons"><button id="fahrenheit" class="unitBtn">F</button> / <button id="celsius" class="unitBtn">C</button></div>
          ${saveBtn}
        </div>
        <div id="brief">
            <img src="#" id="weather-img">
            <div id="brief-info">
                <div id="name">
                    <h1>${country}</h1>
                    <h2>${city}</h2>
                </div>
                <h2>${getTemp(weatherData.current.temp, unit)}</h2>
            </div>
        </div>
        <div id="details">
            <div class="details-tile">
                <h3>Real Feel</h3>
                <h1>${getTemp(weatherData.current.feel, unit)}</h1>
            </div>
            <div class="details-tile">
                <h3>Humidity</h3>
                <h1>${Math.round(weatherData.current.humidity)}%</h1>
            </div>
            <div class="details-tile">
              <div class="table-wrapper">
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
                      <td>${getTemp(weatherData.forecast.day0.temp, unit)}</td>
                      <td>${getTemp(weatherData.forecast.day1.temp, unit)}</td>
                      <td>${getTemp(weatherData.forecast.day2.temp, unit)}</td>
                      <td>${getTemp(weatherData.forecast.day3.temp, unit)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    `;

  const unitButtons = document.querySelectorAll(".unitBtn");
  for (const button of unitButtons) {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const newPref = { pref: button.id };
      localStorage.setItem("unit", JSON.stringify(newPref));
      loadResult(city);
    });
  }

  if (country.length < 5 || city.length > 15) {
    document.getElementById("name").style.justifyContent = "flex-start";
  }

  if (saveBtn !== ``) {
    const saveBtnEl = document.getElementById("saveBtn");
    const list = JSON.parse(localStorage.getItem("list"));

    // Check if city already exists in list
    const exists = list.locations.some((loc) => loc.city === city);

    if (exists) {
      saveBtnEl.textContent = "Delete City";
      saveBtnEl.addEventListener("click", (e) => {
        e.preventDefault();

        // Remove city from list
        list.locations = list.locations.filter((loc) => loc.city !== city);
        localStorage.setItem("list", JSON.stringify(list));

        saveBtnEl.style.backgroundColor = "var(--danger)";
        setTimeout(() => {
          saveBtnEl.style.display = "none";
        }, 2000);

        loadLocations();
      });
    } else {
      saveBtnEl.textContent = "Save City";
      saveBtnEl.addEventListener("click", (e) => {
        e.preventDefault();

        // Use Set trick for uniqueness
        const locationsSet = new Set(list.locations.map(JSON.stringify));
        locationsSet.add(JSON.stringify({ city, country }));
        list.locations = Array.from(locationsSet).map(JSON.parse);

        localStorage.setItem("list", JSON.stringify(list));

        saveBtnEl.style.backgroundColor = "var(--success)";
        setTimeout(() => {
          saveBtnEl.style.display = "none";
        }, 2000);

        loadLocations();
      });
    }
  }

  loadImages();
  const weatherImg = document.getElementById("weather-img");
  const tableTiles = document.querySelectorAll(".table-img");
  const conditions =
    timeOfDay === "day" || timeOfDay === "sunset"
      ? weatherData.current.conditions.split(",")[0]
      : `Night${weatherData.current.conditions.split(",")[0]}`;
  weatherImg.src = icons[conditionToIcon[conditions]];
  for (let i = 0; i < tableTiles.length; i++) {
    const forecastConditions =
      weatherData.forecast[`day${i}`].conditions.split(",")[0];
    tableTiles[i].src = icons[conditionToIcon[forecastConditions]];
  }
}

export function loadHome() {
  loadLocations();
  document.querySelector("body").classList = "home";
  const mainDiv = document.getElementById("main");
  mainDiv.innerHTML = `
        <img id="home-logo" src="#">
    `;
  loadImages();
  document.getElementById("home-logo").src = logo;
}

export function loadLocations() {
  const unit = checkUnit();
  const savedList = document.getElementById("saved-list");
  savedList.innerHTML = ``; // clear old DOM nodes

  const list = JSON.parse(localStorage.getItem("list"));
  // ensure we always have insertion order preserved
  const locations = Array.from(new Set(list.locations.map(JSON.stringify))).map(
    JSON.parse,
  );

  locations.forEach(async (loc) => {
    const locData = await getWeather(loc.city);

    // create elements safely
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.id = loc.city;
    a.style.display = "flex";
    a.style.justifyContent = "space-between";
    a.style.fontSize = "1.4rem";
    a.innerHTML = `<span>${loc.city}</span><span>${getTemp(
      locData.current.temp,
      unit,
    )}</span>`;

    // attach click listener
    a.addEventListener("click", (e) => {
      e.preventDefault();
      searchCity(loc.city);
    });

    li.appendChild(a);
    savedList.appendChild(li);
  });
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

function checkUnit() {
  if (localStorage.getItem("unit") !== null) {
    const unit = JSON.parse(localStorage.getItem("unit"));
    return unit.pref;
  } else {
    const dialogBox = document.getElementById("dialog");
    const form = document.querySelector("form");

    dialogBox.style.visibility = "visible";
    form.style.display = "flex";

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = { pref: document.querySelector("select").value };
      localStorage.setItem("unit", JSON.stringify(value));
      dialogBox.style.visibility = "hidden";
    });
  }
}

function getTemp(temp, unit) {
  return unit === "fahrenheit"
    ? `${Math.round(temp)}°F`
    : `${Math.round(toCelsius(temp))}°C`;
}

function getFutureDateLabel(daysFromToday) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

export async function searchCity(city) {
  try {
    showWaiting();
    await loadResult(city);
  } catch (err) {
    console.error(err);
  } finally {
    hideWaiting();
  }
}

export function showWaiting() {
  waitingDiv.classList.add("active");
}

export function hideWaiting() {
  waitingDiv.classList.remove("active");
}
