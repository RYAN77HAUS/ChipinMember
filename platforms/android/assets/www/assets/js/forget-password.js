chipinMemberApp.controller('forgetPasswordController', function($scope, $q, $http, $cookieStore, $location, $routeParams , apiSvc, $rootScope,$window,ngDialog){
    $scope.title = "Forget Password";
    loaderStat('show');
    $scope.fields = {};
    $scope.forgetPswd = function(fields){
        loaderStat('show');
        var deferred = $q.defer();
        
        apiSvc.post(urls.forgetPassword, fields)
        .then(function(result) {
        $scope.info = result;
        if( $scope.info.success )
        {   
            (function(alert) { // anonymous function redefining the "alert"
                alert($scope.info.error);
            })($rootScope.myFunkyAlert);
        }
        else
        {
            (function(alert) { // anonymous function redefining the "alert"
                alert($scope.info.error);
            })($rootScope.myFunkyAlert);
        }

        }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;
    } 
    loaderStat('hide');
});