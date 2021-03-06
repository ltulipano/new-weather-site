const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    // address +
    ".json?access_token=pk.eyJ1IjoibHR1bGlwYW5vIiwiYSI6ImNqeWE1bDJjZjBhcjUzYnF6cnlhODBra2cifQ.6adlmQMFDd00fpQvvH9lug&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.error || body.features.length === 0) {
      callback("Unable to find location, please retry!", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
