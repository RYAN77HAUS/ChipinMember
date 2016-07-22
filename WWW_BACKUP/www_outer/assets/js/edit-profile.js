chipinMemberApp.controller('editProfileController', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc, $rootScope, $window,ngDialog){
    $scope.title = "Edit Profile";
    $scope.loggedInMemInfo = JSON.parse($window.localStorage["loggedInfo"]);
    //$scope.profileImage = urls.mbrProfileImg+$scope.loggedInMemInfo.photo;
    $scope.profileImage = urls.liveUrl+$scope.loggedInMemInfo.photo;
    //console.log($scope.profileImage);
    loaderStat('show');
    $scope.updateMemberProfile = function(fields){
        loaderStat('show');
        var deferred = $q.defer();
        fields.oldimage = $scope.loggedInMemInfo.photo;
        //console.log("Update Profile");
        apiSvc.post(urls.updateProfile, fields)
            .then(function(result) {
            loaderStat('hide');
            $scope.info = result;
            if( $scope.info.success )
            {
                $window.localStorage["isLoggedIn"] = '1';
                $window.localStorage["loggedInfo"] = JSON.stringify($scope.info.data);   
                setTimeout(function(){
                    $('#Dob_tab2').datetimepicker({      
                        format:'d/m/Y',
                        timepicker:false
                    });
                },1000);
                (function(alert) { // anonymous function redefining the "alert"
                    alert("Profile has been updated successfully!");
                })($rootScope.myFunkyAlert);
            }

        }, function(error) {
            deferred.reject(error); 
        });
        return deferred.promise;
    } 
    
    setTimeout(function(){
        $('#Dob_tab2').datetimepicker({      
            format:'d/m/Y',
            timepicker:false
        });
    },1000);
    
    $scope.cancelUpadate = function(){
        //console.log("cancel Update");
        $window.location.reload();
        //$location.path('/edit-profile');
    }

    $scope.capturePhoto = function() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture($scope.uploadPhoto, $scope.onFail, { 
        quality: 50, destinationType: Camera.DestinationType.FILE_URI 
    });
}

    // A button will call this function
    // To select image from gallery
    $scope.getPhoto = function(source) {
        // Retrieve image file location from specified source
        navigator.camera.getPicture($scope.uploadPhoto, $scope.onFail, { quality: 50,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
         });
    }

    $scope.uploadPhoto = function(imageURI) {
        //If you wish to display image on your page in app
        // Get image handle
        //var largeImage = document.getElementById('largeImage');

        // Unhide image elements
        //largeImage.style.display = 'block';

        // Show the captured photo
        // The inline CSS rules are used to resize the image
        //largeImage.src = imageURI;

        /*var options = new FileUploadOptions();
       
        options.fileKey = "file";
        var userid = '123456';
        var imagefilename = userid + Number(new Date()) + ".jpg";
        options.fileName = imagefilename;
        options.mimeType = "image/jpg";

        var params = new Object();
        params.imageURI = imageURI;
        params.userid = sessionStorage.loginuserid;
        options.params = params;
        options.chunkedMode = false;
        options.headers = {
            Connection: "close"
        };
        var ft = new FileTransfer();
        var url = urls.mbrProfileImg;
        ft.upload(imageURI, url, win, fail, options, true);*/
        //console.log(imageURI);
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        if ( imageURI.indexOf('.jpg') == "-1" && imageURI.indexOf('.png') == "-1" )
        {
            options.fileName = options.fileName+".jpg";
        }
        //console.log()
        if( options.fileName.indexOf('image%3A') != -1 )
        {
            options.fileName = options.fileName.replace("image%3A", "");
        }
        //console.log("File Name "+options.fileName);
        options.mimeType = "image/jpeg";
        options.params = {}; // if we need to send parameters to the server request
        options.chunkedMode = false;
        options.headers = {
           Connection: "close"
        };
        var ft = new FileTransfer();
        loaderStat('show');
        ft.upload(imageURI, encodeURI(urls.profilePicUpload), $scope.win, $scope.fail, options);
    }
    //Success callback
    $scope.win = function(r) {
        /*console.log("Win");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);*/
        var tempResponseStorage = JSON.parse(r.response);
        $scope.loggedInMemInfo.newimage = tempResponseStorage.data;
        //$scope.profileImage = urls.mbrProfileImg+$scope.loggedInMemInfo.photo;
        $scope.profileImage = urls.liveUrl+$scope.loggedInMemInfo.newimage;
        loaderStat('hide');
        (function(alert) { // anonymous function redefining the "alert"
            alert("Profile image uploaded successfully!");
        })($rootScope.myFunkyAlert);
       
    }
    //Failure callback
    $scope.fail = function(error) {
        //console.log("fail");
        //console.log(JSON.stringify(error));
        loaderStat('hide');
        (function(alert) { // anonymous function redefining the "alert"
            alert("There was an error uploading image.");
        })($rootScope.myFunkyAlert);
    }
    // Called if something bad happens.
    // 
    $scope.onFail = function(message) {
        loaderStat('hide');
        /*(function(alert) { // anonymous function redefining the "alert"
          alert('Failed because: ' + message);
        })($rootScope.myFunkyAlert);*/
    }

    
    
    loaderStat('hide');
});