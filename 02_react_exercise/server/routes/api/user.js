'use strict';

var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
    res.send('login..');
});

router.post('/login', function (req, res) {
    console.log(req.body.id);
    console.log(req.body.password);
    res.send("su222ccess");
});

module.exports = router;