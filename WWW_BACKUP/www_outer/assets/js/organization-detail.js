chipinMemberApp.controller('organizationDetail', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc, $rootScope, $window,ngDialog){
    $scope.title = "Organization Detail";
    $scope.loggedInMemInfo = JSON.parse($window.localStorage["loggedInfo"]);
    $scope.logoUrl = urls.logoPath;
    $scope.imageUrl = urls.imagePath;
    $scope.orgProfileImgUrl = urls.orgProfileImg;
    loaderStat('show');
    //console.log("orgid "+$routeParams.orgid);
    
    
    $scope.goBackFromDetail = function(){
        //console.log("Go back");
        history.back();
    }

    /* In App open link */
    $scope.openLinkInApp = function() {
        $scope.fireUrl = $scope.info.data.orgdetail.website;
        if (!/^(f|ht)tps?:\/\//i.test($scope.fireUrl)) {
            $scope.fireUrl = "http://" + $scope.fireUrl;
        }
        
        window.open(encodeURI($scope.fireUrl), '_blank', 'location=yes');
    }

    var deferred = $q.defer();
    apiSvc.post(urls.orgDetail, {'m':$routeParams.orgid}) // change 1 to $routeParams.merid
        .then(function(result) {
        $scope.info = result;
        //console.log($scope.info);
    }, function(error) {
        deferred.reject(error);
    });
    return deferred.promise;
    //loaderStat('hide');
});