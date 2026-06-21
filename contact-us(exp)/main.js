const express = require('express');

const app = express();

app.use('/',(req,res,next)=>{
    console.log(`it's the first dummy middleware ${req.url} `);
    next();
});

app.use('/',(req,res,next)=>{
    console.log(" it's the second dummy middleware",req.method);
    next();
});

app.get('/',(req,res,next)=>{
    console.log(" it's the third dummy middleware");
    res.send(`<h1> Welcome to the page <h1>
        <a href="/contact-us"> click to contact us </a>
       
        
        `)
});

app.get("/contact-us",(req,res,next)=>{
    console.log(" it's the  dummy middleware at /contact-us",req.method);
    res.send(`<h1>please give your details here <h1>
        
         <form action="/contact-us" method="POST">
          <input type="text"  name="name" placeholder="enter your name" />
         <input type="email"  name="email" placeholder="enter your email" />
         <input type="submit" /> 
        </form >
        
        `); 

app.post("/contact-us",(req,res,next)=>{
    console.log("this is md for contact-us post", req.url,req.method);
    res.send("your response in submitted, thanks ");
})

});


const port = 3200;
app.listen(port,()=>{
    console.log(`the server is started check at http://localhost:${port}`);
});