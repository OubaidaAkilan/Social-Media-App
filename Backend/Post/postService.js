'use strict';
const { asyncHandler, mongoose } = require('../ourPackages.js');
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
  // const posts = await postModel
  //   .find({})
  //   .skip(skip)
  //   .limit(limit);
  const posts = await postModel
    .aggregate([
      {
        /* In this example, the $lookup stage is used to perform the join between
  the User collection and the posts collection based on the posts field in the User model
  and the _id field in the Post model.
  The localField parameter specifies the field from the User model to match,
  and the foreignField parameter specifies the field from the Post model to match. */
        $lookup: {
          from: 'comments', // Name of the collection where the 'Comment' documents are stored
          localField: 'comments',
          foreignField: 'comments._id',
          pipeline: [
            {
              $project: {
                desc: 1,
                user: 1,
                // Add other fields you want to include
              },
            },
          ],
          as: 'comments',
        },
      },
    ])
    .skip(skip)
    .limit(limit);

  if (!posts) next(new ApiError(`There is an server issue  `, 500));
  res.status(200).json({
    results: posts.length,
    page,
    data: posts,
  });
});

// @desc   Get list of my posts
// @route  Get /api/v1/post/recent-posts
// @access public
exports.getRecentPosts = asyncHandler(async (req, res, next) => {
  // (req.query.page * 1) means convert the string into integer number

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const posts = await postModel
    .find({ user: req.user._id })
    .skip(skip)
    .limit(limit);
  if (!posts) next(new ApiError(`There is an server issue  `, 500));
  res.status(200).json({
    results: posts.length,
    page,
    data: posts,
  });
});

// @desc   Get a post
// @route  Get /api/v1/post/:id
// @access public
exports.getPost = asyncHandler(async (req, res, next) => {
  try {
    const post = await postModel
      .findById(req.params.id)
      .populate({
        path: 'comments',
        select: 'desc -_id',
      });
    console.log(post.comments);
    if (!post)return next(new ApiError(`There is an server issue  `, 500));
    res.status(200).json({
      data: post,
    });
  } catch (error) {
    return next(new ApiError(`There is an server issue catch `, 500));
  }
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

// @desc   Update a post
// @route  Put /api/v1/post/:id
// @access private
exports.updatePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return next(new ApiError(`The  post is not exist`, 404));

    if (!post.user._id.equals(req.user._id))
      return next(new ApiError(`You aren't allowed to update this post`, 403));

    const postUpdated = await postModel.findByIdAndUpdate(
      { _id: post._id },
      {
        desc: req.body.desc,
        imgPost: req.body.imgPost,
        user: req.user._id, // from bearer auth
      },
      { new: true }
    );

    if (!postUpdated) return next(new ApiError(`The  post is not exist`, 404));
    res.status(200).json({ data: postUpdated });
  } catch (error) {
    next(new ApiError(`There is an server issue ${error}  `, 500));
  }
});

// @desc   Delete a post
// @route  Delete /api/v1/post/:id
// @access private
exports.deletePost = asyncHandler(async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) return next(new ApiError(`The  post is not exist `, 404));

    if (!post.user._id.equals(req.user._id))
      return next(new ApiError(`You aren't allowed to delete this post`, 403));

    const postDeleted = await postModel.deleteOne(
      { _id: post._id },
      { new: true }
    );

    if (!postDeleted) return next(new ApiError(`The  post is not exist`, 404));
    res.status(200).json({ data: postDeleted });
  } catch (error) {
    next(new ApiError(`There is an server issue ${error}  `, 500));
  }
});
