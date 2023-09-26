const ApiError = require("../error/ApiError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, login, role, name) => {
  return jwt.sign({ id, login, role, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  // пока непонятно через что будет аторизация, возможжен лдап
  async login(req, res, next) {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      return next(ApiError.badRequest("Некорректный логин или пароль!"));
    }
    const candidate = await User.findOne({ where: { login } });
    if (candidate) {
      console.log("Authenticated!");
      const token = generateJwt(candidate.id, candidate.login, candidate.role, candidate.fullname);
      return res.json({ token });
    } else {
      res.status(500).json({ message: "Пользователь не найден." });
    }
  }

}

module.exports = new UserController();
