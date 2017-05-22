process.env.NODE_ENV = 'test';
let BMOD = require('../application/model/bookings');
let crypt = require('simple').secure;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let pongo = require('pongo');
let config = require('../config/systemconfig');
let expect = chai.expect;
let utils = require('simple').appGlobals.utils;

let should = chai.should();
let User = new BMOD();
chai.use(chaiHttp);

describe('BOOKINGS', () => {
  beforeEach((done) => {
    User.remove({}, (err, res) => {
      done();
    });

  });

  describe('GETALLTEST', () => {
    it('should get an empty array from the db', (done) => {
      chai.request(server).get('/booking').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);;
        done()

      });

    });
  });

  describe('/POST/booking', () => {


    it('should post a booking to the db', () => {
      let worker = {
        name: 'jon Baptiste', dateofbirth: '10-10-2000', shifttype: 'auto', workbreak: 10,
        services: [{ name: 'haircut', serviceid: '1', duration: 40 }, { name: 'shave', serviceid: '2', duration: 40 }]
      };
      let mWorker = require('../application/model/worker');
      mWorker = new mWorker();
      return mWorker.addWorker(worker).then((data) => {
        return mWorker.addOnTime(data.insertedId, { day: 1, start: '13:00', end: '16:00' }).then((rsp) => {
          return mWorker.addOnTime(data.insertedId, { day: 1, start: '8:00', end: '12:00' }).then((updata) => {
            let ontobj = { day: 1, start: '20:00', end: '23:00' };
            return mWorker.addOnTime(data.insertedId, ontobj).then((rsp) => {

              let booking = { starttime: '10:00', bookdate: '2017-03-06', clientid: '1234', serviceid: 1, businessid: '998765', workerid: data.insertedId };
              chai.request(server).post('/booking').send(booking).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body._id.should.be.a('string');


              
              });
                 let booking1 = { starttime: '11:00', bookdate: '2017-03-06', clientid: '1234', serviceid: 1, businessid: '998765', workerid: data.insertedId };
  
                chai.request(server).post('/booking').send(booking1).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('_id');
                res.body._id.should.be.a('string');


              
              });
            });
          });
        });


      });

    });
  });



});