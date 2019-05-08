let restify = require('restify');
let restifyplugin=require('restify-plugins');
        
//let bodyparser=require('body-parser');
let server= restify.createServer();

server.use(restifyplugin.urlEncodedBodyParser({ mapParams: false }));

var redis = require('redis');
var client = redis.createClient();
client.set('idKey',0);
require('./routes/urlroute')(server,client);
            
server.get('/',function(req , res, next){
    res.send("Hello");
});
server.post('/admin/adding',function(req,res,next) {
    res.send("printing:"+req.body.name);
});

server.listen(3000,function(){
    console.log("Server Running at 3000");
});