const { express } = require('../ourPackages.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const { createPost, getPosts } = require('./postService.js');

const router = express.Router();

router.route('/').get(getPosts).post(bearerAuth, createPost);

module.exports = router;
