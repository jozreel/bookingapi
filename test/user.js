process.env.NODE_ENV = 'test';
let UMOD = require('../application/model/user');
let crypt = require('simple').secure;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let pongo = require('pongo');
let config = require('../config/systemconfig');
let expect = chai.expect;

//pongo.init({ dbuser: config.dbuser, passwd: config.passwd, dbserver: config.dbserver, dbport: config.dbport, db: config.db })
let should = chai.should();
let User = new UMOD();
chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        console.log('move');
        User.remove({}, (err, res) => {
            done();
        });
    });



    describe('/GET user', () => {
        it('should get all users from the db', (done) => {
            chai.request(server).get('/user').end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();

            });

        });
    });

    // test the post user

    describe('/POST user', () => {
        it('should post a user with the basic info', (done) => {
            let user = { email: 'jozreel@bla.com', fullname: 'Jozreel Laurent', contactnumbers: ['7672255654', '4455542'], password: 'pass', passwordr: 'pass' };
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('password');
                res.body.should.have.property('_id');



                done();
            });
        });
        it('should return an error passwords do not match', (done) => {
            let user = { email: 'jozreel@bla.com', fullname: 'Jozreel Laurent', birthday: '10-9-1982', sex: 'M', contactnumbers: ['7676161629', '7676161629'], password: 'pas', passwordr: 'pass' };
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('success');
                res.body.success.should.be.eql(false);
                done();
            });
        });


        it('should return an error the email is not valid', (done) => {
            let user = { email: 'jozreel', fullname: 'Jozreel Laurent', contactnumbers: ['17676161629', '17776661666'], password: 'pass', passwordr: 'pass' };
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('success');
                res.body.success.should.be.eql(false);
                done();
            });
        });

        it('should return an error a contact number is not valid', (done) => {
            let user = { email: 'jozreel@blah.com', fullname: 'Jozreel Laurent', contactnumbers: ['1111', '76761619'], password: 'pass', passwordr: 'pass' };
            chai.request(server).post('/user').send(user).end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('error');
                res.body.should.have.property('success');
                res.body.success.should.be.eql(false);
                done();
            });
        });



    });

    describe('Login', () => {
        it('should  login a user eithout error', (done) => {
            let user = { email: 'jozreel@bla.com', fullname: 'Jozreel Laurent', contactnumbers: ['7672255654', '4455542'], password: crypt.encrypt('pass'), passwordr: 'pass' };
            User.insert(user, (err, doc) => {
                if (err)
                    console.log(err)
                else {
                  
                    let cuser = { email: 'jozreel@bla.com', password: 'pass' };
                    chai.request(server).post('/user/login').send(cuser).end((err, res) => {
                      
                        res.should.have.status(200);
                        res.should.be.a('object');

                        res.body.should.have.property('_id');
                        res.body.should.have.property('session_id');
                        done()
                    });
                }
            });
        });

    });


    describe('/GET/ID', () => {

        it('should fid a user by the id', (done) => {

            let user = { email: 'jozreel@bla.com', fullname: 'Jozreel Laurent', contactnumbers: ['7672255654', '4455542'], password: crypt.encrypt('pass'), passwordr: 'pass' };
            User.insert(user, (err, doc) => {
                if (err)
                    console.log(err)
                else
                {
                    let _id =doc.insertedId.toString();
                  
                    chai.request(server).get('/user/'+_id)
                    .send(user)
                    .end((err, res)=>{
                        console.log(err);
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body._id.should.be.eql(doc.insertedId.toString());
                        expect(res.body.password).to.not.exist;
                        done();
                    });
                }
            });
        });
    });


});


