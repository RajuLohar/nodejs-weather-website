const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port=process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Raju Lohar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "Raju Lohar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Raju Lohar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "provide an address",
    });
  }

  geocode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });

  // res.send([
  //   {
  //     forecast: "weather",
  //     location:'anywhere',
  //     address:req.query.search
  //   },
  // ]);
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "provide a search",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 not found",
  });
});

app.listen(port, () => {
  console.log(`Server is on! ${port}`);
});
