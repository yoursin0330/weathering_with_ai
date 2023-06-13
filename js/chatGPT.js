//chatGPT openAI API
const ai_url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

// 사용자의 질문
let question;

// 질문과 답변 저장
const data = [
  {
    role: "system",
    content: `이런 날씨에는 어떤 옷을 입으면 좋을 지 알려줘.`,
  },
];

// 화면에 뿌려줄 데이터, 질문들
let questionData;

const waitingDots = document.querySelector(".waiting");
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
// 화면에 chatGPT의 답변 그려주는 함수
const printAnswer = (answer) => {
  const clothesInfo = document.querySelector("#weather-more");
  clothesInfo.classList.add("question");
  clothesInfo.innerText = answer;
  waitingDots.classList.add("hidden");
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
const getWeatherInfo = async () => {
  const nowWeather = JSON.parse(localStorage.getItem("nowWeather"));
  const askClothes = `현재 날씨는 섭씨 ${nowWeather.temp}도 에 날씨는 ${nowWeather.weatherName}야. 이런 날씨에는 뭘 입으면 좋을 지 한국어로 알려줘.${nowWeather.moreWeatherInfo}`;
  sendQuestion(askClothes);
  await apiPost();
};
getWeatherInfo();
