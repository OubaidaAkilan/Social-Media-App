'use strict';
const { asyncHandler } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

const storyModel = require('./storyModel.js');

// @desc   Get list of my stories
// @route  Get /api/v1/story/recent-stories
// @access Private
exports.getRecentStories = asyncHandler(async (req, res, next) => {
  // (req.query.page * 1) means convert the string into integer number

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const stories = await storyModel
    .find({ user: req.user._id })
    .skip(skip)
    .limit(limit);
  if (!stories) next(new ApiError(`There is an server issue  `, 500));
  res.status(200).json({
    results: stories.length,
    page,
    data: stories,
  });
});

// @desc   Create a new story
// @route  Post /api/v1/story
// @access Private
exports.createStory = asyncHandler(async (req, res, next) => {
  const { desc, imgStory } = req.body;
  const story = await storyModel.create({
    desc,
    imgStory,
    user: req.user._id, // from bearer auth
  });
  if (!story)
    next(new ApiError(`You cann't create a story now, try later `, 503));
  res.status(201).json({ data: story });
});



// @desc   Delete a story
// @route  Delete /api/v1/story/:id
// @access private
exports.deleteStory = asyncHandler(async (req, res, next) => {
  try {
    const story = await storyModel.findById(req.params.id);

    if (!story) return next(new ApiError(`The  story is not exist `, 404));

    if (!story.user._id.equals(req.user._id))
      return next(new ApiError(`You aren't allowed to delete this story`, 403));

    const storyDeleted = await storyModel.deleteOne(
      { _id: story._id },
      { new: true }
    );

    if (!storyDeleted) return next(new ApiError(`The  story is not exist`, 404));
    res.status(200).json({ data: storyDeleted });
  } catch (error) {
    next(new ApiError(`There is an server issue ${error}  `, 500));
  }
});
