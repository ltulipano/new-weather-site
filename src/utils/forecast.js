const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=bb634cc1332d8a55cd4585811f9a12f8&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      console.log(body.error);
      callback("Unable to find location, please retry!", undefined);
    } else {
      // console.log(body.current.weather_descriptions[0]);
      callback(
        undefined,
        "here in " +
          body.location.name +
          " the weather is " +
          body.current.weather_descriptions[0] +
          " with a temp. of " +
          body.current.temperature
        // body.current
      );
    }
  });
};

module.exports = forecast;
