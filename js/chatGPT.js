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
  sessionStorage.setItem("closet", JSON.stringify(closet));
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
const getWeather = () => {
  const nowWeather = JSON.parse(localStorage.getItem("nowWeather"));
  const askClothes = `현재 날씨는 섭씨 ${nowWeather.temp}도 에 날씨는 ${nowWeather.weatherName}야. 이런 날씨에는 뭘 입으면 좋을 지 한국어로 알려줘.${nowWeather.moreWeatherInfo} 추가 설명 없이 딱 아이템만 알려줘. 카테고리에 따라 번호를 매기고, 아이템끼리는 엔터로 구분해줘. `;
  sendQuestion(askClothes);
  apiPost();
};
getWeather();
