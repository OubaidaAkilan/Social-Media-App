const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
module.exports = {
  express,
  dotenv,
  mongoose,
  bcrypt,
  slugify,
  asyncHandler,
  bodyParser,
  morgan,
  cors,
  cookieParser,
};
