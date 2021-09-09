const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

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
      max: 60,
    },
    desc: {
      type: String,
      required: true,
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
      type: Object,
    },
    likes: {
      type: Array,
      default: [],
    },
    comment: {
      type: Array,
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostSchema);
