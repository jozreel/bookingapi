process.env.NODE_ENV = 'test';
let BMOD = require('../application/model/bookings');
let crypt = require('simple').secure;
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let pongo = require('pongo');
let config = require('../config/systemconfig');
let expect = chai.expect;
let utils =  require('simple').appGlobals.utils;
console.log(utils);
let should = chai.should();
let User = new BMOD();
chai.use(chaiHttp);

describe('BOOKINGS', ()=>{
  beforeEach((done)=>{
    User.remove({}, (err, res) => {
            done();
        });

  });

describe('GETALLTEST', ()=>{
  it('should get an empty array from the db', (done)=>{
      chai.request(server).get('/booking').end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);;
          done()

      });
    
  });
});

describe('/POST/booking', ()=>{
    let booking = {starttime:'10:00', endtime:'12:00', bookdate:'2017-03-03', clientid:'1234', businessid:'998765'};
    it('should post a booking to the db', (done)=>{
    
     chai.request(server).post('/booking').send(booking).end((err, res)=>{
         res.should.have.status(200);
         res.body.should.have.property('_id');
         res.body._id.should.be.a('string');
         
         done();
     })
    }); 
});

describe('utils', ()=>{
let obj =[{name:'jozreel', age:34},{name:'dwane', age:14},{name:'joelle', age:2}];
obj.sort((a, b)=>{
   return  a.age - b.age;
});

  it('should find item in sorted array', (done)=>{
    let res = utils.arrayFind(obj, 2, 'age');
    console.log(res);
    expect(res.age).to.be.eql(2);
    done();

  });
});

});