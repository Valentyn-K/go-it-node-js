const { Router } = require("express");

const usersController = require("./users.controller.js");

const userRouter = Router();
//CRUD

//Create
userRouter.post(
  "/",
  usersController.validateUserCreation,
  usersController.createUser
);

//Read
userRouter.get("/", usersController.getUsers);

//Update
userRouter.put(
  "/:id",
  usersController.validateUserUpdate,
  usersController.updateUser
);

//Delete
userRouter.delete("/:id", usersController.deleteUser)

module.exports = userRouter;
