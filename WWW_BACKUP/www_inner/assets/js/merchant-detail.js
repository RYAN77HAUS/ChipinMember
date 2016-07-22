chipinMemberApp.controller('merchantDetail', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc, $rootScope, $window,ngDialog){
    $scope.title = "Merchant Detail";
    $scope.loggedInMemInfo = JSON.parse($window.localStorage["loggedInfo"]);
    $scope.logoUrl = urls.logoPath;
    $scope.productUrl = urls.productPath;
    $scope.imageUrl = urls.imagePath;

    loaderStat('show');
    //console.log("merid "+$routeParams.merid);
    
    
    $scope.goBackFromDetail = function(){
        //console.log("Go back");
        history.back();
    }
    
    /* In App open link */
    $scope.openLinkInApp = function() {
        $scope.fireUrl = $scope.info.data.merchant.website;
        if (!/^(f|ht)tps?:\/\//i.test($scope.fireUrl)) {
            $scope.fireUrl = "http://" + $scope.fireUrl;
        }
        window.open(encodeURI($scope.fireUrl), '_blank', 'location=yes');
    }

    var deferred = $q.defer();
    apiSvc.post(urls.merchantDetail, {'m':$routeParams.merid})
        .then(function(result) {
        $scope.info = result;
        //console.log($scope.info);
        loaderStat('hide');
    }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;

    //loaderStat('hide');
});