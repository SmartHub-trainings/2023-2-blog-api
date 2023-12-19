const createPost = require("../controllers/posts.controller/create-post");
const getAllPosts = require("../controllers/posts.controller/get-all-posts");
const userAuthentication = require("../middleware/user-authentication");

const postsRouter = require("express").Router();

postsRouter.get("/", getAllPosts);
postsRouter.post("/", userAuthentication, createPost);

module.exports = postsRouter;
