const constants = require("../../configs/constants");
const Post = require("../../models/post.model");
const Joi = require("joi");
const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  body: Joi.string().required(),
  category: Joi.string()
    .valid(...constants.postCategories)
    .required(),
});
module.exports = async (req, res) => {
  const body = req.body;
  const { value, error } = schema.validate(body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
      statusText: "fail",
    });
  }

  try {
    const post = await Post.create(body);
    if (!post) {
      console.log("error");
      return;
    }
    return res
      .status(201)
      .json({ statusText: "Successfully created a post", data: post });
  } catch (error) {
    return res.status(500).json(error);
  }
};
