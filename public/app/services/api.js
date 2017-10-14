FoorumApp.service('Api', function($http){
  // Aihealueiden Api-funktiot
  this.getTopics = function(){
    return $http.get('/topics')
    /*return new Promise((resolve, reject) => {
      $http.get('/topics')
     .success(function(data, status, headers, config){
       console.log('Palvelin lähetti vastauksen!');
       console.log(data);
       resolve(data);
     })
     .error(function(data, status, headers, config){
       console.log('Jotain meni pieleen...');
       reject(data)
     });
    })*/
    // Hae kaikki aihealueet toteuttamasi Api:n polusta /topics
  }
  
  this.getTopic = function(id){
    // Hae annetulla id:llä varastettu aihealue toteuttamasi Api:n polusta /topics/:id
    return $http.get('/topics/' + id)
  }
  
  this.addTopic = function(topic){
    // Lisää annettu aihealue lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /topics
    console.log(topic)
    return $http.post('/topics', topic)
  }

  // Viestien Api-funktiot
  this.getMessage = function(id){
    // Hae annetulla id:llä varustettu viesti toteuttamasi Api:n polusta /messages/:id
    return $http.get('/messages/' + id)
  }
  this.addMessage = function(message, topicId){
    return $http.post('/topics/' + topicId + '/message', message)
    // Lisää annettu viesti lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /topics/:topicId/message
  }

  // Vastausten Api-funktiot /messages/:id/reply
  this.addReply = function(reply, messageId){
    console.log(reply)
    return $http.post('/messages/' + messageId + '/reply', reply)
    // Lisää annettu vastaus lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /messages/:messageId/reply
  }

  // Käyttäjän Api-funktiot
  this.login = function(user){
    // Tarkista käyttäjän kirjautuminen lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /users/authenticate
    return $http.post('/users/authenticate', user)
  }
  this.register = function(user){
    // Lisää annettu käyttäjä lähettämällä POST-pyyntö toteuttamasi Api:n polkuun /users
    return $http.post('/users', user)
  }
  this.getUserLoggedIn = function(){
    // Hae kirjautunut käyttäjä toteuttamasi Api:n polusta /users/logged-in
    return $http.get('/users/logged-in');
  }
  this.logout = function(){
    return $http.get('/users/logout');
  }
});
