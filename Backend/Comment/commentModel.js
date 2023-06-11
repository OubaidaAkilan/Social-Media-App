'use strict';
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, 'Description of comment is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User of comment is required'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post of comment is required'],
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
