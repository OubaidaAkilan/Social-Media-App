'use strict';
const { express } = require('../ourPackages.js');
// const bearerAuth =require('../Auth/bearerAuth.js');



const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
} = require('./userServices.js');

const router = express.Router();

/* In most REST based Express.js applications, nesting routers as middleware is commonplace. To keep the parent req.params, you need to add { mergeParams: true } in to the child router. */



router.put('/change-password/:id', changePassword);

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
