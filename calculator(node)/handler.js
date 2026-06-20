const { sumrequesthandler } = require("./sum");



const requesthandler = (req,res)=>{
console.log(req.url , req.method);
if(req.url ==='/'){
    res.setHeader('content-type','text-html')
    res.write(`
        <html>
            <head><title>practice set</title></head>
            <body>
            <h1>welcome to calculator</h1>
            <a href="/calculator"> go to calculator</a>
            </body>
          </html>
            `)
  return res.end(); // use to end the request , says that all the data has been sent to client 
}
else if(req.url.toLowerCase() === '/calculator'){
    res.setHeader('content-type','text-html')
    res.write(`
        <html>
            <head><title>calculator</title></head>
            <body>
            <h1>here's calculator page</h1>
            <form action="/calculate-result" method="POST">
            <input type="text" placeholder="first number" name="first"/>
            <input type="text" placeholder="second number" name="second"/>
            <input type="submit" value="sum"/>
           </form>
            </body>
          </html>
            `)
            return res.end();

        }

else if(req.url.toLowerCase() ==='/calculate-result' && req.method ==="POST"){
   return  sumrequesthandler(req,res);  
}        
}
exports.requesthandler=requesthandler;