import express from 'express';

const router = express.Router();

router.get('/',(req,res)=>{res.send('test')});


module.exports = router;

//exports default 'Router.use() requires a middleware function but got a ' + gettype(fn)) 