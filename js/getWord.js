import error from "./error.js";

const options = {
  method: "GET",
  url: "https://random-words5.p.rapidapi.com/getRandom",
  params: { wordLength: "5" },
  headers: {
    "x-rapidapi-host": "random-words5.p.rapidapi.com",
    "x-rapidapi-key": "",
  },
};

// const errorTesting = { url: "https://www.xyz.com" };

const wordle = async function () {
  try {
    const response = await axios.request(options);
    const wordle = await response.data;
    return wordle.toUpperCase();
  } catch (err) {
    console.log(err);
    error.render();
  }
};

export default {
  wordle,
};
