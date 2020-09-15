'use strict';

var express = require('express');
var router = express.Router();

var user = require('./api/user');
var es6 = require('./api/es6');

router.use('/user', user);
router.use('/es6', es6);

module.exports = router;