const Post = require("../../models/post.model");
module.exports = async (req, res) => {
  const posts = await Post.find({});
  return res
    .status(200)
    .json({ statusText: "Sucessfully fetched all posts...", data: posts });
};
