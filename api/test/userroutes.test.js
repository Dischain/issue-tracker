'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/app.js');

const expect = chai.expect;

chai.use(chaiHttp);
const should = chai.should();

describe('User Routes', () => {
  after((done) => {   
    chai.request(server)
    .delete('/users')
    .end(() => done());
  });

  const credentials = {
    userName: 'testuser1',
    email: 'testuser1@ya.ru',
    password: 'pas'
  };

  let userId;

  describe('Register', () => {
    it('Should register new user', (done) => {
      chai.request(server)
      .post('/register')
      .send(credentials)
      .end((err, res) => {
        expect(res.body.userName).to.equal(credentials.userName);
        expect(res.body.email).to.equal(credentials.email);
        res.body.should.have.property('userId');
        res.should.have.status(201);

        userId = res.body.userId;

        done();
      });
    });

    it('Should return user data for created user userId', (done) => {
      const userPath = '/users/' + userId;

      chai.request(server)
      .get(userPath)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.userName).to.equal(credentials.userName);
        expect(res.body.email).to.equal(credentials.email);
        expect(res.body.userId).to.equal(userId);
        done();
      });
    });
  });

  describe('Login', () => {
    it('Should login user', (done) => {
      chai.request(server)
      .post('/login')
      .send(credentials)
      .end((err, res) => {
        res.should.have.status(200);
        expect(res.body.length).to.equal(1);
        expect(res.body[0].userName).to.equal(credentials.userName);
        expect(res.body[0].email).to.equal(credentials.email);
        expect(res.body[0].userId).to.equal(userId);
        done();
      });
    });

    it('Should not login user with invalid credentials', () => {
      chai.request(server)
      .post('/login')
      .send({ email: 'invalid', password: 'invalid', userName: 'invalid'})
      .end((err, res) => {
        res.should.have.status(403);
      });
    });
  });
});
