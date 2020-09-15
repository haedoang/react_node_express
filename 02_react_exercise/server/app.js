'use strict';

var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var MySQL = require('./utils/db/mysql').default;

var result = dotenv.config({ path: path.join(__dirname, '../.env') });

var penv = process.env;

console.log(MySQL);

MySQL.initialize(penv);

//route 
var router = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

module.exports = app;