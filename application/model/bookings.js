let pongo = require('pongo');

module.exports =class bookings extends pongo{

    constructor()
    {
        super('bokings');
    }
    saveOne(booking)
    {
        return new Promise((resolve, reject)=>{
           this.insert(booking, (err, doc)=>{
               if(err)
                reject(err);
                else
                 resolve(doc);
           });
        });
    }
    findAllInserted()
    {
        return new Promise((resolve, reject)=>{
           
           this.findall((err,res)=>{
               if(err)
                rejecrt(err);
               else
                resolve(res);
           });
        });
    }

}