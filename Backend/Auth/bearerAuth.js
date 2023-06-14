'use strict';

const ApiError = require('../ErrorHandler/ApiError.js');
const validateToken = require('../Token/validateToken');

const bearerAuth = async (req, res, next) => {
  if (req.headers['authorization']) {
    // 'Bearer token'
    let bearerHeaderParts = req.headers.authorization.split(' ');
    // console.log('bearerHeaderParts >>> ',bearerHeaderParts); // ['Bearer','token']
    let token = bearerHeaderParts.pop(); //encoded(username:password)
    // console.log('Token >>> ',token);

    try {
      console.log('user',1111111111);
      const user = await validateToken(token, next);
      if (user) {
        req.user = user;
        next();
      }
    } catch (error) {
      next(new ApiError('You does not have permission to access', 403));
    }
  } else {
    next(new ApiError('token is not correct or null', 403));
  }
};

module.exports = bearerAuth;
