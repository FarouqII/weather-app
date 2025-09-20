export async function getWeather() {
  const key = "5MRJ4EEB79MXA7S7RNMQABFME";
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/jeddah?key=${key}`,
  );
  const weatherData = await response.json();
  const data = {
    current: {
      temp: weatherData.days[0].temp,
      feel: weatherData.days[0].feelslike,
      humidity: weatherData.days[0].humidity,
    },
    forecast: {
      day1: weatherData.days[1].temp,
      day2: weatherData.days[2].temp,
      day3: weatherData.days[3].temp,
      day4: weatherData.days[4].temp,
    },
  };
  return data;
}
