'use strict';

const followerModel = require('./followerModel.js');
const { asyncHandler } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

// @desc   Create a new follower
// @route  Post /api/v1/follwer
// @access Public
exports.getListOfFollower = asyncHandler(async (req, res, next) => {
  const ListOfFollower = await followerModel.find({ followers: req.user.id });
  if (!ListOfFollower)
    next(new ApiError(`You cann't create a follower now, try later `, 503));
  res.status(200).json({ data: ListOfFollower });
});

// @desc   Create a new follower
// @route  Post /api/v1/follwer
// @access Public
exports.createFollowing = asyncHandler(async (req, res, next) => {
  // user1 following user2, so I will add user2 to the following list of user1
  const userFollowing = req.params.id;

  const checkFollow = await followerModel.findOne({
    followers: req.user.id,
    following: userFollowing,
  });

  if (checkFollow) {
    return next(new ApiError(`You followed him before`, 503));
  }

  const newFollower = await followerModel.create({
    followers: req.user.id,
    following: userFollowing,
  });
  if (!newFollower)
    return next(
      new ApiError(`You cann't create a follower now, try later `, 503)
    );
  res.status(201).json({ data: newFollower });
});

// @desc   Get followers
// @route  Get /api/v1/follower/:id/follwers
// @access Public
exports.getFollowers = asyncHandler(async (req, res, next) => {
  const followers = await followerModel.find({ following: req.params.id });
  if (!followers)
    next(new ApiError(`You don't able to get followers now, try later `, 503));
  res
    .status(200)
    .json({ data: followers.map((follower) => follower.followers) });
});

// @desc   Get following
// @route  Get /api/v1/follower/:id/following
// @access Public
exports.getFollowing = asyncHandler(async (req, res, next) => {
  const following = await followerModel
    .find({ followers: req.params.id })
    .populate('following', 'username');

  if (!following)
    next(
      new ApiError(
        `You don't able to get people you follow now, try later `,
        503
      )
    );
  res.status(200).json({ data: following });
});

// @desc   Delete follower
// @route  Delete /api/v1/follower/:id/unfollow
// @access Public
exports.deleteFollower = asyncHandler(async (req, res, next) => {
  // user1 following user2, so I will unfollowe user2
  const userFollowing = req.params.id;
  const unfollow = await followerModel.findOneAndDelete({
    followers: req.user.id,
    following: userFollowing,
  });

  if (!unfollow)
    next(
      new ApiError(`You don't able to delete follower now, try later `, 503)
    );
  res.status(200).json({ data: unfollow });
});
