const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
module.exports = {
  express,
  dotenv,
  mongoose,
  bcrypt,
  slugify,
  asyncHandler,
  bodyParser,
};
