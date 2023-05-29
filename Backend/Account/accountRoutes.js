'use strict';
const { express } = require('../ourPackages.js');
const { register, login } = require('./accountService.js');
const  basicAuth  = require('../Auth/basicAuth.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', basicAuth, login);

module.exports = router;
