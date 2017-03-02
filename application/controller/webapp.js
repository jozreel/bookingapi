let controller = require('simple').controller;
module.exports = class webapp extends controller {
    constructor() {

        super();
    }
    index() {

        let session = require('simple').session;
        session = new session(this.req, this.res);
        session.start();
        console.log('hih');
        let session_id = session.get('sessionid');
        if (session_id && (session.state == session.states.STARTED)) { console.log('hih');
            this.loadview('clienthome');
        }
        else {
            this.loadview('index');
        }

    }
    registersuccess() {
        this.loadview('success');
    }
}


