FoorumApp.controller('ShowMessageController', function($scope, $routeParams, Api){
  // Toteuta kontrolleri tähän
  Api.getMessage($routeParams.id)
  .success((data, status, headers, config) => {
      console.log(data)
      $scope.message = data
      $scope.replies = data.Replies
  })
  
  $scope.addReply = ((reply) => {
    Api.addReply(reply, $routeParams.id)
    .success((data, status, headers, config) => {
        //console.log($scope.userLoggedIn)
        data.NewReply.User = $scope.userLoggedIn
        $scope.replies.push(data.NewReply)
      })
  })
});
