var chipinMemberApp = angular.module('chipinMemberApp', ['ngRoute','ngCookies','api','MerchantOrgApi','ngDialog','afkl.lazyImage']);

chipinMemberApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider,$locationProvider) {
   $routeProvider.
    when('/login', {
       templateUrl: 'views/login.html',
       controller: 'loginController'
   })
   .when('/register', {
       templateUrl: 'views/register.html',
       controller: 'RegisterController'
   })
   .when('/forget-password', {
       templateUrl: 'views/forget-password.html',
       controller: 'forgetPasswordController'
   })
   .when('/edit-profile', {
       templateUrl: 'views/edit-profile.html',
       controller: 'editProfileController'
   })
   .when('/organizations-maps-list', {
       templateUrl: 'views/organizations-maps-list.html',
       controller: 'organizationsListMapsController'
   })
   .when('/organizations-maps', {
       templateUrl: 'views/organizations-maps.html',
       controller: 'organizationsMapsController'
   })
   .when('/organizations-detail/:orgid', {
       templateUrl: 'views/organizations-detail.html',
       controller: 'organizationDetail'
   })
   .when('/merchants-maps-list', {
       templateUrl: 'views/merchants-maps-list.html',
       controller: 'merchantsMapsListController'
   })
   .when('/merchants-maps', {
       templateUrl: 'views/merchants-maps.html',
       controller: 'merchantsMapsController'
   })
   .when('/merchants-detail/:merid', {
       templateUrl: 'views/merchants-detail.html',
       controller: 'merchantDetail'
   })
   .when('/dashboard', {
       templateUrl: 'views/dashboard.html',
       controller: 'dashboardController'
   })
   .when('/logout', {
       templateUrl: 'views/logout.html',
       controller: 'logoutController'
   }).
   otherwise({
       redirectTo: '/login'
   })
  }]).run(function($rootScope,$window,validateStorage,ngDialog) { 
    loaderStat('show');
    
    $rootScope.$on('$viewContentLoaded', function(){
        //Here your view content is fully loaded !!
        //animateContainer();
    }); 
    
    $rootScope.$on('$routeChangeSuccess', function () {
        //console.log("test");  
        $( "html,body" ).scrollTop(0);
        validateStorage($rootScope);
    });

    /* new funky alert */
    $rootScope.myFunkyAlert = function(msg) {
        /* here goes your funky alert implementation */
        setTimeout(function(){
          $rootScope.alertMessage = msg;
            ngDialog.open({
                template: 'views/alert-popup.html',
                controller: "alertDialogCtrl",
            });
        },300);
    }
    
    
}).factory('validateStorage', function( $cookieStore, $http, $location,$window){
    return function(scope) {
       //console.log("Path "+$location.path());

       if($window.localStorage["isLoggedIn"]) // If user is logged in redirect to Dashboard page
       {
           //console.log("Storage Set");
           if($location.path() == "/login")
           {
              $('.showMenuIfLogin').show();
              //console.log("Dashboard");
              $location.path('/dashboard');
           }
           else
           {
                $('.showMenuIfLogin').show();
           }
           
           // Do Something
       }
       else
       {
        var array = ["forget-password","merchants-maps-list","merchants-maps","merchants-detail"];
        var parts = $location.path().split('/');
          if(array.indexOf(parts[1]) > -1)
          {
             //console.log("foreget password");
          }
          else
          {
            //console.log("LOGIN");
            $('.showMenuIfLogin').hide();
            $location.path('/login');
          }  
          
       }
    }
}).directive('activeLink', ['$location', function (location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, controller) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            path = path.substring(1); //hack because path does not return including hashbang
            scope.location = location;
            scope.$watch('location.path()', function (newPath) {
                if (path === newPath) {
                    element.addClass(clazz);
                } else {
                    element.removeClass(clazz);
                }
            });
        }
    };
}]).filter('escape', function() {
  return window.encodeURIComponent;
});

// Show hide the loader
function loaderStat(stat){
    if(stat =='show'){ 
        $('.page-loader').show();
    }else{
        $('.page-loader').hide();
    }
}

/*function clearCache() {
    navigator.camera.cleanup();
}

var retries = 0;
function onCapturePhoto(fileURI) {
    var win = function (r) {
        clearCache();
        retries = 0;
        alert('Done!');
    }

    var fail = function (error) {
        if (retries == 0) {
            retries ++
            setTimeout(function() {
                onCapturePhoto(fileURI)
            }, 1000)
        } else {
            retries = 0;
            clearCache();
            alert('Ups. Something wrong happens!');
        }
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.params = {}; // if we need to send parameters to the server request
    var ft = new FileTransfer();
    ft.upload(fileURI, encodeURI("http://host/upload"), win, fail, options);
}

function capturePhoto() {
    console.log("Capture Photo");
    navigator.camera.getPicture(onCapturePhoto, onFail, {
        quality: 100,
        destinationType: destinationType.FILE_URI
    });
}

function onFail(message) {
    alert('Failed because: ' + message);
}*/

// A button will call this function
// To capture photo


chipinMemberApp.controller('logoutController', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc, $rootScope, $window){
    $window.localStorage["isLoggedIn"] = '';
    $window.localStorage["loggedInfo"] = '';
    $('.showMenuIfLogin').hide();
    $location.path('/login');
});

chipinMemberApp.controller('alertDialogCtrl', ["$scope", "$window", "$rootScope", "ngDialog", function($scope, $window, $rootScope, ngDialog) {
        $scope.msg = $rootScope.alertMessage;
}]);

function utf8_decode(str_data) {
  //  discuss at: http://phpjs.org/functions/utf8_decode/
  // original by: Webtoolkit.info (http://www.webtoolkit.info/)
  //    input by: Aman Gupta
  //    input by: Brett Zamir (http://brett-zamir.me)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Norman "zEh" Fuchs
  // bugfixed by: hitwork
  // bugfixed by: Onno Marsman
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // bugfixed by: kirilloid
  //   example 1: utf8_decode('Kevin van Zonneveld');
  //   returns 1: 'Kevin van Zonneveld'

  var tmp_arr = [],
    i = 0,
    ac = 0,
    c1 = 0,
    c2 = 0,
    c3 = 0,
    c4 = 0;

  str_data += '';

  while (i < str_data.length) {
    c1 = str_data.charCodeAt(i);
    if (c1 <= 191) {
      tmp_arr[ac++] = String.fromCharCode(c1);
      i++;
    } else if (c1 <= 223) {
      c2 = str_data.charCodeAt(i + 1);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else if (c1 <= 239) {
      // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    } else {
      c2 = str_data.charCodeAt(i + 1);
      c3 = str_data.charCodeAt(i + 2);
      c4 = str_data.charCodeAt(i + 3);
      c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
      c1 -= 0x10000;
      tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
      tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
      i += 4;
    }
  }

  return tmp_arr.join('');
}