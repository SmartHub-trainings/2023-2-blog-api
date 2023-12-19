const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lower: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    lastName: {
      type: String,
    },
    firstName: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const Blog = model("User", UserSchema);

module.exports = Blog;

// post /: id
// post/:id
