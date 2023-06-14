// 메인 페이지의 버튼
const chooseWeatherBtn = document.querySelector("#choose_weather-btn");
const currentWeatherBtn = document.querySelector("#current_weather-btn");

chooseWeatherBtn.addEventListener("click", function () {
  location.href = "./choose_weather.html";
});
currentWeatherBtn.addEventListener("click", function () {
  location.href = "./current_weather.html";
});
