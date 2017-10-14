FoorumApp.controller('ShowTopicController', function($scope, $routeParams, $location, Api){
  // Toteuta kontrolleri tähän
  console.log($routeParams.id)
  Api.getTopic($routeParams.id)
  .success((data, status, headers, config) => {
    console.log(data)
      $scope.topic = data
      $scope.messages = data.Messages
  })
  
  $scope.addMsg = ((newMsg) =>{
      console.log(newMsg)
      Api.addMessage(newMsg, $routeParams.id)
      .success((data, status, headers, config) => {
        console.log(data)
        $location.path('/messages/' + data.NewMessage.id)
      })
  })
});
