const axios = require("axios");

const options = {
  method: "GET",
  url: "https://www.zara.com/us/en/search?searchTerm=",
  params: {
    keywords: "<REQUIRED>",
    marketplace: "ES",
  },
  headers: {
    "X-RapidAPI-Key": "38dbb3cdfamshd16320890b0e5a5p164cc7jsndf2a3bd2def7",
    "X-RapidAPI-Host": "amazon-price1.p.rapidapi.com",
  },
};

try {
  const response = await axios.request(options);
  console.log(response.data);
} catch (error) {
  console.error(error);
}
