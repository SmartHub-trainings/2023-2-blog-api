const Post = require("../../models/post.model");
module.exports = async (req, res) => {
  const {
    query: { per_page = 5, page = 1 },
  } = req;

  const skip = per_page * (page - 1);
  const limit = per_page * 1;
  const numberOfItems = await Post.find({}).countDocuments();
  const posts = await Post.find({}).limit(limit).skip(skip);
  const meta = {
    currentPage: page,
    numberOfPage: Math.ceil(numberOfItems / per_page),
    limit,
  };

  return res.status(200).json({
    statusText: "Sucessfully fetched all posts...",
    data: posts,
    meta,
  });
};
