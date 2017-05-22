process.env.NODE_ENV = 'test';
let WMOD = require('../application/model/worker');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let pongo = require('pongo');
let expect = chai.expect;
let config = require('../config/systemconfig');
//pongo.init({ dbuser: config.dbuser, passwd: config.passwd, dbserver: config.dbserver, dbport: config.dbport, db: config.db, test_db:config.test_db});
let should = chai.should();
let mWorker = new WMOD();
chai.use(chaiHttp);

describe('Workers', () => {
    beforeEach((done) => {
       
        mWorker.remove({}, (err, res) => {

            done();
        });
    });

    describe('add worker to db', () => {
        it('should add a workse to the database', () => {

            let worker = { name: 'jon Baptiste', dateofbirth: '10-10-2000', services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }] };

            return mWorker.addWorker(worker).then((data) => {

                data.should.have.property('insertedId');

            });


        });
    });

    describe('Ontimes', () => {
        it('should add worktimes to a worker', () => {

            let worker = { name: 'jon Baptiste', dateofbirth: '10-10-2000', services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }] };

            return mWorker.addWorker(worker).then((data) => {
                let ontobj = { day: 1, start: '10:00', end: '12:00' };
                return mWorker.addOnTime(data.insertedId, ontobj).then((rsp) => {
                    return mWorker.getWorker(rsp._id).then((wrk) => {
                       
                        wrk.should.have.property('workinghours');
                    });


                });

            });


        });

        it('should add worktimes to a worker and then update them', () => {

            let worker = { name: 'jon Baptiste', dateofbirth: '10-10-2000', services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }] };

            return mWorker.addWorker(worker).then((data) => {
                let ontobj = { day: 1, start: '10:00', end: '12:00' };
                return mWorker.addOnTime(data.insertedId, ontobj).then((rsp) => {
                    return mWorker.addOnTime(data.insertedId, { day: 1, start: '8:00', end: '9:30' }).then((updata) => {
                        return mWorker.getWorker(updata._id).then((wrk) => {
                            
                            wrk.should.have.property('workinghours');
                        });


                    });


                });

            });


        });
    });

    describe('SPECIALHRS', () => {
        it('should add special hrs to worker', () => {
            let worker = { name: 'jon Baptiste', dateofbirth: '2017-10-10', services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }] };
            return mWorker.addWorker(worker).then((data) => {
                return mWorker.addSpecialHours(data.insertedId, { date: '2017-03-10', start: '10:00', end: '12:00' }).then((sphr) => {
                    return mWorker.getWorker(data.insertedId).then((wrk) => {
                        wrk.should.have.property('specialhours');
                        
                        wrk.specialhours[0].ontimes.length.should.be.eql(1);
                    });

                });
            });

        });

        it('should update special hrs to worker', () => {
            let worker = { name: 'jon Baptiste', dateofbirth: '2017-10-10', services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }] };
            return mWorker.addWorker(worker).then((data) => {
                return mWorker.addSpecialHours(data.insertedId, { date: '2017-03-10', start: '10:00', end: '12:00' }).then((sphr) => {
                    return mWorker.addSpecialHours(data.insertedId, { date: '2017-03-10', start: '14:00', end: '15:00' }).then((sphra) => {
                        return mWorker.getWorker(data.insertedId).then((wrk) => {
                            wrk.should.have.property('specialhours');
                            wrk.specialhours[0].ontimes.length.should.be.eql(2);
                           
                        });


                    });

                });
            });

        });
    });

    describe('getopntime', () => {


        it('should update special hrs to worker', () => {
            let worker = { name: 'jon Baptiste', dateofbirth: '2017-10-10', services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }] };
            return mWorker.addWorker(worker).then((data) => {
                return mWorker.addOnTime(data.insertedId, {day:1, start:'13:00', end:'14:00'}).then((rsp) => {
                    return mWorker.addOnTime(data.insertedId, { day: 1, start: '8:00', end: '9:30' }).then((updata) => {
                        let ontobj = { day: 1, start: '10:00', end: '12:00' };
                        return mWorker.addOnTime(data.insertedId, ontobj).then((rsp) => {


                            return mWorker.addSpecialHours(data.insertedId, { date: '2017-03-10', start: '10:00', end: '12:00' }).then((sphr) => {
                                return mWorker.addSpecialHours(data.insertedId, { date: '2017-03-10', start: '14:00', end: '15:00' }).then((sphra) => {
                                    return mWorker.getOpenTime(data.insertedId, '2017-03-10').then((day) => {
                                        day.should.have.property('ontimes');
                                        
                                    
                                    });


                                });

                            });

                        });

                    });

                });

            });
        });
    });

    });

