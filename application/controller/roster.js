let controller = require('simple').controller;
let utils =  require('simple').appGlobals.utils;
module.exports = class roster extends controller
{
    constructor()
    {
        super('roster');

    }
    getRoster(userid)
    {
       let bookModel =  this.pongomodel(booking);
      
       bookModel.find({user:userid},  (res)=>{
        this.jsonResp(res);
       });
    }

    updateTimesAvailableAuto(bid)
    {

        

    }

}