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


router.put('/change-password/:id', changePassword);

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
