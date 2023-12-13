const Post = require("../../models/post.model");
module.exports = async (req, res) => {
  const body = req.body;

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
