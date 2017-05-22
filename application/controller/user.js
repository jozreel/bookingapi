var async = require('async');
let controller = require('simple').controller;
let config = require('../../config/systemconfig');
class user extends controller {
    constructor() {
        super();
    }
    addUser() {

        var usermod = this.pongomodel('user');
        let urlenc = require('simple').urlencode;
        let urlencode = new urlenc();
        this.stripObject(this.postdata);
        this.postdata.activated = false;
        var _id = usermod.createObjectId();
        this.postdata._id = _id;

        //add the type in the postdata
        var town = this.postdata.businesstwn;
        if ((this.postdata.password !== this.postdata.passwordr) || (this.telgroupTest(this.postdata.contactnumbers) === false) || (this.validateEmail(this.postdata.email) === false)) {

            this.jsonResp({
                success: false, error: 'Fields did not pass validation test'
            });
            return;
        }
        if (town) {
            var tmodel = this.pongomodel('towns');
            tmodel.addone(town, country, (tdoc) => {
                this.postdata.businesstwn = tdoc.name;


                adduserMethod();



            });
        }
        else {
            this.adduserMethod();
        }
    }

    validateEmail(email) {
        let remail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let et = remail.test(email);
        return et;

    }
    validateTelNo(tel) {

        let reph = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
        let tt = reph.test(tel);

        return tt;
    }

    telgroupTest(tels) {
        if (tels) {
            for (let i = 0; i < tels.length; i++) {
                if (!this.validateTelNo(tels[i])) {

                    return false;
                }
            }
        }

        return true;

    }


