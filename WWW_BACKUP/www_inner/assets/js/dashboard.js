chipinMemberApp.controller('dashboardController', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc, $rootScope, $window,ngDialog){
    $scope.title = "Dashboard";
    $scope.loggedInMemInfo = JSON.parse($window.localStorage["loggedInfo"]);
    //console.log("member id "+$scope.loggedInMemInfo.memid);
    $scope.imageUrl = urls.imagePath;
    $scope.qrCode = urls.baseUrl+$scope.loggedInMemInfo.qrcode;
    loaderStat('show');

    var deferred = $q.defer();
    apiSvc.post(urls.dashboard, {'memid':$scope.loggedInMemInfo.memid})
    .then(function(result) {
        $scope.info = result;
    }, function(error) {
    deferred.reject(error);
    });
    return deferred.promise;

    loaderStat('hide');
});