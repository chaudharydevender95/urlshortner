var indexes = require('../utils/IDConverter').initializeIndexToCharTable();
require('../utils/IDConverter').initializeCharToIndexTable();
var IDConverter = require('../utils/IDConverter');
var baseUrl = 'url/';

module.exports = function(server,client){
    
    server.post('/url',(req,res)=>{
        var longUrl = req.body.url;
        client.hget('longToShortHash',longUrl,function(err,value,value1,value2){
            
            if(!value){
                client.incr('idKey');
                client.get('idKey',function(err,value){
                    console.log('er'+err);
                    console.log('value1'+value);
                    if(value){
                        client.hset('indexToUrlHash',value,longUrl);
                        var uniqueId = IDConverter.createUniqueID(value);
                        var shorturl = baseUrl +uniqueId;
                        client.hset('longToShortHash',longUrl,shorturl);
                        res.send(shorturl);
                    }
                    else{
                        res.send('Server Error');
                    }
                })
            }else{
                res.send('url already exist. URL: '+value);
            }
        })
    })

    server.post('/getLongUrl',(req,res)=>{
        var shortUrl = req.body.url;
        var uniqueId = shortUrl.split('/')[1];
        var index = IDConverter.getDictionaryKeyFromUniqueID(uniqueId);
        client.hget('indexToUrlHash',index,function(err,value){
            if(value){
                res.send(value);
            }
            else{
                res.send('No url exist');
            }
        })
    })
}