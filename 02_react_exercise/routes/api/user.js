var express = require('express');
var router = express.Router();

router.get('/login',(req,res)=>{
    res.send('login..')
})

router.post('/login',(req,res) => {
    console.log(req.body.id);
    console.log(req.body.password);
    res.send("su222ccess")
})



module.exports =  router;