import express from 'express';
import api from './routes/index';
import path from 'path';
import logger from './utils/logger';
import MySQL from './utils/db/mysql';
import Test from './utils/db/test';

const app = express();

app.use('/api',api);

let penv = process.env;
console.dir(MySQL)
MySQL.initialize(penv);


export default app;

