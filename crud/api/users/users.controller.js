const joi = require("joi");

const users = [
  { id: 1, name: "bob", email: "bob@mail.com", password: "qwerty" },
];

module.exports = class usersController {
  get createUser() {
    return this._createUser.bind(this);
  }

  get updateUser() {
    return this._updateUser.bind(this);
  }

  get deleteUser() {
    return this._deleteUser.bind(this);
  }

  static getUsers(req, res, next) {
    return res.json(users);
  }

  static _createUser(req, res, next) {
    console.log(req.body);
    const newUser = {
      ...req.body,
      id: users.length + 1,
    };
    users.push(newUser);
    console.log("users", users);
    return res.send(users);
  }

  static _updateUser(req, res, next) {
    const targetUserIndex = this.findUserIndexById(res, req.params.id);

    if (targetUserIndex === undefined) return;

    users[targetUserIndex] = { ...users[targetUserIndex], ...req.body };

    console.log(users);

    return res.status(200).send(users);
  }

  static _deleteUser(req, res, next) {
    const targetUserIndex = this.findUserIndexById(req.params.id);
    if (targetUserIndex === undefined) return;

    users.splice(targetUserIndex, 1);
    console.log("users", users);
    return res.status(200).send(users);
  }

  static findUserIndexById(res, userId) {
    const id = parseInt(userId);

    const targetUserIndex = users.findIndex((user) => user.id === id);

    if (targetUserIndex === -1) {
      res.status(404).send("User doesn't exist");
    }
    return targetUserIndex;
  }

  static validateUserCreation(req, res, next) {
    console.log(req.body);

    const userValidateRules = joi.object({
      name: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    });
    console.log(userValidateRules);

    const result = userValidateRules.validate(req.body);
    console.log(result);

    if (result.error) {
      return res.status(400).send(result.error);
    }
    next();
  }

  static validateUserUpdate(req, res, next) {
    console.log(req.body);

    const userValidateRules = joi.object({
      name: joi.string(),
      email: joi.string(),
      password: joi.string(),
    });

    const result = userValidateRules.validate(req.body);

    if (result.error) {
      return res.status(400).send(result.error);
    }
    next();
  }
};
