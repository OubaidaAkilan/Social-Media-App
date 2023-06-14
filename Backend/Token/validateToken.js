'use strict';
const jwt = require('jsonwebtoken');
const ApiError = require('../ErrorHandler/ApiError.js');

const validateUser = require('../User/validateUser');

const validateToken = async (token, next) => {
  console.log(token ,'222222');
  const parsedToken = jwt.verify(token, process.env.SECRET);
  console.log(parsedToken);
  const user = await validateUser({ id: parsedToken.id });
  if (user) return user;
  next(new ApiError('The user is not exist', 404));
};

module.exports = validateToken;
