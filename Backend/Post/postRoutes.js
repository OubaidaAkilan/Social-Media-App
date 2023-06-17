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

const commentRoutes = require('../Comment/commentRoutes.js');

/* In most REST based Express.js applications, nesting routers as middleware is commonplace. To keep the parent req.params, you need to add { mergeParams: true } in to the child router. */
router.use('/:postId/comments', commentRoutes);

router.route('/').get(getPosts).post(bearerAuth, createPost);
router.route('/recent-posts').get(bearerAuth, getRecentPosts);
router
  .route('/:id')
  .get(getPost)
  .put(bearerAuth, updatePost)
  .delete(bearerAuth, deletePost);

module.exports = router;
