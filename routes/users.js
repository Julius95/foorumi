var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function(req, res, next){
  // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
  var userToAdd = req.body;
  if(!userToAdd || !userToAdd.username || 0 === userToAdd.username.length || !userToAdd.password || 0 === userToAdd.password.length){
    res.status(400).jsonp(
    {
      "error":"Käyttäjätiliin tarvitaan kelvollinen käyttäjätunnus ja salasana!"
    })
    return
  }
  
  Models.User.findOne({
  where: {
    username: userToAdd.username
  }
  })
  .then(function(user){
    if(user){
      res.status(403).jsonp(
      {
        "error":"Käyttäjätunnus on jo käytössä!"
      })
      return
    }
    Models.User.create(userToAdd).then((newUser) => {
      req.session.userId = newUser.id;
      res.status(201).jsonp(
      {
        "msg":"success",
        "NewUser" : newUser
      }
      )
    })
  });
});

// POST /users/authenticate
router.post('/authenticate', function(req, res, next){
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;
  if(!userToCheck || !userToCheck.username || 0 === userToCheck.username.length || !userToCheck.password || 0 === userToCheck.password.length){
    res.status(400).jsonp(
    {
      "error":"Käyttäjätiliin tarvitaan kelvollinen käyttäjätunnus ja salasana!"
    })
    return
  }
  Models.User.findOne({
  where: {
    username: userToCheck.username,
    password: userToCheck.password
  }
  })
  .then(function(user){
    if(user){
      req.session.userId = user.id;
      res.json(user)
    }else{
      res.status(403).jsonp(
      {
        "error":"Väärä käyttäjätunnus tai salasana!"
      })
    }
  });
});

// GET /users/logged-in
router.get('/logged-in', function(req, res, next){
  var loggedInId = req.session.userId ? req.session.userId : null;

  if(loggedInId == null){
    res.json({});
  }else{
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
     Models.User.findOne({
      where: {
        id: loggedInId
      }
      })
      .then(function(user){
        if(user){
          res.json(user)
        }else{
          res.send(404);
        }
      });
  }
});

// GET /users/logout
router.get('/logout', function(req, res, next){
  req.session.userId = null;

  res.send(200);
});

module.exports = router;
