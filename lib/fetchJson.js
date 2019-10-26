const axios = require("axios");
const ENDPOINT = "https://raw.githubusercontent.com/jdolan/quetoo/master/src/cgame/default/ui/settings/SystemViewController.json";

const fetchJson = async() => {
  console.log("fetching data...");
  const res = await axios.get(ENDPOINT);
  return res.data;
}

module.exports = {
  fetchJson: fetchJson
}