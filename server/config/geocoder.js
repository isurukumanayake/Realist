const NodeGeoCoder = require("node-geocoder");

const options = {
  provider: "google",
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null,
};

const GOOGLE_GEOCODER = NodeGeoCoder(options);

module.exports = GOOGLE_GEOCODER;