    adduserMethod() {
        delete this.postdata.passwordr;
        let secure = require('simple').secure;

        this.postdata.password = secure.encrypt(this.postdata.password);

        let usermod = this.pongomodel('user');
        if (this.postdata.type === 'server') {
            if (this.postdata.servicename !== undefined) {
                var businessmod = this.pongomodel('businesstype');
                businessmod.addnew(this.postdata.servicename, (res) => { console.log(res); });
            }
        }
        usermod.addUser(this.postdata, (doc) => {

            var activationidlink = 'http://www.' + config.BASEURL + '/user/activate/' + doc._id + '/cli';
            var nodemailer = require('nodemailer');

            var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 25,
                auth: {
                    user: 'kwapodev@gmail.com',
                    pass: 'p8ssw0rd'
                }
            });
            var mailOptions = {
                from: 'noreply@boya.com',
                to: this.postdata.email,
                subject: 'Confirmation email from booya',
                text: 'Hello ' + this.postdata.fullname + ' this is a confirmation email sent to you to confirm your account. click this link' + activationidlink + ' to acctivate your account'
            }

            smtpTransport.sendMail(mailOptions, (error, response) => {
                if (error) {

                    this.jsonResp({ error: 'Activation email failed' });

                } else {
                    console.log("Message sent: " + response.response);
                    this.jsonResp(doc);

                }
            }); if (this.postdata.servicename !== undefined) {
                var businessmod = this.this.pongomodel('businesstype');
                businessmod.addnew(this.postdata.servicename, (res) => { console.log(res); });
            }


        });

    }

    updateUser(id) {
        let umod = pongomodel('usr');
    }


    activate(activateid, type) {
        var mod = this.pongomodel('user');
        uid = mod.createObjectId(activateid);
        mod.findAndUpdate({ _id: uid, activated: false }, { activated: true }, (obj, res) => {
            if (obj === null) {
                res.success = false;
                res.message = "ERROR USER CANNOT BE ACTIVATED";
                this.jsonResp(res);
            }
            else {
                res.success = true;
                res.message = "USER ACTIVATED";
                this.jsonResp(res);
            }


        });
    }

    getUser(uid) {
        var usermod = this.pongomodel('user');
        var id = usermod.createObjectId(uid);


        usermod.findOne({ _id: id }, { password: 0, passwordr: 0 }, {}, (err, doc) => {
            if (doc !== null) {
                doc.mobilelist = doc.mobile;
                delete doc.mobile;
                if (doc.opendaysexception !== undefined) {
                    doc.opendaysexception.sort((a, b) => {

                        return (new Date(a.specialdate) - new Date(b.specialdate));
                    });
                }
                delete doc.password;
                delete doc.passwordr;
                this.jsonResp(doc);
            }
            else {
                this.jsonResp({ success: false, error: 'user not found' });
            }
        });


    }

    getAllUser() {

        let usermod = this.pongomodel('user');
        usermod.findall((err, res) => {
            if (err)
                this.jsonResp(err);
            else {

                if (res.success == false)
                    res = []
                this.jsonResp(res);

            }

        });
    }
    loginwithsession() {
        let urlenc = require('simple').urlencode;
        let urlencode = new urlenc();
        this.stripObject(this.postdata);
        let usermod = this.pongomodel('user');
        let secure = require('simple').secure;
        let session = require('simple').session;
        session = new session(this.req, this.res);
        session.set('email', this.postdata.email);
        let sUtils = require('simple').appGlobals.utils;

        this.postdata.password = secure.encrypt(this.postdata.password);
        usermod.findSesssionidByUname(this.postdata).then(res => {
            let n_session_ids = [];

            if (res) {
                if (res.session_ids)
                    n_session_ids = session_ids.sort((a, b) => { return (a.session_id - b.session_id); });
                /* if (res.session_ids) {
                     
                     
                     
                     let fs = require('fs');
                     console.log(require('path').normalize(config.tmppath + "/sessions/" + res.session_id + '.spf'));
                     if (fs.existsSync(require('path').normalize(config.tmppath + "/sessions/" + res.session_id + '.spf'))) {
                         fs.unlinkSync(require('path').normalize(config.tmppath + "/sessions/" + res.session_id + '.spf'));
                     }
                 }*/


                session.create();

                let expDate = session.get("expires");
                let session_id = session.get('sessionid');
                if (n_session_ids.length > 0)
                    removeExpiredSessions(n_session_ids);
                n_session_ids.push({ session_id: session_id, expires: expDate });
                usermod.findAndUpdate(this.postdata, { session_id: session_id }, (err, doc) => {
                    console.log(doc);
                    if (err) {
                        this.jsonResp({ success: false, error: 'server error' });
                    }
                    else {
                        if (!doc)
                            doc = { success: false, error: 'login error' };
                        else {
                            doc.session_ids = session_id;
                            delete doc.password;
                        }
                        this.jsonResp(doc);
                    }
                });
            }
            else {
                this.jsonResp({ success: false, error: 'invalid login' });
            }
        }).catch(err => console.log(err));
    }

    login() {

        let urlenc = require('simple').urlencode;
        let urlencode = new urlenc();
        this.stripObject(this.postdata);
        let usermod = this.pongomodel('user');
        let secure = require('simple').secure;
        let sUtils = require('simple').appGlobals.utils;

        this.postdata.password = secure.encrypt(this.postdata.password);
        usermod.findOne({ email: this.postdata.email, password: this.postdata.password }, (err, res) => {
            if (err)
                ocnsole.log(err);
            else if(res === null)
            {
                this.jsonResp({error:'user not exist'});
            }
            else {
                let crypt = require('crypto');
                // let rb = crypt.randomBytes(128);
                // let sec = rb.toString('hex');

                // console.log(sec);
                let utils = require('simple').appGlobals.utils;
                const payload = {
                    sub: res.email,
                    iss: "freshlooks",
                    iat: new Date().getTime(),
                    scopes: { booking: ["create, read"] },
                    exp: new Date().getTime() + (((60000 * 60)*24) * 7)

                };

                let accessToken = utils.jwt(payload, utils.secret);
                
                this.jsonResp({success:true, accessToken:accessToken, email:res.email});

               // let tdata = utils.verifyToken(utils.secret, apiKey);

            }
        });

    }

    refreshusertoken()
    {
        let userToken = this.postdata.accesstoken;
         let utils = require('simple').appGlobals.utils;
         const decodedToken = utils.verifyToken(utils.secret,userToken);
         if(!decodedToken.error)
         {
             if(decodedToken.exp < new Date().getTime()+60000)
             {
                 decodedToken.exp = new Date().getTime() + (((60000 * 60)*24) * 7);
                 let newAccessToken =  utils.jwt(decodedToken);
                  this.jsonResp({success:true, accessToken:newAccessToken});
             }
         }
         else
         {
             this.jsonResp({error:'Expired', action:'login'});
         }


    }

    stripObject(object) {
        let urlenc = require('simple').urlencode;
        let urlencode = new urlenc();
        for (var a in object) {
            if (object[a]) {
                if (typeof object[a] == 'object')
                    this.stripObject(object[a]);
                else if (typeof object[a] === 'string')
                    object[a] = urlencode.removeTagsAndStrip(object[a]);
            }
        }


    }


}

function removeExpiredSessions(sesArrays) {
    let fs = require('fs');
    sesArrays.forEach((session) => {
        if (new Date(session.expires).getTime() < new Date().getTime()) {
            if (fs.existsSync(require('path').normalize(config.tmppath + "/sessions/" + res.session_id + '.spf'))) {
                fs.unlinkSync(require('path').normalize(config.tmppath + "/sessions/" + res.session_id + '.spf'));
            }
        }

    });


}





module.exports = user;