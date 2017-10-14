FoorumApp.controller('UsersController', function($scope, $location, Api){
    
    const validate = ((user, registering)=>{
        if(!user || !user.username || 0 === user.username.length || !user.password || 0 === user.password.length){
            $scope.errorMessage = "Anna kelvollinen käyttäjänimi ja salasana"
            return false
        }
        if(registering){
            if(!user.passwordRepeat || 0 === user.passwordRepeat.length){
                $scope.errorMessage = "Kirjoita salasana uudelleen"
                return false
            }
            else if(user.passwordRepeat!==user.password){
                $scope.errorMessage = "Salasana ja uudelleen kirjoitettu salasana eivät täsmää!"
                return false
            }
        }
        return true
    })
    
    $scope.register = ((user) => {
        if(!validate(user, true))
            return
        Api.register(user)
        .success((data, status, headers, config) => {
            $scope.errorMessage = false
            $location.path('/')
        })
        .error((data, status, headers, config) => {
            $scope.errorMessage = data.error;
        })
    })
    
    $scope.login = ((user) =>{
        if(!validate(user, false))
            return
        Api.login(user)
        .success((data, status, headers, config) => {
            $scope.errorMessage = false
            $location.path('/')
        })
        .error((data, status, headers, config) => {
            $scope.errorMessage = data.error;
        })
    })
});
