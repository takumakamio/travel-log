const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    desc: {
      type: String,
      required: true,
      min: 3,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    categories: {
      type: Array,
      required: false,
    },
    lng: {
      type: Number,
    },
    lat: {
      type: Number,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
