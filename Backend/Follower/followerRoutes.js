'use strict';

const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');

// Nesting routers as middleware is commonplace. To keep the parent req.params, you need to add { mergeParams: true } in to the child router.
const router = express.Router();

const {
  createFollowing,
  getListOfFollower,
  getFollowers,
  getFollowing,
  deleteFollower,
} = require('./followerService.js');



// id : it identifies the profile of user who is being folloed
router.route('/:id').post(bearerAuth, createFollowing);

router.get('/', bearerAuth,getListOfFollower);

router.get('/:id/followers', bearerAuth, getFollowers);
router.get('/:id/following', bearerAuth, getFollowing);
router.delete('/:id/unfollow', bearerAuth, deleteFollower);

module.exports = router;
