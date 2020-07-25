const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(addAllowOriginHerder);
// app.options("*", addCorsHeaders);
app.use(cors({ origin: "http://localhost:3000" }));

// app.use((err, req, res, next) => {
//   delete err.stack;

//   next(err);
// });
dotenv.config();
// console.log("process.env", process.env);

const PORT = process.env.PORT || 3000;

// app.get("/hello", (req, res, next) => {
//   console.log("req.body", req.body);
//   res.send("Hello world!!!");
// });

app.get("/weather", validation, getWeather);

function validation(req, res, next) {
  const weatherRules = Joi.object({
    lat: Joi.string().required(),
    lon: Joi.string().required(),
  }); //пишемо правила для валідаціїю цей мідлвер визначає, які дані є обовязковими в запиті користувавча на бек

  const validationResult = weatherRules.validate(req.query); //валідація

  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }

  next();
}

// function getQuery(req, res, next) {
//   console.log("req.query", req.query);

//   res.json({ weather: "test" });
// }

async function getWeather(req, res, next) {
  const { lat, lon } = req.query;
  //   try {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_KEY}`
  );
  const responseBody = await response.json();

  if (responseBody.error) {
    return res.status(responseBody.code).send(responseBody.error);
  }

  console.log("axiosReq57", responseBody);
  return res.status(200).json(responseBody);
  //   } catch {
  //     (error) => console.log(error);
  //   }
}

function addAllowOriginHerder(req, res, next) {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
}

function addCorsHeaders(req, res, next) {
  res.set(
    "Access-Control-Allow-Methods",
    req.headers["access-control-request-method"]
  );

  res.set(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"]
  );
  res.status(200).send();
}

app.listen(PORT, () => {
  console.log("Started server on PORT", PORT);
});

module.exports = { app };
