'use strict';

var express = require('express');

var consult = require('./api/consult');
var document = require('./api/document');
var user = require('./api/user');

var router = express.Router();

router.use('/cosult', consult);
router.use('/document', document);
router.use('/user', user);

module.exports = router;