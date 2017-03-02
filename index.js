let simpleapp = require('simple').app;
let utils = require('./myutils');
let appGlobals =  require('simple').appGlobals;
appGlobals.utils =  require('./myutils');
let pongo = require('pongo');
let https = require('https');
let config = require('./config/systemconfig');
let fstm = require('fs');
let options = { key: fstm.readFileSync(config.keys + '/' + 'key.pem'), cert: fstm.readFileSync(config.keys + '/' + 'cert.pem') };
var opts={dbuser:config.dbuser, passwd:config.passwd,dbserver:config.dbserver,dbport:config.dbport, db:config.db, test_db:config.test_db}; 
pongo.init(opts);
let app = simpleapp();

app.use(function(req,res)
    {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 });

 let server =  https.createServer(options,app);
 server.listen(4435,'0.0.0.0');

 module.exports = app; //for tests