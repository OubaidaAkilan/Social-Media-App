'use strict';
const { mongoose, bcrypt } = require('../ourPackages');

const postModel = require('../Post/postModel');
const commentModel = require('../Comment/commentModel');
const storyModel = require('../Story/storyModel');
const followerModel = require('../Follower/followerSchema');
const likeModel = require('../Like/likeModel');

//1- Create Shema

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Name of user is required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email of user is required'],
    },
    password: {
      type: String,
      required: [true, 'Email of user is required'],
      minlingth: [8, 'To short password'],
    },
    name: {
      type: String,
      required: [true, 'Name of user is required'],
    },
    coverPic: {
      type: String,
      default: null,
    },
    profilePic: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    website: {
      type: String,
      default: null,
    },

    active: {
      type: Boolean,
      default: false,
    },

    //   relations
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follower',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follower',
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
  },
  { timestamps: true }
);

//Before save the new field, verify if the password updated or not then hash it.
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  //Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Pre-remove middleware for the userSchema
userSchema.pre('remove', async function (next) {
  // Remove all posts associated with the user being removed
  await postModel.deleteMany({ user: this._id });
  next();
});

// Pre-remove middleware for the userSchema
userSchema.pre('remove', async function (next) {
  // Remove all posts associated with the user being removed
  await commentModel.deleteMany({ user: this._id });
  next();
});

// Pre-remove middleware for the userSchema
userSchema.pre('remove', async function (next) {
  // Remove a stroy associated with the user being removed
  await storyModel.deleteMany({ user: this._id });
  next();
});

userSchema.pre('remove', async function (next) {
  try {
    // Remove the user from the followers' following lists
    await followerModel.updateMany(
      { following: this._id },
      { $pull: { following: this._id } }
    );

    // Remove the user from the followers' follower lists
    await followerModel.updateMany(
      { follower: this._id },
      { $pull: { follower: this._id } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

// Pre-remove middleware for the userSchema
userSchema.pre('remove', async function (next) {
  // Remove all likes associated with the user being removed
  await likeModel.deleteMany({ user: this._id });
  next();
});
//2-export model
const User = mongoose.model('User', userSchema);

module.exports = User;
