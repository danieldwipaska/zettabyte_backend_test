const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      max: 50,
    },
    postId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
