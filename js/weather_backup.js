const API_KEY = "9c50a548a1a56ed524f605a3ec0f1553";

function getWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector("#weather-condition");
      const temp = document.querySelector("#weather-temp span");
      const city = document.querySelector("#city");
      const weatherIcon = document.querySelector("#weather-icon");
      temp.innerText = `${Math.floor(data.main.temp)}`;
      weather.innerText = `${data.weather[0].main}`;
      city.innerText = data.name;
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      //   console.log(data);
    });
}
function onGeoError() {
  //when geolocation was unsuccessful
  alert("Can't find your location ;(");
}
navigator.geolocation.getCurrentPosition(getWeather, onGeoError);
