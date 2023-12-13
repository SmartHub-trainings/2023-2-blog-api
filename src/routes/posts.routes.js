const createPost = require("../controllers/posts.controllers/create-post");
const getAllPosts = require("../controllers/posts.controllers/get-all-posts");

const postsRouter = require("express").Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", createPost);

module.exports = postsRouter;
