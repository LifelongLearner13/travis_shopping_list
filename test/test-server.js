var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
  var firstItemId;
    before(function(done) {
        seed.run(function() {
          Item.find({name: 'Broad beans'}, 
            function(err, items) {
              if (err) {
                return;
              }
              firstItemId = items[0]['_id'];
          });
            done();
        });
        

    });

    it('should list items on GET', function(done) {
    chai.request(app)
        .get('/items')
        .end(function(err, response) {
            should.equal(err, null);
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('array');
            response.body.should.have.length(3);
            response.body[0].should.be.a('object');
            response.body[0].should.have.property('_id');
            response.body[0].should.have.property('name');
            response.body[0]['_id'].should.be.a('string');
            response.body[0].name.should.be.a('string');
            response.body[0].name.should.equal('Broad beans');
            response.body[1].name.should.equal('Tomatoes');
            response.body[2].name.should.equal('Peppers');
            done();
        });
    });

    it('should list item with given ID on GET', function(done) {
      chai.request(app)
        .get('/items/' + firstItemId)
        .end(function(err, response) {
          should.equal(err, null);
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.be.a('object');
          response.body[0].should.have.property('_id');
          response.body[0].should.have.property('name');
          response.body[0]['_id'].should.be.a('string');
          response.body[0].name.should.be.a('string');
          response.body[0].name.should.equal('Broad beans');
          done();
        });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({
                'name': 'Kale'
            })
            .end(function(err, response) {
                should.equal(err, null);
                response.should.have.status(201);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('_id');
                response.body.name.should.be.a('string');
                response.body['_id'].should.be.a('string');
                response.body.name.should.equal('Kale');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(5);
                // storage.items[4].should.be.a('object');
                // storage.items[4].should.have.property('id');
                // storage.items[4].should.have.property('name');
                // storage.items[4].id.should.be.a('number');
                // storage.items[4].name.should.be.a('string');
                // storage.items[4].name.should.equal('Kale');
                done();
            });
    });

    it('should edit an item on PUT', function(done) {
        chai.request(app)
            .put('/items/' + firstItemId)
            .send({
                'name': 'Kale'
            })
            .end(function(err, response) {
                should.equal(err, null);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('_id');
                response.body.name.should.be.a('string');
                response.body['_id'].should.be.a('string');
                response.body.name.should.equal('Kale');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(6);
                // storage.items[1].should.be.a('object');
                // storage.items[1].should.have.property('id');
                // storage.items[1].should.have.property('name');
                // storage.items[1].id.should.be.a('number');
                // storage.items[1].name.should.be.a('string');
                // storage.items[1].name.should.equal('Kale');
                done();
            });
    });

    it('should add an item on PUT when ID is empty', function(done) {
        chai.request(app)
            .put('/items/10')
            .send({
                'name': 'Carrot'
            })
            .end(function(err, response) {
                should.equal(err, null);
                response.should.have.status(201);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('id');
                response.body.name.should.be.a('string');
                response.body.id.should.be.a('number');
                response.body.name.should.equal('Carrot');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(7);
                // storage.items[6].should.be.a('object');
                // storage.items[6].should.have.property('id');
                // storage.items[6].should.have.property('name');
                // storage.items[6].id.should.be.a('number');
                // storage.items[6].name.should.be.a('string');
                // storage.items[6].name.should.equal('Carrot');
                // storage.items[6].id.should.equal(10);
                done();
            });
    });

    it('should delete an item on DELETE', function(done) {
        chai.request(app)
            .delete('/items/' + firstItemId)
            .end(function(err, response) {
                should.equal(err, null);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('_id');
                response.body.name.should.be.a('string');
                response.body['_id'].should.be.a('string');
                response.body.name.should.equal('Kale');
                // storage.items.should.have.length(6);
                // storage.items[1].id.should.equal(2);
                done();
            });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});