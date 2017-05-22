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
          let workmod = this.pongomodel('worker');
          workmod.getWorker(this.postdata. workerid).then(res=>{
          let services =  res.services;
          res.services.sort((a,b)=>{return a.serviceid-b.serviceid});
          let utils = require('simple').appGlobals.utils;
          let servsel =  utils.arrayFind(res.services, this.postdata.serviceid, 'serviceid')
          
          let servdur= servsel.duration*60000;
          
           let btime =  this.postdata.starttime.split(':');
        
          let bookdate =  this.postdata.bookdate.split('-');
          let bookday = new Date(parseInt(bookdate[0]), parseInt(bookdate[1]-1), parseInt(bookdate[2]), 0,0,0,0);
          let dateBegin = new Date(parseInt(bookdate[0]), parseInt(bookdate[1]-1), parseInt(bookdate[2]), parseInt(btime[0]), parseInt(btime[1]),0,0);
          let tsbegin = dateBegin.getTime();
          let tsend = tsbegin + servdur;

       
       //   let dateEnd = new Date(parseInt(bookdate[0]), parseInt(bookdate[1]-1), parseInt(bookdate[2]), parseInt(etime[0]), parseInt(etime[1]),0,0);
          //let tsend = dateEnd.getTime();
          let duration = tsend - tsbegin;
          let bookobj = {starttime: tsbegin, workerid:this.postdata.workerid, duration:duration, clientid:this.postdata.clientid, endtime:tsend, businessid:this.postdata.businessid, date: bookday.getTime(), datestring:this.postdata.bookdate};
          let bookmod =  this.pongomodel('bookings');
          let rostermod = this.pongomodel('roster');
          rostermod.updateWorkerTimesAuto({date:bookday.getTime(), workerid:rostermod.createObjectId(this.postdata.workerid), datestring:this.postdata.bookdate, serviceid:this.postdata.serviceid, starttime:tsbegin, endtime:tsend}).then(success=>{
                    bookmod.saveOne(bookobj).then(success=>{this.jsonResp(success.ops[0]);},  err=>{this.jsonResp({success:false, error:err});});
            
          }, err=>{

              //alert of error caannot update roster
              
          });

          }, err=>{

          });
         
          
             
          
         
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
          
            if(!success.length)
               success=[];
            this.jsonResp(success);
        }, err=>{this.jsonResp(err);});

    }
    
    
}