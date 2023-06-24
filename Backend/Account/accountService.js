'use strict';
const userModel = require('../User/userModel.js');
const { asyncHandler, slugify, bcrypt } = require('../ourPackages.js');
const ApiError = require('../ErrorHandler/ApiError.js');

// @desc    Create new user
// @route   Post /api/v1/account
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  //CHECK THE USER IS EXIST OR NOT
  const validUser = await userModel.findOne({ email });
  if (validUser) return next(new ApiError(`User already exists`, 409));
  //CREATE USER
  //Hash password 123 => fasdfasdfsda I did that inside userModel before add it to the database.

  const user = await userModel.create({
    username,
    slug: slugify(username),
    email,
    password,
    name: slugify(username),
  });

  if (!user)
    return next(new ApiError(`You cann't sign up now, try later `, 503));
  res.status(201).json({ data: user });
});

// @desc    Sign in user
// @route   Post /api/v1/auth
// @access  Public
exports.login = asyncHandler(async (req, res) => {
  const { username, email, name, coverPic, profilePic, city, website, _id } =
    req.user;

  res.cookie('accessToken', req.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  res.header('Access-Control-Allow-Credentials', true);
  res
    .status(200)
    .json({ username, email, name, coverPic, profilePic, city, website, _id });
});

// @desc    Logout user
// @route   Post /api/v1/auth
// @access  Public
exports.logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('User has been logged out');
});
