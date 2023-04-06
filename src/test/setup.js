function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const url = process.env.HOST + 'tag-categories';
const time = 1000;

module.exports = async () => {
  const axios = require('axios');
  let repeat = true;
  while (repeat) {
    try {
      // eslint-disable-next-line no-unused-expressions
      (await axios.get(url)).data;
      repeat = false;
    } catch (e) {
      console.log(`waiting ${time}ms for szurubooru server (${url}) to be online. Current error ${e}`);
      await sleep(time);
    }
  }
};
