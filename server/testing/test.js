'use strict'
var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require('mongoose');
var should = chai.should();
describe('Insert Notes', function() {
    it('should list ALL Users on /api/users GET', function(done) {
        chai.request('http://localhost:8080')
            .get('/api/users')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should add a New Users /api/users POST', function(done) {
        chai.request('http://localhost:8080')
            .post('/api/users')
            .send({
                "name": "ivankerenbanget",
                "age": 15,
                "title": "bukuKkeren",
                "content": "sepatu"
            })
            .end(function(err, res) {
                chai.request('http://localhost:8080')
                    .get('/api/users')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        //console.log(res.body);
                        res.body[0].should.have.property('name');
                        res.body[0].should.have.property('age');
                        res.body[0].should.have.property('title');
                        res.body[0].should.have.property('content');

                        res.body[0].name.should.equal("ivankerenbanget");
                        res.body[0].age.should.equal(15);
                        res.body[0].title.should.equal("bukuKkeren");
                        res.body[0].price.should.equal("sepatu,meja");

                        done()
                    })
            });
    });
    it('should an Update Users /api/stock PUT', function(done) {
        chai.request('http://localhost:8080')
            .get('/api/users')
            .end(function(err, res) {
                console.log(res.body[0]._id);
                // console.log(res);
                chai.request('http://localhost:8080')
                    .put('/api/users/'+res.body[0]._id)
                    .send({
                      "name": "ivanggbangets",
                      "age": 15,
                      "title": "bukuivankeren",
                      "content": "buku,gula"

                    })
                    .end(function(err, res) {
                        chai.request('http://localhost:8080')
                            .get('/api/users')
                            .end(function(err, res) {
                              res.should.have.status(200);
                              res.should.be.json;
                              //console.log(res.body);
                              res.body[0].should.have.property('item_code');
                              res.body[0].should.have.property('name');
                              res.body[0].should.have.property('description');
                              res.body[0].should.have.property('price');
                              res.body[0].should.have.property('stock');
                              res.body[0].item_code.should.equal("003");
                              res.body[0].name.should.equal("Aquas");
                              res.body[0].description.should.equal("Buat Minums");
                              res.body[0].price.should.equal(3000);
                              res.body[0].stock.should.equal(2);
                                done()
                            })
                    })
            });
    });
    it('should delete a SINGLE Users on /api/stock/<id> DELETE', function(done) {
        chai.request('http://localhost:8080')
            .get('/api/users')
            .end(function(err, res) {
                chai.request('http://localhost:8080')
                    .delete('/api/users/' + res.body[0]._id)
                    .end(function(err, res) {
                        chai.request('http://localhost:8080')
                            .get('/api/users')
                            .end(function(err, res) {
                                res.should.have.status(200);
                                res.should.be.json;
                                expect(res.body).to.have.length(0);
                                //console.log(res.body).to.have.length(0);
                                done()
                            })
                    });
            });
    });
    //  it('should delete a SINGLE blob on /blob/<id> DELETE', function(done) {});
});;
