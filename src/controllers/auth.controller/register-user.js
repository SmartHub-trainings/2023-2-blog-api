const constants = require("../../configs/constants");
const User = require("../../models/user.model");
const Joi = require("joi");
const { hash } = require("bcrypt");
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  username: Joi.string().required(),
});
module.exports = async (req, res) => {
  const body = req.body;
  const { value, error } = schema.validate(body, {
    abortEarly: false,
  });
  if (error) {
    return res.status(400).json({
      error: error.details.map((item) => item.message),
      statusText: "fail",
    });
  }

  try {
    const userExists = await User.findOne({ email: body.email });
    if (userExists) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }
    if (body.password !== body.confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and confirm password must match" });
    }
    const password = await hash(body.password, 10);

    const user = await User.create({ ...body, password });
    if (!user) {
      console.log("error");
      return;
    }
    return res
      .status(201)
      .json({ statusText: "Successfully registered a user", data: user });
  } catch (error) {
    return res.status(500).json(error);
  }
};
