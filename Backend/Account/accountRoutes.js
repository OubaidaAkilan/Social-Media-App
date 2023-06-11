'use strict';
const { express } = require('../ourPackages.js');
const { register, login, logout } = require('./accountService.js');
const basicAuth = require('../Auth/basicAuth.js');
const bearerAuth = require('../Auth/bearerAuth.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', basicAuth, login);
router.post('/logout', bearerAuth, logout);
module.exports = router;
