const { buffer } = require("node:stream/consumers");

const sumrequesthandler = (req,res) =>{
  console.log('in sum request handler ',req.url)

  const body =[];   // empty array bnaya  
  req.on('data', chunk=>{    // chunks ko lene ke liye fn bnaya 
    body.push(chunk); // chunks ko array me push kia 
    req.on('end',()=>{
       const str = Buffer.concat(body).toString();
       const params  = new URLSearchParams(str);
      
        const first = Number(params.get('first'));
        const second = Number(params.get('second'));

const result = first + second;
       console.log(result);

       res.setHeader('content-type','text-html')
    res.write(`
        <html>
            <head><title>practice set</title></head>
            <body>
            <h1>the result is ${result}</h1>
            
            </body>
          </html>
            `)
    })
  });
}

exports.sumrequesthandler = sumrequesthandler;