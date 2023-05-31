const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const { setPostIdToBody, getComments, createComment, deleteComment, updateComment } = require( './commentService.js' );





const router = express.Router();


router
  .route('/')
  .get(bearerAuth, setPostIdToBody, getComments)
  .post(bearerAuth, setPostIdToBody, createComment);


router
  .route('/:id')
  .delete(bearerAuth,  deleteComment)
  .put(bearerAuth,  updateComment);


module.exports = router;
