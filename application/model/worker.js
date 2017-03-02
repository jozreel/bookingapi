let pongo = require('pongo');
let utils = require('simple').appGlobals.utils;

module.exports = class worker extends pongo {
    constructor() {
        super('worker');
       
    }

    addWorker(aworker) {
       
        return new Promise((resolve, reject) => {
            this.insert(aworker, (err, res) => {
                 
                if (err)
                {
                   
                    reject(err);
                }
                else
                {
                    
                    resolve(res);
                }
            });
        });
    }
    getWorker(id) {
        let _id = this.createObjectId(id);
        return new Promise((resolve, reject) => {
            this.findById(_id, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res[0]);
            })
        });
    }

    //get the times the worker is available for booking  days are structured like this
    //a day consist of a date and an array of time intervals that the worker is available for bookings.
    getOpenTime(id, date) {
        return new Promise((resolve, reject) => {
            let _id = this.createObjectId(id);
            let timest = utils.timeStampFromDateString(date);
            this.findOne({ _id: _id }, (err, res) => {
                if (err) reject(err);

                if (res) {
                    var day;
                    if (res.specialhours) {
                        let sph = res.specialhours.sort((a, b) => {
                            return (a.date - b.date);
                        });
                        day = utils.arrayFind(sph, timest, 'date');
                    }
                    if (!day) {
                        let day = timest.getDay();
                        let opensort = res.workinghours.sort((a, b) => {
                            return a.day - b.day;

                        });

                        day = utils.arrayFind(opensort, day, 'day');
                    }

                }
                if (day)
                    resolve(day);
                else
                    reject({ error: 'day not found', success: false })

            }

            );

        });


    }
    addOnTime(wrkid, tobj) {
        let id = this.createObjectId(wrkid);
        //use an abitrary  date just to convert to miliseconds
        tobj.start = utils.dateTimeFromTime(tobj.start, '2017-1-1').getTime();
        tobj.end =   utils.dateTimeFromTime(tobj.end, '2017-1-1').getTime();
        return new Promise((resolve, reject) => {
            this.findOne({ _id: id }, { workinghours: { $elemMatch: { day: tobj.day } } }, (err, res) => { 
                if (res.workinghours) {
                    let ont = res.workinghours[0].ontimes;
                    let found = false;
                    ont.forEach((tm) => {
                        if ((tobj.start >= tm.start && tobj.start <= tm.end) || (tobj.end >= tm.start && tobj.end <=tm.end)) {
                            found = true;
                            reject({ error: 'time with range exist', success: false });
                        }

                    });
                    if (found)
                        return;
                    
                    ont.push({start:tobj.start, end:tobj.end});
                    this.findAndUpdate({ _id: id, 'workinghours.day': tobj.day }, { 'workinghours.$.ontimes': ont }, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve(doc);

                    });

                }
                else {
                    let newtime = { ontimes:[{start: tobj.start, end: tobj.end}], day: tobj.day  };
                    this.findAndUpdate({ _id: id }, { workinghours: [newtime]}, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve(doc);

                    });
                }

            });
        });



    }

    addSpecialHours(_id, sph) {
        let id = this.createObjectId(_id);
        sph.start = utils.dateTimeFromTime(sph.start, sph.date).getTime();
        sph.end = utils.dateTimeFromTime(sph.end, sph.date).getTime();
      
        let timest = utils.timeStampFromDateString(sph.date);
       
        return new Promise((resolve, reject) => {
            this.findOne({ _id: id }, { specialhours: { $elemMatch : { date: timest } } }, (err, res) => {
               
                if (res.specialhours) {
                    let found= false;
                    
                    res.specialhours[0].ontimes.forEach((spec) => {
                        if ((sph.start >= spec.start && sph.start <= spec.end) || (sph.end >= spec.start && sph.end <=spec.end)) {
                            found = true;
                            reject({ err: 'special hour already exist', success: false });
                        }


                    });
                    if (found)
                        return;
                    let specArr = res.specialhours[0].ontimes;
                    specArr.push({ start: sph.start, end: sph.end });
                    this.updateone({ _id: id, 'specialhours.date': timest }, { 'specialhours.$.ontimes': specArr }, (err, res) => {
                        if (err)
                            reject(err);
                        else
                            resolve(res);
                    });

                }
                else {
                    let newSpec = [{ date: timest, ontimes: [{ start: sph.start, end: sph.end }] }];
                    this.updateone({_id:id}, {specialhours: newSpec},(err, res)=>{
                        if(err)
                          reject(err);
                        else
                         resolve(res);
                    });
                }


            });

        });

    }
   
}
