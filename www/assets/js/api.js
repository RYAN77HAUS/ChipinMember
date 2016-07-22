var api = angular.module('api', []);
api.factory("apiSvc", ["$http", "$q", "$rootScope", "$window", function($http, $q, $rootScope, $window) {


        function post(uri, data) {

            var deferred = $q.defer();


            data.auth_token = "4yk99qA6G1B5YIAcRkauTD5kPuBNuztiMKYfHloE";
            data.type = "member";
//            if ($rootScope.getUserToken()) {
//                data.access_token = $rootScope.getUserToken();
//            }

            /*if ($rootScope.getUserID()) {
                data.userID = $rootScope.getUserID();
            }*/


            loaderStat('show');
            //console.log('sending data');
            //console.log("data "+JSON.stringify(data));
            //console.log("uri "+uri);
            $.ajax({type: "POST", url: urls.apiUrl + uri, data: data, dataType: 'json', success: function(result) {
                    //console.log('received data');
                    //console.log(JSON.stringify(result));
                    loaderStat('hide');
                    if (result.success == 'false') {
                        /*(function(alert) { // anonymous function redefining the "alert"
                            alert("Received error code 2. AccessToken sent is: " + data.access_token);
                        })($rootScope.myFunkyAlert);
                        $window.localStorage["userInfo"] = null;
                        userInfo = null;
                        $rootScope.goTo('/');*/
                        return false;
                    }
                    deferred.resolve(result);

                }, error: function(error) {
                    loaderStat('hide');
                    //console.log(JSON.stringify(error));
                    deferred.reject(error);

                }})

            return deferred.promise;
        }
        ;

        return {
            post: post
        };
    }]);


