
let controller  = require('simple').controller;
module.exports = class servicde extends controller
{
regxpfind(needle)
{
   
    var smodel = this.loadmodel('service');
    
    smodel.findByRegex(needle,(res)=>this.jsonResp(res));
}
}
