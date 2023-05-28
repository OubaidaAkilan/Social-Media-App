'use strict';
const mongoose = require('mongoose');

const likeSchema = mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, 'Description of like is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User of like is required'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post of like is required'],
    },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
