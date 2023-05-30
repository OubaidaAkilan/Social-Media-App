const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const {
  createPost,
  getPosts,
  getRecentPosts,
  getPost,
  updatePost,
  deletePost,
} = require('./postService.js');

const router = express.Router();

router.route('/').get(getPosts).post(bearerAuth, createPost);
router.route('/recent-posts').get(bearerAuth, getRecentPosts);
router
  .route('/:id')
  .get(getPost)
  .put(bearerAuth, updatePost)
  .delete(bearerAuth, deletePost);

module.exports = router;
