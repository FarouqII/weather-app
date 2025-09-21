export async function getWeather(city) {
  const keyWeather = "5MRJ4EEB79MXA7S7RNMQABFME";
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${keyWeather}`,
  );
  const weatherData = await response.json();
  console.log(weatherData);
  return {
    current: {
      temp: weatherData.days[0].temp,
      feel: weatherData.days[0].feelslike,
      humidity: weatherData.days[0].humidity,
      conditions: weatherData.currentConditions.conditions.split(", ")[0],
      time: weatherData.currentConditions.datetime,
    },
    forecast: {
      day1: weatherData.days[1].temp,
      day2: weatherData.days[2].temp,
      day3: weatherData.days[3].temp,
      day4: weatherData.days[4].temp,
    },
  };
}

export async function getCountry(city) {
  const keyMap = "pk.c06ce897705203c98dfae0362dfdab7a";
  const response = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=${keyMap}&q=${city}&format=json`,
  );
  const countryData = await response.json();
  const displayName = countryData[0].display_name;
  const nameArr = displayName.split(", ");
  return nameArr[nameArr.length - 1];
}
