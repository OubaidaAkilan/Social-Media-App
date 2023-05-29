'use strict';
const userModel = require('./userModel');
const { asyncHandler, slugify, bcrybt } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

// @desc    Get a list of Users
// @route   GET /api/v1/users?page=<number>&limit=<number>
// @query   page : integer  , limit : integer
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  // (req.query.page * 1) means convert the string into integer number
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const users = await userModel.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: users.length,
    page,
    data: users,
  });
});

// @desc    Get a spicific user
// @route   GET /api/v1/users/:id
// @params  id
// @access  Private
exports.getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userModel.find({ _id: id });
  if (!user) return next(`The user isn't exist`, 404);
  res.status(200).json({ data: user });
});

// @desc    Create a new user
// @route   Post /api/v1/users
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.create({
    username,
    slug: slugify(username),
    email,
    name: slugify(username),
    password,
  });
  if (!user)
    next(new ApiError(`You cann't create a user now, try later `, 503));

  res.status(201).json({ data: user });
});

// @desc    Update a user
// @route   Put /api/v1/users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { username } = req.body;
  const { id } = req.params;
  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      username,
      name: slugify(username),
      slug: slugify(username),
      email: req.body.email,
      
    },
    {
      new: true,
    }
  );
  if (!user) return next(new ApiError(`The user isn't exist`, 404));
  res.status(200).json({ data: user });
});

// @desc    Delete a user
// @route   Delete /api/v1/users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findOneAndUpdate(
    { _id: id },
    { active: false },
    {
      new: true,
    }
  );
  if (!user) return next(new ApiError("The user isn't exist", 404));

  res.status(200).json({ active: user.active });
});

// @desc    Change the passwor for user
// @route   Update /api/v1/users/change-password/:id
// @access  Public
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await userModel.findOneAndUpdate(
    { _id: id },
    {
      password: await bcrybt.hash(req.body.newPwd, 12),
    },
    { new: true }
  );
  if (!user) return next(new ApiError("The user isn't exist", 404));
  res.status(200).json({ data: user });
});
