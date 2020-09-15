var express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const MySQL = require('./utils/db/mysql').default;

var result = dotenv.config({path : path.join(__dirname, '../.env')});

const penv = process.env;

console.log(MySQL);

MySQL.initialize(penv);




//route 
const router = require('./routes/index');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
app.use('/api', router)





module.exports = app;