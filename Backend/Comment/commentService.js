'use strict';
const commentModel = require('./commentModel.js');
const { asyncHandler } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

// Nested route
exports.setPostIdToBody = (req, res, next) => {
  req.body.post ||= req.params.postId;
  next();
};

// @desc    Get a list of comments
// @route   GET /api/v1/post/:postId/comments
// @access  Public
exports.getComments = asyncHandler(async (req, res, next) => {
  const comments = await commentModel.find({ post: req.body.post }).populate({
    path: 'user',
    select: 'username profilePic -_id',
  });
  if (!comments) return next(new ApiError(`There is an server issue  `, 500));
  res.status(200).json({
    results: comments.length,
    data: comments,
  });
});

// @desc    Create comment
// @route   POST /api/v1/post/:postId/comments
// @access  public
exports.createComment = asyncHandler(async (req, res, next) => {
  const { desc } = req.body;

  const comment = await commentModel.create({
    desc,
    post: req.params.postId,
    user: req.user._id,
  });

  if (!comment)
    return next(new ApiError(`The can't create a comment now, try later`, 503));
  res.status(201).json({
    data: comment,
  });
});

// @desc   Update a comment
// @route  Put /api/v1/post/:postId/comments/:id
// @access private
exports.updateComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.id);
    if (!comment) return next(new ApiError(`The  comment is not exist`, 404));

    if (!comment.user._id.equals(req.user._id))
      return next(
        new ApiError(`You aren't allowed to update this comment`, 403)
      );

    const commentUpdated = await commentModel.findByIdAndUpdate(
      { _id: comment._id },
      {
        desc: req.body.desc,
        post: comment.post,
        user: req.user._id, // from bearer auth
      },
      { new: true }
    );

    if (!commentUpdated)
      return next(new ApiError(`The  post is not exist`, 404));
    res.status(200).json({ data: commentUpdated });
  } catch (error) {
    next(new ApiError(`There is an server issue ${error}  `, 500));
  }
});

// @desc   Delete a comment
// @route  Delete /api/v1/post/:postId/comments/:id
// @access private
exports.deleteComment = asyncHandler(async (req, res, next) => {
  try {
    const comment = await commentModel.findById(req.params.id);

    if (!comment) return next(new ApiError(`The  comment is not exist `, 404));

    if (!comment.user._id.equals(req.user._id))
      return next(
        new ApiError(`You aren't allowed to delete this comment`, 403)
      );

    const commentDeleted = await commentModel.deleteOne(
      { _id: comment._id },
      { new: true }
    );

    if (!commentDeleted)
      return next(new ApiError(`The  comment is not exist`, 404));
    res.status(204).json({ data: commentDeleted });
  } catch (error) {
    next(new ApiError(`There is an server issue ${error}  `, 500));
  }
});
