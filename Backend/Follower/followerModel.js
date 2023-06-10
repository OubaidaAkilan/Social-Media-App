'use strict';
const { mongoose } = require('../ourPackages');

const followerSchema = new mongoose.Schema(
  {
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Follower = mongoose.model('Follower', followerSchema);

module.exports = Follower;
