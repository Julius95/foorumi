var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function(req, res, next) {
  // Hae viesti tällä id:llä ja siihen liittyvät vastaukset tässä (Vinkki: findOne ja sopiva include)
  var messageId = req.params.id;
  
  Models.Message.findOne({
    where : {id : messageId},
    include : {
      model : Models.Reply,
      include : {
        model : Models.User,
        attributes: ['username']
      }
    }
  }).then((msg_chain) => {
    res.status(200).jsonp(msg_chain)
  })
});

// POST /messages/:id/reply
router.post('/:id/reply', authentication, function(req, res, next){
  // Lisää tällä id:llä varustettuun viestiin...
  var messageId = req.params.id;
  // ...tämä vastaus (Vinkki: lisää ensin replyToAdd-objektiin kenttä MessageId, jonka arvo on messageId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var replyToAdd = req.body;
  
  if(!replyToAdd || !replyToAdd.content || replyToAdd.content.length === 0)
  {
    res.send(400)
    return
  }
  
  replyToAdd.MessageId = messageId
  replyToAdd.UserId = req.session.userId
  console.log(replyToAdd)
  Models.Reply.create(replyToAdd).then((newReply) => {
      res.status(201).jsonp(
      {
        "msg":"success",
        "NewReply" : newReply
      }
    )
  })
});

module.exports = router;
