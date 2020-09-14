import express from 'express';
import api from './routes/index';
import path from 'path';
import logger from './utils/logger';
const app = express();

app.use('/api',api);

//app.set('trust proxy','127.0.0.1'); ?

let env = app.get('env');
let penv = process.env;

console.log('!!')
console.log('env: ', env);
console.log('penv: ', penv);



export default app;

