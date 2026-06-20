const http = require('http');


const {requesthandler} = require('./handler');
const svr = http.createServer(requesthandler);
const port = 3200;
svr.listen(port,()=>{
console.log(`the server is started at address http://localhost:${port}`);
});
