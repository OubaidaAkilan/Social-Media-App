'use strict';
const { asyncHandler, slugify } = require('../ourPackages.js');
const userModel = require('../User/userModel.js');

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

  if (!user)
    res.status(503).json({ Error: 'You can not sign up now try later' });
  res.status(201).json({ data: user });
});

// @desc    Sign in user
// @route   Post /api/v1/auth
// @access  Public
exports.login = asyncHandler(async (req,res,next) => {

});

// @desc    Logout user
// @route   Post /api/v1/auth
// @access  Public
exports.logout = asyncHandler(async () => {});
