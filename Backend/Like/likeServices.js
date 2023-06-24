'use strict';
const { asyncHandler, mongoose } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');
const likeModel = require('./likeModel.js');

exports.getLikes = asyncHandler(async (req, res, next) => {
  const { postId } = req.query;

  const likes = await likeModel.find({
    post: postId,
  });
  if (!likes) return next(new ApiError(`You can't retrieve likes now`, 503));
  res.status(201).json({ data: likes.map((like) => like.user) });
});

exports.addLike = asyncHandler(async (req, res, next) => {
  const { postId } = req.body;

  const checkLike = await likeModel.findOne({
    user: req.user.id,
    post: postId,
  });

  if (checkLike) return next(new ApiError(`You liked before`, 503));

  const like = await likeModel.create({
    user: req.user.id,
    post: postId,
  });
  if (!like) return next(new ApiError(`You can't like now`, 503));
  res.status(201).json({ data: true });
});

exports.deleteLike = asyncHandler(async (req, res, next) => {
  const { postId } = req.query;
  // console.log(postId, 'postId');
  const unlike = await likeModel.findOneAndDelete({
    user: req.user.id,
    post: postId,
  });
  if (!unlike) return next(new ApiError(`You can't unlike`, 503));
  res.status(204).json({ data: true });
});

exports.noOfLikes = asyncHandler(async (req, res, next) => {
  const { postId } = req.query;

  const likes = await likeModel.find({
    post: postId,
  });
  if (!likes) return next(new ApiError(`You can't like now`, 503));
  res.status(201).json({ data: likes.length });
});
