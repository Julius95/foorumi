const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exports Joi for convenience on type assersions
//https://www.frisbyjs.com/
//https://ian_lin.gitbooks.io/javascript-testing/content/chapter6.html
//https://facebook.github.io/jest/docs/en/getting-started.html

frisby.globalSetup({
  request: {
    headers: {'Content-Type': 'application/json'}
  }
})
//./node_modules/.bin/jest

it('should be a teapot', function (done) {
  frisby.get('http://httpbin.org/status/418')
    .expect('status', 418)
    .done(done);
});

it ('should return a status of 200 when getting all topics', function (done) {
  frisby
    .get('https://chatroom-julius95.c9users.io/topics')
    .expect('status', 200)
    .expect('jsonTypes', '*', { // Assert *each* object in 'items' array
      "id": Joi.number().required(),
      "name": Joi.string().required(),
      "description": Joi.string().required(),
    })
    .done(done);
});

it ('should return a status of 201 when creating new topic', function (done) {
  frisby
    .post('https://chatroom-julius95.c9users.io/topics', {"name": "TESTI", "description": "TESTI"}, {json: true})
    .expect('status', 201)
    .done(done);
});

it ('Delete created Topic', function (done) {
  frisby
    .del('https://chatroom-julius95.c9users.io/topics/TESTI')
    .expect('status', 200)
    .done(done);
});