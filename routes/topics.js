var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics
//https://stackoverflow.com/questions/26066785/proper-way-to-set-response-status-and-json-content-in-a-rest-api-made-with-nodej

// GET /topics
router.get('/', function(req, res, next) {
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    Models.Topic.findAll().then(function(topics){
      res.send(topics)
    })
});

// GET /topics/:id
router.get('/:id', function(req, res, next) {
  // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
  console.log(req.params.id)
  Models.Topic.findOne(
  { 
    where : { id : req.params.id},
    include : {
      model : Models.Message,
      include : {
        model : Models.User,
        attributes: ['username']
      }
    }
  })
  .then(function(topic){
    res.status(200).jsonp(topic)
    //res.send();
  })
});


// POST /topics HUOM. tarvitsee Content-Type application/json post pyynnön yhteydessä
/*
Esim. olio
{
	"name": "Kokkailu",
	"description": "jee"
}

ja url https://chatroom-julius95.c9users.io/topics
*/
router.post('/', authentication,function(req, res, next) {
  // Lisää tämä aihealue
  const topicToAdd = req.body;
  console.log('-Saving the following topic! ' + req.body.title + ' ' + req.body.description)
  if(!topicToAdd.name || !topicToAdd.description){
    res.send(400)
    return
  }
  Models.Topic.create({
      name: topicToAdd.name,
      description: topicToAdd.description
  }).then(function(topic){
    res.status(201).jsonp(
      {
        "msg":"success",
        "NewTopic" : topic
      }
    )
  })
});

// POST /topics/:id/message
router.post('/:id/message', authentication, function(req, res, next) {
  // Lisää tällä id:llä varustettuun aihealueeseen...
  var topicId = req.params.id;
  // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var messageToAdd = req.body;
  if(!topicId || !messageToAdd || !messageToAdd.title || !messageToAdd.content){
    res.send(400)
    return;
  }
  messageToAdd.TopicId = topicId
  messageToAdd.UserId = req.session.userId
  Models.Message.create(messageToAdd).then((newMessage) => {
      res.status(201).jsonp(
      {
        "msg":"success",
        "NewMessage" : newMessage
      }
    )
  })
});

router.delete('/:name', function(req,res,next){
  console.log('###---Poistetaan topic : ' + req.params.name + ' ---###')
  Models.Topic.destroy({
    where: {
      name: req.params.name
    }
  }).then((poistettuID) => {
    res.send(200);
  })
});

module.exports = router;
