//kakao 이미지 검색 API
const search_url = "https://dapi.kakao.com/v2/search/image";

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

export const fillClosetImg = () => {
  //https://developers.kakao.com/tool/rest-api/open/get/v2-search-image
  const closet = JSON.parse(sessionStorage.getItem("closet"));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      closet[i][j].img = kakaoApiGetImg(closet[i][j].text);
    }
  }
  printCloset(closet);
};
