// 화면에 날씨 표시
function printWeather() {
  const nowWeather = JSON.parse(localStorage.getItem("nowWeather"));
  const weatherTemp = document.querySelector("#weather-temp span");
  const weatherCondition = document.querySelector("#weather-condition");
  weatherTemp.innerText = nowWeather.temp;
  weatherCondition.innerText = nowWeather.weatherName;
}
printWeather();
