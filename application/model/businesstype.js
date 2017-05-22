
var businesstype ={
modelname:'businesstype',
addnew:function(btype,callback)
{
    var businessid = btype.replace(/\s/g, '');
    var businessid = businessid.toLowerCase();
  
    this.findOne({businesstypeid:businessid},{},{},(doc)=>{
       if(doc === null)
       {
           console.log('ok');
           this.insert({businesstypeid:businessid,businesstypename:btype}, (tdoc)=>{
               tdoc.businesstypeid=businessid,
               tdoc.businesstypename =btype;
               callback(tdoc);
           });
       } 
       else(callback(doc));
    });
},
findByRegex:function(needle, callback) 
{
  needle =  this.checkanddecode(needle);
   var regexp = '^'+needle+'\\s*';
   
   var regex = new RegExp(regexp,'i');
  // console.log(regex);
   this.find({businesstypename:{$regex:regex}}, {}, {},true,(doc)=>{
       if(doc.length == undefined)
        doc=[];
       callback(doc)}); 
}
}
module.exports = businesstype;
