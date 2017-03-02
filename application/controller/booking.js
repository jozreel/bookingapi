let controller = require('simple').controller;
module.exports = class booking extends controller
{
    constructor()
    {
        super();

    }
    addBooking()
    {
        // booking data includes starttime , date, clientid, businesid

          let btime =  this.postdata.starttime.split(':');
          let etime = this.postdata.endtime.split(':');
          let bookdate =  this.postdata.bookdate.split('-');
          let bookday = new Date(parseInt(bookdate[0]), parseInt(bookdate[1]-1), parseInt(bookdate[2]), 0,0,0,0);
          let dateBegin = new Date(parseInt(bookdate[0]), parseInt(bookdate[1]-1), parseInt(bookdate[2]), parseInt(btime[0]), parseInt(btime[1]),0,0);
          let tsbegin = dateBegin.getTime();
          let dateEnd = new Date(parseInt(bookdate[0]), parseInt(bookdate[1]-1), parseInt(bookdate[2]), parseInt(etime[0]), parseInt(etime[1]),0,0);
          let tsend = dateEnd.getTime();
          let duration = tsend - tsbegin;
          let bookobj = {starttime: tsbegin, endtime:tsend, duration:duration, clientid:this.postdata.clientid, businessid:this.postdata.businessid, date: bookday.getTime(), datestring:this.postdata.date};
          let bookmod =  this.pongomodel('bookings');
          bookmod.saveOne(bookobj).then(success=>{this.jsonResp(success.ops[0]);},  err=>{this.jsonResp({success:false, error:err});});
    }
    updateBooking()
    {

    }
    getBooking(id)
    {

    }
    getAllBooking()
    {
         
        let bmod = this.pongomodel('bookings');
        bmod.findAllInserted().then(success=>{
           console.log('heheh');
            if(!success.length)
               success=[];
            this.jsonResp(success);
        }, err=>{this.jsonResp(err);});

    }
    
    
}