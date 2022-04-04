const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");

messageOne.textContent = "";
messageTwo.textContent = "";
messageThree.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(weatherForm);
  const location = search.value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  messageThree.textContent = "";

  fetch(
    "http://api.weatherstack.com/current?access_key=bb634cc1332d8a55cd4585811f9a12f8&query=" +
      location +
      "&units=f"
  ).then((response) => {
    response.json().then((data) => {
      // console.log(data);
      if (data.error || !response.ok) {
        messageOne.textContent = data.error.info;
        // console.log(data.error);
      } else {
        messageOne.textContent =
          data.location.name + ", " + data.location.region;
        messageTwo.textContent =
          data.current.weather_descriptions[0] +
          " with a temp of " +
          data.current.temperature +
          "°F";
        messageThree.textContent =
          "Wind " +
          data.current.wind_speed +
          " " +
          data.current.wind_dir +
          " feels like " +
          data.current.feelslike;
        // console.log(data);
      }
    });
  });
  // console.log(location);
});
