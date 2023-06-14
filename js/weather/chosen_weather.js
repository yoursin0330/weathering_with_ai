// 선택한 날씨 저장
const weatherForm = document.querySelector("#weather-form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const temp = weatherForm.querySelector("#weather-form__temp");
  const weatherName = weatherForm.querySelector('input[name="weather"]:checked');
  const moreInfo = weatherForm.querySelector("#weather-form__info");
  const nowWeather = {
    temp: temp.value,
    weatherName: weatherName.value,
    moreWeatherInfo: moreInfo.value,
  };
  localStorage.setItem("nowWeather", JSON.stringify(nowWeather));
  location.href = "clothes_recommend.html";
});
