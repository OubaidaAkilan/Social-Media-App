const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const {
  createStory,
  getRecentStories,
  deleteStory,
} = require('./storyService.js');

const router = express.Router();

router.route('/').post(bearerAuth, createStory);
router.route('/recent-stories').get(bearerAuth, getRecentStories);
router.route('/:id').delete(bearerAuth, deleteStory);

module.exports = router;
