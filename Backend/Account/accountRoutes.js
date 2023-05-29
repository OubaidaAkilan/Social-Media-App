'use strict';
const { express } = require('../ourPackages.js');
const { register } = require('./accountService.js');


const router =express.Router();

router.post('/register', register);

module.exports =router;