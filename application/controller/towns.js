towns={
regxpfind:function(needle)
{
    var tmodel = this.loadmodel('towns');
    
    tmodel.findByRegex(needle,(res)=>this.jsonResp(res));
}
}
module.exports =towns;