FoorumApp.controller('TopicsListController', function($scope, $location, Api){
    Api.getTopics().success((data, status, headers, config) => {
        console.log(data)
        $scope.topics = data
    })
    Api.getTopic(6)
    .success((data, status, headers, config) => {
        console.log(data)
    })
    
    $scope.addNewTopic = ((topic) => {
      Api.addTopic(topic)
      .success((data, status, headers, config) => {
          $location.path('/topics/' + data.NewTopic.id)
      })
    })
});
