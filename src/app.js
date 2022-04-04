const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { resolve } = require("dns");

// console.log(__dirname); = Node-Course\web-server\src
// console.log(path.join(__dirname, "../public"));

const app = express();
const port = process.env.PORT || 3000;
//define path for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
// setup static directory to serve
app.use(express.static(publicDirectoryPath));
// setup handlebars engine and views paths
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Api",
    name: "Lenny T.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Api",
    name: "Lenny T.",
    info: "My first adventure into hbs and html etc.",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Api",
    name: "Lenny T.",
  });
});

app.get("/weather", (req, res) => {
  // console.log(req.query.address);
  // console.log(res);
  if (!req.query.address) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      }); // end forecast call
    }
  ); // end geocode call
  // res.send({
  //   forecast: "sunny abd clear",
  //   location: "Wherever, USA",
  //   address: req.query.address,
  // });
}); // end weather endpoint call

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term!",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help Error!",
    name: "Lenny T.",
    info: "The help page was not found, please check your spelling...",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page error!",
    name: "Lenny T.",
    info: "404 error...the page was not found, please check your request...",
  });
});

app.listen(port, () => {
  console.log("The server is up and runnng on port " + port);
});
