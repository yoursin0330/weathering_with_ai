function printWeather() {
  const nowWeather = JSON.parse(localStorage.getItem("nowWeather"));
  const weatherTemp = document.querySelector("#weather-info__temp span");
  const weatherCondition = document.querySelector("#weather-condition");
  const weatherIcon = document.querySelector("#weather-icon");
  weatherTemp.innerText = nowWeather.temp;
  weatherCondition.innerText = nowWeather.weatherName;
}
printWeather();
