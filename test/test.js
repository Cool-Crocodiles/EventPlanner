let express = require('express');
let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const Users = require('../database-mongo/index.js');

chai.use(chaiHttp);

describe('POST /events', () => {
      it('should return an array of events to the client', (done) => {
        let bodyObj = {
          eventSelected: 'concerts',
          eventLocation: 'Las Vegas',
          eventDate: '07-04'
        };

        chai.request('http://localhost:3000')
            .post('/events')
            .send(bodyObj)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.equal(0);
                if (err) {
                  done(err);
                }
            });
      done();
      });
});

describe('POST /selected', () => {
      it('should send a response to the client with statusCode = 200',
        (done) => {
        let bodyObj = {
          userName: 'David',
          saveDate: '07-04',
          saveSelection: '[{location:Las Vegas},{concert:Celine Dion, at Caesars Palace.}]'
        };

        chai.request('http://localhost:3000')
          .post('/selected')
          .send(bodyObj)
          .end((err, res) => {
              res.should.have.status(200);
              if (err) {
                done(err);
              }
          });
      done();
      });
});

describe('New entry in database', () => {
      it('should have a new entry in the database with {userName, date, events', (done) => {
          Users.find({userName: 'David',
            date: '07-04',
            events: '[{location:Las Vegas},{concert:Celine Dion, at Caesars Palace.}]'}).exec((err, result) => {
              if (err) {
                done(err);
              }
              result.length.should.not.equal(0);
          });
      done();
      });
});

describe('POST /retrieve', () => {
      it('should send a response to the client with statusCode = 200',
        (done) => {
        let bodyObj = {userName: 'David'};
        chai.request('http://localhost:3000')
          .post('/retrieve')
          .send(bodyObj)
          .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
          });
      done();
      });
});

describe('POST /delete', () => {
      it('should send a response to the client with statusCode = 200',
        (done) => {
        let bodyObj = {userName: 'David'};
        chai.request('http://localhost:3000')
          .post('/delete')
          .send(bodyObj)
          .end((err, res) => {
              if (err) {
                done(err);
              }
              res.should.have.status(200);
          });
      done();
      });
      after(function() {
        Users.deleteMany({userName: 'David',
            date: '07-04',
            event: '[{location:Las Vegas},{concert:Celine Dion, at Caesars Palace.}]'}).exec((err, result) => {
              if (err) {
                throw err;
              }
            });
      });
});
