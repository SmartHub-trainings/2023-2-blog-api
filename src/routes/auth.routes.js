const login = require("../controllers/auth.controller/login");
const registerUser = require("../controllers/auth.controller/register-user");

const authRouter = require("express").Router();

authRouter.post("/", registerUser);
authRouter.post("/login", login);

module.exports = authRouter;
