let controller = require('simple').controller;
module.exports = class api extends controller {

    constructor() {

        super();
    }
    index() {

       /// let session = require('simple').session;
     //   session = new session(this.req, this.res);
        //session.start();
        //console.log('hih');
        //let session_id = session.get('sessionid');
        //if (session_id && (session.state == session.states.STARTED)) { console.log('hih');
          //  this.loadview('clienthome');
        //}
        //else {
            this.loadview('index');
       // }

    }
    registersuccess() {
        this.loadview('success');
    }

    createapikey()
    {
        let crypt = require('crypto');
       // let rb = crypt.randomBytes(128);
       // let sec = rb.toString('hex');
        
       // console.log(sec);
        let utils = require('simple').appGlobals.utils;
        const payload = {
          sub:"buzzo",
          iss:"freshlooks",
          iat:new Date().getTime(),
          scopes:{booking:["create, read"]}
         // exp:new Date().getTime()+((60000 * 60)*7)

    };
     
       let apiKey =  utils.jwt(payload,  utils.secret);
       
     // let tdata =  utils.verifyToken(utils.secret, apiKey);
      console.log(apiKey);


    }



}


