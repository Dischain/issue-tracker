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

  const issueUpdateData = { 
    title: 'updated title'
  };

  let userId, issueId;

  after((done) => {   
    let serv = chai.request(server);
    serv
    .delete('/users')
    .end((err, res) => {
      serv
      .delete('/issues')
      .end(() => done());
    });
  });

  describe('CRUD issue', () => {
    it('Should CRUD issue when authorised', (done) => {
      const agent = chai.request.agent(server);
      
      agent
      .post('/register')
      .send(credentials)
      .end((err, res) => {
        userId = res.body.userId;

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
            issueId = res.body.issueId;
            agent
              .put('/issues/' + issueId)
              .send(issueUpdateData)
              .end((err, res) => {
                res.should.have.status(201);
                expect(res.body.title).to.equal(issueUpdateData.title);
                agent
                  .del('/issues/' + issueId)
                  .end((err, res) => {
                    res.should.have.status(200);
                     agent
                       .get('/issues')
                       .end((err, res) => {
                          res.should.have.status(200);
                          res.body.forEach((item) => {
                            expect(item.issueId).not.equal('updated title');
                          });
                          done();
                       });                    
                   });
              });            
          });
        });
      });
    });

    it('Should not CRUD issue when not authorised', (done) => {
      chai.request(server)
      .post('/issues')  
      .send(issueData)
      .end((err, res) => {
        res.should.have.status(403);

        chai.request(server)
        .put('/issues/' + issueId)
        .send(issueUpdateData)
        .end((err, res) => {
          res.should.have.status(403);

          chai.request(server)
          .del('/issues/' + issueId)
          .end((err, res) => {
            res.should.have.status(403);

            done();
          });
        });        
      });
    });
  });
});