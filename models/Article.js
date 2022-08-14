const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      max: 100,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      max: 500,
    },
    img: {
      type: String,
      default: '',
    },
    imgType: {
      type: String,
      default: '',
    },
    categories: {
      type: Array,
      default: [],
    },
    content: {
      type: String,
      required: true,
      max: 3000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
