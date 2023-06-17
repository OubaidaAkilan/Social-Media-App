const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const { setPostIdToBody, getComments, createComment, deleteComment, updateComment } = require( './commentService.js' );






// Nesting routers as middleware is commonplace. To keep the parent req.params, you need to add { mergeParams: true } in to the child router.
const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(bearerAuth, setPostIdToBody, getComments)
  .post(bearerAuth, setPostIdToBody, createComment);



router
  .route('/:id')
  .get(bearerAuth, setPostIdToBody, getComments)
  .delete(bearerAuth, deleteComment)
  .put(bearerAuth, updateComment);


module.exports = router;
