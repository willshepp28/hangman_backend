process.env.NODE_ENV = 'test';


const chai = require("express"),
    http = require("chai-http"),
    application = require("../../app"),
    knex = require("../../db/knex");


const should = chai.should();
chai.use(chaiHttp);



describe("AuthProviders API routes", function (done) {
    knex.migrate.rollback()
        .then(function () {
            knex.migrate.latest()
                .then(function () {
                    return knex.seed.run()
                        .then(function () {
                            done();
                        });
                });
        });
});



afterEach(function(done) {
    knex.migrate.rollback()
        .then(function(){
            done();
        });
});



describe("GET a user", function(){
    it("should get a user", function(done) {
        chai.request(application)
            .get("/api/v1/auth/providers")
            .end(function(error, response) {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a("array");
                done();
            });
    })
})