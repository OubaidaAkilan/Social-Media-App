'use strict';
const { asyncHandler } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

const postModel = require('./postModel.js');

// @desc   Get list of posts
// @route  Get /api/v1/post
// @access public
exports.getPosts = asyncHandler(async (req, res, next) => {
  // (req.query.page * 1) means convert the string into integer number

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const posts = await postModel.find({}).skip(skip).limit(limit);
  if (!posts)
    next(new ApiError(`There is an server issue  `, 500));
  res.status(200).json({
    results: posts.length,
    page,
    data: posts,
  });
});

// @desc   Create a new post
// @route  Post /api/v1/post
// @access Private
exports.createPost = asyncHandler(async (req, res, next) => {
  const { desc, imgPost } = req.body;
  const post = await postModel.create({
    desc,
    imgPost,
    user: req.user._id, // from bearer auth
  });
  if (!post)
    next(new ApiError(`You cann't create a post now, try later `, 503));
  res.status(201).json({ data: post });
});
