'use strict';
const mongoose = require('mongoose');
const commentModel = require('../Comment/commentModel');

const postSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, 'Description of post is required'],
    },
    imgPost: {
      type: String,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User of post is required'],
    },

    //   relations

    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  },
  { timestamps: true }
);

// Pre-remove middleware for the psotSchema
postSchema.pre('remove', async function (next) {
  // Remove all comments associated with the post being removed
  await commentModel.deleteMany({ post: this._id });
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
