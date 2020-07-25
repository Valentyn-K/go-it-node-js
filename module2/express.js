const express = require("express");
const Joi = require("joi");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
// app.use((err, req, res, next) => {
//   delete err.stack;

//   next(err);
// });
dotenv.config();
console.log("process.env", process.env);

const PORT = 3000;

app.get("/hello", (req, res, next) => {
  console.log("req.body", req.body);
  res.send("Hello world!!!");
});

app.get(
  "/weather",
  (req, res, next) => {
    const weatherRules = Joi.object({
      lat: Joi.string().required(),
      lon: Joi.string().required(),
    }); //пишемо правила для валідаціїю цей мідлвер визначає, які дані є обовязковими в запиті користувавча на бек

    const validationResult = weatherRules.validate(req.query); //валідація

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  },
  (req, res, next) => {
    console.log("req.query", req.query);

    res.json({ weather: "test" });
  }
);

app.listen(PORT, () => {
  console.log("Started server on PORT", PORT);
});

module.exports = { app };
