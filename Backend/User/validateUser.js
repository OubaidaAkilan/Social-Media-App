const userModel = require('./userModel');
const bcrybt = require('bcrypt');
const ApiError = require('../ErrorHandler/ApiError');

const validateUser = async ({ email = null, password = null, id = null }) => {
  try {
    const objFilter = id ? { _id: id } : { email: email };
    const user = await userModel.findOne(objFilter);
    //If we don't have id, that mean we just send email and pwd
    if (!id) {
      const valid = await bcrybt.compare(password, user.password);
      return valid ? user : false;
    } else {
      // Will return the user id, we have id and the user is exist, I returned here because validateToken funcion
      return user;
    }
  } catch (err) {
    throw new ApiError('Invalide user', 401);
  }
};

module.exports = validateUser;
