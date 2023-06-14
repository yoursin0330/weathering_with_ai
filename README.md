# 오늘 뭐 입지
![image](https://github.com/yoursin0330/weathering_with_ai/assets/103302201/9e7897bd-b543-41e4-8b0f-b7f131f92d8d)

## 1. 목표와 기능

### 1.1 목표

- 날씨에 맞는 옷을 추천해주는 서비스

### 1.2 기능

- 현재 위치의 날씨에 맞게 추천받을 것인지, 원하는 날씨를 설정할 것인지 선택 가능
- 날씨를 직접 설정할 경우 상세한 조건 설정 가능
- chatGPT를 이용하여 제시된 날씨에 맞게 의상 추천

## 2. 개발 환경 및 배포 URL

### 2.1 개발 환경

- HTML & CSS
- Vanilla JavaScript
- 서비스 배포 환경 : GitHub

### 2.2 배포 URL

- https://yoursin0330.github.io/weathering_with_ai/

## 3. 프로젝트 구조와 개발 기간

### 3.1 프로젝트 구조

```
│  .gitattributes
│  choose_weather.html
│  clothes_recommend.html
│  current_weather.html
│  index.html
│  README.md
│
├─css
│  │  reset.css
│  │  styles.css
│  │
│  ├─components
│  │      alert.css
│  │      chat-bubble.css
│  │      footer.css
│  │      header.css
│  │      waiting.css
│  │      weather-form.css
│  │
│  └─screens
│          current_weather-screen.css
│          main-screen.css
│
├─img
│      sun.png
│
└─js
    │  chatGPT.js
    │
    └─weather
            chosen_weather.js
            current_loca_weather.js
            print_chosen_weather.js
```

### 3.2 개발 기간

- 2023/05/30 ~ 2023/06/13
