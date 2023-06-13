const API_KEY = "9c50a548a1a56ed524f605a3ec0f1553";

function storeWeather(temp, weatherCondition) {
  const nowWeather = {
    temp: temp,
    weatherName: weatherCondition,
    moreWeatherInfo: "",
  };
  localStorage.setItem("nowWeather", JSON.stringify(nowWeather));
}

async function getWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(weather_url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather-condition");
      const temp = document.querySelector("#weather-temp span");
      const city = document.querySelector("#city");
      const weatherIcon = document.querySelector("#weather-icon");

      const tempData = Math.floor(data.main.temp);
      const weatherData = data.weather[0].main;

      storeWeather(tempData, weatherData);

      temp.innerText = `${tempData}`;
      weather.innerText = `${weatherData}`;
      city.innerText = data.name;
      document.querySelector("#weather-icon__box span").classList.add("hidden");
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
    });
}

//주소를 받아오는 것에 실패했을 때
function onGeoError() {
  //when geolocation was unsuccessful
  alert("Can't find your location 😢");
  localStorage.setItem("nowWeather", null);
}

navigator.geolocation.getCurrentPosition(getWeather, onGeoError);
