chipinMemberApp.controller('loginController', function($scope, $q, $http, $cookieStore, $location, $routeParams , apiSvc, $rootScope,$window,ngDialog){
    mSearchItem = {};
    oSearchItem = {};
    $scope.title = "Login";
    loaderStat('show');
    $scope.fields = {};
    $scope.loginMember = function(fields){
        loaderStat('show');
        var deferred = $q.defer();
        fields.login = "login";
        apiSvc.post(urls.login, fields)
        .then(function(result) {
        $scope.info = result;
        if( $scope.info.success )
        {   
            $window.localStorage["isLoggedIn"] = '1';
            $window.localStorage["loggedInfo"] = JSON.stringify($scope.info.data);
            $location.path('/dashboard');
        }
        else
        {
            (function(alert) { // anonymous function redefining the "alert"
                alert("Username or Password is wrong!");
            })($rootScope.myFunkyAlert);
        }

        }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;
    } 
    loaderStat('hide');
});