const express = require('express');

const hostRouter = express.Router();
const path = require('path');



hostRouter.get('/host/add-home',(req,res,next)=>{
    
    res.sendFile(path.join(__dirname,'../','views','add-home.html'));
});



hostRouter.post('/host/add-home',(req,res,next)=>{
    console.log(req.body);
    if(!req.body.housename||!req.body.mail){
        res.redirect("/retry");
        
        
    }
    res.send(`<h1>your house is registered </h1>
        <a href="/">go to home</a>

        `)
})


hostRouter.get('/retry',(req,res,next)=>{
    
    res.send(`<h1>ENTER YOUR COMPLETE DETAILS </h1>
        <a href="/host/add-home">try again </a>
        `)
});


module.exports = hostRouter;