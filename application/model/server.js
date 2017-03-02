let pongo = require('pongo');

module.exports = class server extends pongo {
    constructor() {
        super('server');
    }
    saveServer(servobj)
    {
      return new Promise((resolve, Reject)=>{
          this.insert(servobj, (err,doc)=>{
            if(err)
               Reject(err);
            else
              resolve(doc.ops[0]);
          });
      });
    }
   
}