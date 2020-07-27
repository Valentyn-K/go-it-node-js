const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./users/users.routers.js");

module.exports = class UserServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRouts();
    this.startListening();
  }

  initServer() {
    this.server = express();
    
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors({ origin: "http://localhost:3000" }));
  }

  initRouts() {
    this.server.use("/users", userRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Server started listening port", process.env.PORT);
    });
  }
};
