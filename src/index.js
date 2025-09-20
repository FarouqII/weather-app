import { getWeather } from "./api";
import "./css/reset.css";
import "./css/styles.css";
import { loadResult } from "./loadResult";

document.addEventListener("DOMContentLoaded", loadResult());
console.log(await getWeather());
