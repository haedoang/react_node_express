var express = require('express');

var board =   require('./api/board') ;
var  qna  = require('./api/qna') ;
var  user = require('./api/user');

const router = express.Router();


router.use('/board',board);
router.use('/qna', qna);
router.use('/user',user);

module.exports =  router;