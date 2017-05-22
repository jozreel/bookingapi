let pongo = require('pongo');

module.exports = class bookings extends pongo {

    constructor() { 
        super('bokings');
    }
    saveOne(booking) {
        return new Promise((resolve, reject) => {
            this.find({ date: booking.date }, (err, res) => {
               
                if(res.length)
                {
                  res.sort((a, b) => { return a.starttime - b.starttime });
                }
                  
                else res = [];
                let unavaible = false;
                for (var i = 0; i < res.length; i++) {
                    let book = res[i];
                    if ((booking.starttime >= book.starttime && booking.starttime <= book.endtime) || (booking.endtime >= book.starttime && booking.endtime <= book.endtime)) {
                        unavaible = true;
                        break;
                    }


                }
                if (unavaible) {
                    reject({ error: 'this time is no longer available', status: false });
                }
                else {

                    this.insert(booking, (err, doc) => {
                        if (err)
                            reject(err);
                        else
                            resolve(doc);
                    });

                }

            });

        });
    }
    findAllInserted() {
        return new Promise((resolve, reject) => {

            this.findall((err, res) => {
                if (err)
                    rejecrt(err);
                else
                    resolve(res);
            });
        });
    }

}