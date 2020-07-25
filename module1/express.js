const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

app.get(
  "/example",
  (req, res, next) => {
    console.log("first middleware");
    res.set("Set-Cookie", "sdsas=sdadsa");
    const err = new Error();
    err.status = 400;
    next(err);
  },
  (req, res, next) => {
    console.log("second middleware");

    return res.send("hello world");
  }
);

app.post("/example", (req, res, next) => {
  console.log(req.body);
  return res.send(req.body);
});

app.post("/sign-in", (req, res, next) => {
  console.log(req.body);
  res.send("req.body", req.body);
});

app.use((err, req, res, next) => {
  delete err.stack;

  next(err);
});

app.listen(3000, () => {
  console.log("server listened 3000");
});

module.exports;
