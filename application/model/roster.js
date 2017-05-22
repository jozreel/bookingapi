let pongo = require('pongo');
let utils = require('simple').appGlobals.utils;

module.exports = class roster extends pongo {
    constructor() {
        super('roster');
    }
    updateWorkerTimesAuto(wobj) {  
        return new Promise((resolve, reject) => {
           
            let serv = require('./worker');
            serv = new serv();
            serv.findOne({ _id: this.createObjectId(wobj.workerid) }, (err, res) => {
             
                let services = res.services.sort((a, b) => { return a.serviceid - b.serviceid; });
               
                let currentService = utils.arrayFind(services, wobj.serviceid, 'serviceid');
                
                let shifttype = res.shifttype;
                let workbreak = 0;
                let smallestTime = 0;
                if (shifttype === 'auto')
                {
                   
                    workbreak = res.workbreak * 60000;
                    
                    smallestTime = (res.services.sort((a,b)=>{return a.duration - b.duration})[0].duration * 60000) + workbreak;
                   
               
               
                this.findOne({workerid: wobj.workerid,date:wobj.date}, (err, doc) => {
                 
                    serv.getOpenTime(wobj.workerid, wobj.datestring).then(res=>{
                      
                        let times =  res.ontimes;
                        
                         
                        if(doc && doc.times)
                           times = doc.times;
                   
                    if(times.length  >0)
                    {
                        
                        for(var i=0; i<times.length; i++)
                        {
                   
                            if(times[i].start <= wobj.starttime && times[i].end >=wobj.endtime)
                            {
                               
                                
                                  let newtimeobj ={};
                                  let newTimeAfter={};
                                    if(wobj.starttime > times[i].start)
                                    {
                                         
                                        let endbefore =  wobj.starttime  - workbreak;
                                       
                                        if((endbefore - times[i].start) > smallestTime)
                                        {
                                            newtimeobj.start = times[i].start;
                                            newtimeobj.end = endbefore;
                                        }
                                        let startafter = wobj.endtime +workbreak;
                                        if((times[i].end - startafter) > smallestTime )
                                        {
                                            newTimeAfter.start = startafter;
                                            newTimeAfter.end = times[i].end;

                                        }
                                    
                                    }
                                    else
                                    {
                                        let newstart = wobj.endtime + workbreak;
                                        if((times[i].end - newstart) > smallestTime)
                                           newTimeAfter = {start:newstart, end:times[i].end};
                                    }

                                    times.splice(i,1);
                                    if(Object.keys(newtimeobj).length >0)
                                      times.push(newtimeobj);
                                    if(Object.keys(newTimeAfter).length > 0)
                                      times.push(newTimeAfter);
                                    
                                    break;
                            }
                        }
                    }
               /*     times.forEach((time)=>{
                        console.log(new Date(time.start).toLocaleTimeString(), new Date(time.end).toLocaleTimeString(), 'test');
                        
                    })*/
                    this.findAndUpdate({workerid: wobj.workerid ,date:wobj.date},{times:times},true,(err,resi)=>{
                        if(err)
                          reject(err);
                        else 
                          resolve(resi);

                         

 
                    });
              
                }, err=>{
                       
                        reject(err);
                    });
                    
                    
                   
                    





                });

                }//enf if auto


            });



        });




    }
}
