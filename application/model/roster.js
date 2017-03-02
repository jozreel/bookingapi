let pongo = require('pongo');
let utils = require('simple').appGlobals.utils;

module.exports = class roster extends pongo {
    constructor() {
        super('roster');
    }
    updateWorkerTimesAuto(wobj) {
        return new Promise((resolve, reject) => {

            let serv = require('./server');
            serv = new serv();
            serv.findOne({ _id: wobj.workerid }, (err, res) => {
                let services = res.services.sort((a, b) => { return a.serviceid - b.serviceid; });
                let currentService = utils.arrayFind(services, wobj.serviceid, 'serviceid');
                let shifttype = res.shifytype;
                let workbreak = 0;
                let smallestTime = 0;
                if (shifttype === 'auto')
                {
                    workbreak = res.workbreak;
                    smallestTime = res.services.sort((a,b)=>{return a.duration - b.duration})[0].duration + workbreak;
                


                this.findOne({ _id: this.createObjectId(wobj.workerid),date:wobj.date}, (err, doc) => {
                     let times = [];
                    if (doc && doc.times) {
                       times = doc.times;
                    }
                    if(times.length === 0)
                    {
                         let worker = require('./worker');
                         times =  worker.getOpenTimes(wobj.workerid, wobj.date).ontimes;
                        
                    }
                    
                    if(times.length  >0)
                    {
                        for(var i=0; i<times.length; i++)
                        {
                            if(times[i].start <= wobj.starttime && times[i].end >=wobj.endtime)
                            {
                                    if(wobj.starttime > times[i].start)
                                    {
                                        let newtimeobj ={};
                                        let newTimeAfter={};
                                        let endbefore =  wobj.starttime  - workbreak *60000;
                                        if((times[i].start - endbefore) > smallestTime)
                                        {
                                            newtimeobj.start = times[i].start;
                                            newtimeobj.end = endbefore;
                                        }
                                        let startafter = wobj.endtime +workbreak*60000;
                                        if((times[i].end - startafter) > smallestTime )
                                        {
                                            newTimeAfter.start = startafter;
                                            newTimeAfter.end = times[i].end;

                                        }
                                    }
                                    else
                                    {
                                        let newstart = wobj.endtime + workbreak * 60000;
                                        if((times[i].end - newstart) > smallestTime)
                                           newTimeAfter = {start:newstart, end:times[i].end};
                                    }
                                    times.splice(i,1);

                                    break;
                            }
                        }
                    }
                   
                    





                });

                }//enf if auto


            });



        });




    }
}
