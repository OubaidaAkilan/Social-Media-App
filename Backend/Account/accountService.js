'use strict';
const userModel = require('../User/userModel.js');
const { asyncHandler, slugify } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

// @desc    Create new user
// @route   Post /api/v1/account
// @access  Public
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.create({
    username,
    slug: slugify(username),
    email,
    password,
    name: slugify(username),
  });

  if (!user) next(new ApiError(`You cann't sign up now, try later `, 503));
  res.status(201).json({ data: user });
});

// @desc    Sign in user
// @route   Post /api/v1/auth
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  res.status(200).json({
    token: req.token,
  });
});

// @desc    Logout user
// @route   Post /api/v1/auth
// @access  Public
exports.logout = asyncHandler(async () => {});
