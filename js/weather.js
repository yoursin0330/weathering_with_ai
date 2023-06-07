const API_KEY = "9c50a548a1a56ed524f605a3ec0f1553";

//chatGPT openAI API
let ai_url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question;

// 질문과 답변 저장
let data = [
  {
    role: "system",
    content: `이런 날씨에는 어떤 옷을 입으면 좋을 지 알려줘. 상의, 하의, 신발을 각 3개의 아이템씩 알려줬으면 좋겠어. 형식은 아래와 같이 해서 알려줘.
      상의:
      1. 
      2. 
      3.

      하의:
      1. 
      2. 
      3.
      
      신발:
      1. 
      2. 
      3. `,
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
//이미지와 이름을 화면에 출력하는 역할
const printCloset = (closet) => {
  for (let i = 0; i < 9; i++) {
    document.querySelector(`#clothes_item-${i + 1} span`).innerText = `${
      closet[Math.floor(i / 3)][i % 3].text
    }`;
    document.querySelector(`#clothes_item-${i + 1} img`).src =
      closet[Math.floor(i / 3)][i % 3].img;
  }
};
function googleLoadClient() {
  gapi.client.setApiKey("AIzaSyCRwq4vRc5vfUNzlT7_-z0-bKYUv1MYj00");
  return gapi.client
    .load(
      "https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest"
    )
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}
// Make sure the client is loaded before calling this method.
function executeImgSearch(searchName) {
  return gapi.client.search.cse
    .list({
      imgColorType: "color",
      imgSize: "MEDIUM",
      imgType: "photo",
      num: 1,
      q: searchName,
      safe: "active",
      searchType: "image",
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
        console.log(response.result);
        return "성공";
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

// const googleApiSearchImg = (searchName) => {
//   //https://developers.google.com/custom-search/v1/
//   let img_url = "";
//   $.ajax({
//     type: "GET",

//     url: "https://customsearch.googleapis.com/customsearch/v1",

//     headers: {},

//     data: {
//       q: searchName,

//       display: 1, //한 번에 표시할 검색 결과 개수(기본값: 10, 최댓값: 100)
//       sort: "sim", //정확도순으로 내림차순 정렬
//     },
//     async: false,
//     success: function (jdata) {
//       console.log(jdata);
//       img_url = jdata.channel.item[0].image;
//     },

//     error: function (xhr, textStatus) {
//       console.log(xhr.responseText);
//       console.log("에러");
//     },
//   });
//   return img_url;
// };

const fillClosetImg = (closet) => {
  gapi.load("client");
  googleLoadClient();
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // closet[i][j].img = executeImgSearch(closet[i][j].text);
      executeImgSearch(closet[i][j].text);
    }
  }
  // printCloset(closet);
};
// chatGPT의 답변을 옷 단위로 끊어서 저장
const answerToKeywords = (answer) => {
  let closet = [];
  const paragraph = answer.split("\n");
  //Tops
  let Tops = [
    {
      text: paragraph[1],
      img: "",
    },
    {
      text: paragraph[2],
      img: "",
    },
    {
      text: paragraph[3],
      img: "",
    },
  ];
  closet.push(Tops);
  //Bottoms
  let Bottoms = [
    {
      text: paragraph[6],
      img: "",
    },
    {
      text: paragraph[7],
      img: "",
    },
    {
      text: paragraph[8],
      img: "",
    },
  ];

  closet.push(Bottoms);
  //Footwear
  let Footwears = [
    {
      text: paragraph[11],
      img: "",
    },
    {
      text: paragraph[12],
      img: "",
    },
    {
      text: paragraph[13],
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
        `현재 여기 날씨는 섭씨 ${tempData}도 에 날씨는 ${weatherData}야. 이런 날씨에는 뭘 입으면 좋을 지 한국어로 알려줘. 추가 설명 없이 딱 아이템만 알려줘. 카테고리에 따라 번호를 매기고, 아이템끼리는 엔터로 구분해줘. `
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
