'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/app.js');

const expect = chai.expect;

chai.use(chaiHttp);
const should = chai.should();

describe('Issues Routes', () => {
  const credentials = {
    userName: 'testuser1',
    email: 'testuser1@ya.ru',
    password: 'pas'
  };

  const issueData = {
    status: 'new',
    title: 'some test title'
  };

  let userId;

  after((done) => {   
    let serv = chai.request(server)
    serv
    .delete('/users')
    .end((err, res) => {
      serv
      .delete('/issues')
      .end(() => done());
    });
  });

  describe('Post issue', () => {
    it('Should post new issue', (done) => {
      const agent = chai.request.agent(server);
      
      agent
      .post('/register')
      .send(credentials)
      .end((err, res) => {
        userId = res.body.userId;
        console.log('userId: ' + userId)
        agent
        .post('/login')
        .send(credentials)
        .end((err, res) => {
          agent
          .post('/issues')
          .send(issueData)
          .end((err, res) => {
            expect(res.body.status).to.equal(issueData.status);
            expect(res.body.title).to.equal(issueData.title);
            expect(res.body.ownerId).to.equal(userId);
            res.should.have.status(201);            
            done();
          });
        });
      });
    });
  });
});