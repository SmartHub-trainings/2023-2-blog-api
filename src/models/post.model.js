const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["health", "music", "tech", "general"],
    },
    createdBy: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Blog = model("Post", PostSchema);

module.exports = Blog;
