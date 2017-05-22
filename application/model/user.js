var pongo = require('pongo');
module.exports = class user extends pongo {
    constructor() {
        super('user');
    }
    addUser(obj, callback) {

        this.findOne({ _id: obj._id }, {}, {}, (doc) => {
            if (doc == null) {
                if(obj.type === 'server')
                {
                  obj.opendays =[];
                  obj.specialdays =[];
                }
                this.insert(obj, (err,docins) => {
                
                    callback(docins.ops[0]);
                });
            }
            else {
                callback({ success: false, message: 'user already exist' });
            }
        });

    }
    saveUser(id, obj, callback) {
        obj._id = id;
        this.insertOrUpdate(obj, callback);
    }

    updateUser(id, userobj) 
    {
       
        return new Promise((resolve, reject)=>{
               this.findAndUpdateByID(id, userobj,(err, res)=>{
                  if(err)
                    reject(err);
                   else
                    resolve(userobj);
               });
        });
    }

    updateOpenHours(id, openday)
    {
        return new Promise((resolve, reject)=>
        {
            this.updateone({_id:id, 'opendays.day':this.req.postdata.day}, {'opendays.$':openday},(err,doc)=>
            {
                if(err)
                 reject(err);
                else
                 resolve(doc);
            }
           );
            
        });
        
    }

    findSesssionidByUname(details)
    {
        console.log(details);
        return new Promise((res, rej)=>{
            this.findOne(details, {session_id:true},(err, doc)=>{
               if(err)
                 rej(err);
               else
                 res(doc);
            });
 
        });
    }
}


