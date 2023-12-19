const constants = require("../../configs/constants");
const User = require("../../models/user.model");
const Joi = require("joi");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
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
    const userExists = await User.findOne({ email: body.email }).select(
      "+password"
    );
    console.log({ userExists });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "invalid Email/password combination" });
    }
    const isPassword = await compare(body.password, userExists.password);

    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "invalid Email/password combination" });
    }

    const jwt = await sign(
      {
        _id: userExists._id,
        username: userExists.username,
      },
      constants.JWT_SECRET_KEY
    );
    const refreshToken = await sign(
      {
        _id: userExists._id,
        username: userExists.username,
      },
      constants.JWT_REFRESH_SECRET_KEY
    );

    return res
      .status(201)
      .json({
        statusText: "Successfully registered a user",
        jwt,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
