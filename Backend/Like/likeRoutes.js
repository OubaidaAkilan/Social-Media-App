const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const {
  getLikes,
  addLike,
  deleteLike,
  noOfLikes,
} = require('./likeServices.js');
const router = express.Router();

router
  .route('/')
  .get(getLikes)
  .post(bearerAuth, addLike)
  .delete(bearerAuth, deleteLike);

router.get('/no-of-likes', noOfLikes);
module.exports = router;