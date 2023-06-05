const API_KEY = "9c50a548a1a56ed524f605a3ec0f1553";

//chatGPT openAI API
let ai_url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

//kakao 이미지 검색 API
const search_url = "https://dapi.kakao.com/v2/search/image";

// 사용자의 질문
let question;

// 질문과 답변 저장
let data = [
  {
    role: "system",
    content:
      "Tell me what to wear in this weather. Tell me only the items. I want 3 items each, for tops, bottoms, and footwear",
  },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData;

// 사용자의 질문을 객체를 만들어서 push
const sendQuestion = (question) => {
  if (question) {
    data.push({
      role: "user",
      content: question,
    });
    questionData = {
      role: "user",
      content: question,
    };
  }
};
// 여기부터 이미지 검색---------
const printCloset = (closet) => {
  for (let i = 0; i < 9; i++) {
    document.querySelector(`#clothes_item-${i + 1} span`).innerText = `${
      closet[Math.floor(i / 3)][i % 3].text
    }`;
    document.querySelector(`#clothes_item-${i + 1} img`).src =
      closet[Math.floor(i / 3)][i % 3].img;
  }
};
const kakaoApiGetImg = (searchName) => {
  //https://developers.kakao.com/tool/rest-api/open/get/v2-search-image
  let img_url = "";
  $.ajax({
    type: "GET",

    url: "https://dapi.kakao.com/v2/search/image",

    headers: {
      Authorization: "KakaoAK 165585191c1a927d27cbfcbaeb891ce6",
    },

    data: {
      query: searchName,

      sort: "accuracy", //accuracy(정확도순) 또는 recency(최신순)

      page: 1, //결과 페이지 번호, 1~50 사이의 값, 기본 값 1

      size: 1, //한 페이지에 보여질 문서 수, 1~80 사이의 값, 기본 값 80
    },
    async: false,
    success: function (jdata) {
      img_url = jdata.documents[0].image_url;
    },

    error: function (xhr, textStatus) {
      console.log(xhr.responseText);
      console.log("에러");
    },
  });
  return img_url;
};

const fillClosetImg = (closet) => {
  //https://developers.kakao.com/tool/rest-api/open/get/v2-search-image
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      closet[i][j].img = kakaoApiGetImg(closet[i][j].text);
    }
  }
  printCloset(closet);
};
// chatGPT의 답변을 옷 단위로 끊어서 저장
const answerToKeywords = (answer) => {
  let closet = [];
  const paragraph = answer.split("\n");
  //Tops
  let Tops = [
    {
      text: paragraph[3],
      img: "",
    },
    {
      text: paragraph[4],
      img: "",
    },
    {
      text: paragraph[5],
      img: "",
    },
  ];
  closet.push(Tops);
  //Bottoms
  let Bottoms = [
    {
      text: paragraph[8],
      img: "",
    },
    {
      text: paragraph[9],
      img: "",
    },
    {
      text: paragraph[10],
      img: "",
    },
  ];

  closet.push(Bottoms);
  //Footwear
  let Footwears = [
    {
      text: paragraph[13],
      img: "",
    },
    {
      text: paragraph[14],
      img: "",
    },
    {
      text: paragraph[15],
      img: "",
    },
  ];
  closet.push(Footwears);

  fillClosetImg(closet);
};

// 화면에 chatGPT의 답변 그려주는 함수
const printAnswer = (answer) => {
  const clothesInfo = document.querySelector("#weather-more");
  clothesInfo.classList.add("question");
  clothesInfo.innerText = answer;
  answerToKeywords(answer);
};

// chatGPT api 요청보내는 함수
const apiPost = async () => {
  const result = await fetch(ai_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    redirect: "follow",
  })
    .then((res) => res.json())
    .then((res) => {
      printAnswer(res.choices[0].message.content);
    })
    .catch((err) => {
      console.log(err);
    });
};

//여기부터 날씨 받아오기----------------------

function getWeather(position) {
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
      temp.innerText = `${tempData}`;
      weather.innerText = `${weatherData}`;
      city.innerText = data.name;
      weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
      );
      //gpt에게 날씨 정보 넘기기
      sendQuestion(
        `Weather here is now ${tempData} celcius and ${weatherData}. Tell me what to wear in this weather, just items.`
      );
      apiPost();
    });
}

//주소를 받아오는 것에 실패했을 때
function onGeoError() {
  //when geolocation was unsuccessful
  alert("Can't find your location ;(");
}
navigator.geolocation.getCurrentPosition(getWeather, onGeoError);
