var mSearchItem = {};
chipinMemberApp.controller('merchantsMapsListController', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc,merchantApi,$rootScope, $window){
    loaderStat('show');
    $scope.title = "Merchant";
    $scope.loggedInMemInfo = JSON.parse($window.localStorage["loggedInfo"]);
    $scope.imageUrl = urls.imagePath;
    $scope.logoUrl = urls.logoPath;
    $scope.fields = {};
    $scope.categories = {};  
    $scope.searchByCat = {};
    $scope.search = {};
    $scope.viewMode = "List"; 
    

    ///////////////////////////////////////////////////////////////////////////////////

    var markersArray = [];
    var markerClusterer = null;
    var clusterStyles = [{
        //url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png",
        url: "assets/images/MapCluster.png",
        height: 71,
        width: 71,
        //opt_anchor: [16, 0],
        //opt_textColor: 'white',
        textColor: '#F0FFFF',
        textSize: 22
        
    }];
    var mcOptions = {
        gridSize: 100,
        styles: clusterStyles,
        maxZoom: 15
    };

    //console.log("controller start"); //check controller facrotry is called

    //  this variable represents the actual controller
    
   

    //   references
    $scope.hasError = false;
    $scope.errorList = null;
    $scope.showControls = false;
    $scope.map = null;
    $scope.searchForm = null;
    $scope.searchItem = null;
    $scope.modal = $("#details-modal");
    $scope.selectedItem = null;
    $scope.hoverMarker = null;
    $scope.infoWindow = new google.maps.InfoWindow();


    //  save a reference to service class 
    $scope.$mapCategorySearchService = merchantApi;
   
 

    // logic properties declarations
    $scope.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $scope.oldLabel = null;
    $scope.pageStart = 0;
    $scope.pageMax = 10;
    $scope.pageResults = null;

    $scope.results = null;
    $rootScope.listResults = null;
    $scope.listResults = null;
    $scope.fLocation = null;
   // $scope.search = _search;
    // initialize public functions
    
       

    //default Find locations
    $scope.searchItem = (Object.keys(mSearchItem).length > 0) ? mSearchItem : {};
    $scope.searchItem.category = (Object.keys(mSearchItem).length > 0) ? mSearchItem.category : 0;
    $scope.load = 1;
    $scope.alreadySearched = (Object.keys(mSearchItem).length > 0) ? true : false;
                
    $scope.mapView  = false; 
    $scope.listView = true; 

    //var geocoder = new google.maps.Geocoder();
    var mapCanvas = $("#map-canvas");
     var latlng = new google.maps.LatLng(33.9860091, -118.3870989);
    //var latlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
                    stylers: [{
                        hue: "#34a9e0"
                    }, {
                        saturation: -90
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "label",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }]
    }
    
     

    $scope.ShowCureentPostion = function(position) {
            //  alert('s' + position.coords.longitude + 'y' + position.coords.latitude);
           $scope.searchItem.latitude = position.coords.latitude;
           $scope.searchItem.longitude = position.coords.longitude;

           mSearchItem = $scope.searchItem;
            
           //console.log(mSearchItem);
        
            //$scope.searchItem.latitude = 33.9860091;
          // $scope.searchItem.longitude = 118.3870989;
             $scope.$mapCategorySearchService.selectByGeoLocation($scope.searchItem, $scope.onGeoSearchSuccess, $scope.onSearchError);
    }
    $scope.PositionError= function(position) {
        (function(alert) { // anonymous function redefining the "alert"
            alert("Does not find any Geolocation!");
        })($rootScope.myFunkyAlert);
        mSearchItem = $scope.searchItem;
        $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
    }


    $scope.getLocation = function() {
         if (navigator.geolocation) {
             function CureentPostion(position) {
                $scope.searchItem.latitude = position.coords.latitude;
                $scope.searchItem.longitude = position.coords.longitude;

                mSearchItem = $scope.searchItem; 
                //$scope.map.setZoom(10);
             
            }
            function PositionError(Error) {
                (function(alert) { // anonymous function redefining the "alert"
                    alert("Does not find any Geolocation!");
                })($rootScope.myFunkyAlert);
                $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
            }
            navigator.geolocation.getCurrentPosition(CureentPostion,PositionError); 
        }


    }
    $scope.search = function() {
        
        loaderStat('show');
        if($('#cityState').val() != 'undefined' && $.trim($('#cityState').val()) != ''){
            console.log("Distance "+$scope.searchItem.distance);
            if($scope.searchItem.distance == '' || $scope.searchItem.distance < 1 || $scope.searchItem.distance == 'undefined' || typeof $scope.searchItem.distance == 'undefined'){ 
                (function(alert) { // anonymous function redefining the "alert"
                    alert("Please select radius to search in particular area!");
                })($rootScope.myFunkyAlert);
                $('#distance').focus();
                return false;       
            }
        }
        $('#filter').modal('hide');
        mSearchItem = $scope.searchItem;
        $scope.$mapCategorySearchService.searchNearby($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
    }
    $scope.onGeoSearchSuccess= function(data) {
        $scope.showControls = true;
        $scope.hasError = false;
        $scope.errorList = null;
        //console.log(data);
        $scope.$apply(function(){         

            $scope.results = null;
            
            $scope.results = data.items;                          
            $scope.fLocation = data.focusLocation;                 
        });
        loaderStat('hide'); 
    }
    $scope.onSearchSuccess = function(data) {                
        $scope.showControls = true;
        $scope.hasError = false;
        $scope.errorList = null;
        //console.log( "already search");
        //console.log( data.items);
        $scope.$apply(function(){      
             $scope.results = data.items;
             $scope.fLocation = data.focusLocation; 
        });
        loaderStat('hide');
    } 
   $scope.onSearchError = function(jqXHR, error) {
        console.log("Unsuccessful search");
        $scope.hasError = true;
        $scope.$apply(function(){                 
            console.log("error: ", jqXHR.responseJSON);
            $scope.errorList = jqXHR.responseJSON.errors;
            console.log($scope.errorList);
       });
        loaderStat('hide');
        console.error(jqXHR.responseJSON);
    }

   

    $scope.category = function(category) {
        $('#category').modal('hide');
        loaderStat('show');
        if ($scope.searchItem != null) {
            $scope.searchItem.category = category;
            
            mSearchItem = $scope.searchItem;

            $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
            
        }
        else {
            $scope.searchItem = {};

            $scope.searchItem.category = category;
            
            mSearchItem = $scope.searchItem;

            $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
            
        }
        
    }

    $scope.reset = function(){
        $('#filter').modal('hide');
        loaderStat('show');
        $scope.searchItem.category = '';
        $scope.searchItem.distance = '';
        $scope.searchItem.cityState = '';
        $scope.searchItem.name = '';
        $scope.$mapCategorySearchService.searchNearby($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
    }

    console.log( "already" + $scope.alreadySearched);
    if (navigator.geolocation &&  $scope.alreadySearched == false) { 
        navigator.geolocation.getCurrentPosition($scope.ShowCureentPostion, $scope.PositionError); 
    } else {
          //console.log("test out");
        $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
        //console.log($scope.searchItem);
    }

    
    console.log("controller made"); //check controller factory successfully finishes

    var deferred = $q.defer();
    apiSvc.post(urls.categories, {"getcat":"categories"} )
    .then(function(result) {
                $scope.categories = result;
                //console.log("categories "+$scope.categories);
        }, function(error) {
        deferred.reject(error);
        //loaderStat('hide');
    });
    return deferred.promise; 
    /////////////////////////////////////////////////////////////////////////////////// 

    //loaderStat('hide');
}); 
 





 ////////////////////////////////////////////////////////////////////
var markersArray = [];
    var markerClusterer = null;
 
chipinMemberApp.controller('merchantsMapsController', function($scope, $q, $http, $cookieStore, $location, $routeParams, apiSvc,merchantApi,$rootScope, $window){
    loaderStat('show');
    $scope.title = "Merchant";
    $scope.loggedInMemInfo = JSON.parse($window.localStorage["loggedInfo"]);
    $scope.imageUrl = urls.imagePath;
    $scope.logoUrl = urls.logoPath;
    $scope.orgProfileImgUrl = urls.orgProfileImg;
    $scope.fields = {};
    $scope.categories = {};  
    $scope.searchByCat = {};
    $scope.search = {};
    $scope.viewMode = "List"; 
    

    ///////////////////////////////////////////////////////////////////////////////////
 
    var clusterStyles = [{
        //url: "http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png",
        url: "assets/images/MapCluster.png",
        height: 71,
        width: 71,
        //opt_anchor: [16, 0],
        //opt_textColor: 'white',
        textColor: '#F0FFFF',
        textSize: 22
        
    }];
    var mcOptions = {
        gridSize: 100,
        styles: clusterStyles,
        maxZoom: 15
    };

    //console.log("controller start"); //check controller facrotry is called

    //  this variable represents the actual controller
     

    $scope.mapView  = false; 
    $scope.listView = true; 
    //mode function
    $scope.changeView = function(){
        if($scope.mapView == true){
            $scope.mapView = false;
            $scope.listView = true; 
        }else{

            $scope.mapView   = true;
            $scope.listView = false; 
             
        }
    }; 

    //   references
    $scope.hasError = false;
    $scope.errorList = null;
    $scope.showControls = false;
    $scope.map = null;
    $scope.searchForm = null;
    $scope.searchItem = null;
    $scope.modal = $("#details-modal");
    $scope.selectedItem = null;
    $scope.hoverMarker = null;
    $scope.infoWindow = new google.maps.InfoWindow();


    //  save a reference to service class 
    $scope.$mapCategorySearchService = merchantApi;
    $scope.$scope = $scope;

 

    // logic properties declarations
    $scope.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $scope.oldLabel = null;
    $scope.pageStart = 0;
    $scope.pageMax = 10;
    $scope.pageResults = null;

    $scope.results = null;
    $scope.listResults = null;
    $scope.fLocation = null;
   // $scope.search = _search;
    // initialize public functions
    
       
    //default Find locations
   /* $scope.searchItem = (Object.keys(mSearchItem).length > 0) ? mSearchItem : {};
    $scope.searchItem.category = (Object.keys(mSearchItem).length > 0) ? mSearchItem.category : 0;
    //default Find locations
    $scope.load = 1;
    $scope.alreadySearched = false;*/

    $scope.searchItem = (Object.keys(mSearchItem).length > 0) ? mSearchItem : {};
    $scope.searchItem.category = (Object.keys(mSearchItem).length > 0) ? mSearchItem.category : 0;
    $scope.load = 1;
    $scope.alreadySearched = (Object.keys(mSearchItem).length > 0) ? true : false;
                

    var mapCanvas = $("#map-canvas");
     var latlng = new google.maps.LatLng(33.9860091, -118.3870989);
    //var latlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
                    stylers: [{
                        hue: "#34a9e0"
                    }, {
                        saturation: -90
                    }]
                }, {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "poi",
                    elementType: "label",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        visibility: "simplified"
                    }]
                }]
    }
    setTimeout(function(){
        $scope.map = new google.maps.Map((mapCanvas[0]), mapOptions);
        $scope.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv[0]);  
    },100);
    var controlDiv = $("#control-div");
    var controlUI = $("#control-ui");
    var controlText = $("#control-text");
    controlUI.click(function () {
        _getLocation();
    });
    controlDiv.index = 1;
       


    $scope.ShowCureentPostion = function(position) {
            //  alert('s' + position.coords.longitude + 'y' + position.coords.latitude);
           $scope.searchItem.latitude = position.coords.latitude;
            $scope.searchItem.longitude = position.coords.longitude;
            //$scope.searchItem.latitude = 33.9860091;
          // $scope.searchItem.longitude = 118.3870989;
            mSearchItem = $scope.searchItem;
             $scope.$mapCategorySearchService.selectByGeoLocation($scope.searchItem, $scope.onGeoSearchSuccess, $scope.onSearchError);
    }
    $scope.PositionError= function(position) {
        (function(alert) { // anonymous function redefining the "alert"
            alert("Does not find any Geolocation!");
        })($rootScope.myFunkyAlert);
        loaderStat('hide');
        $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
    }

   
     
    $scope.getLocation = function() {
         if (navigator.geolocation) {
             function CureentPostion(position) {
                $scope.searchItem.latitude = position.coords.latitude;
                $scope.searchItem.longitude = position.coords.longitude;
                mSearchItem = $scope.searchItem;
                $scope.map.setCenter(new google.maps.LatLng($scope.searchItem.latitude, $scope.searchItem.longitude));
                //$scope.map.setZoom(10);
             
            }
            function PositionError(Error) {
                (function(alert) { // anonymous function redefining the "alert"
                    alert("Does not find any Geolocation!");
                })($rootScope.myFunkyAlert);
                //$scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
            }
            navigator.geolocation.getCurrentPosition(CureentPostion,Error); 
        }


    }
    $scope.search = function() {
        loaderStat('show');
        if($('#cityState').val() != 'undefined' && $.trim($('#cityState').val()) != ''){
            if($scope.searchItem.distance == '' || $scope.searchItem.distance < 1 || $scope.searchItem.distance == 'undefined' || typeof $scope.searchItem.distance == 'undefined'){
                (function(alert) { // anonymous function redefining the "alert"
                    alert("Please select radius to search in particular area!");
                })($rootScope.myFunkyAlert);
                $('#distance').focus();
                return false;       
            }
        }
        $('#filter').modal('hide');
        console.log($scope.searchItem);
        mSearchItem = $scope.searchItem;
        $scope.$mapCategorySearchService.searchNearby($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
    }
    $scope.onGeoSearchSuccess= function(data) {
        $scope.showControls = true;
        $scope.hasError = false;
        $scope.errorList = null;
        console.log(data);
                         
            $scope.results = null;
            
            $scope.results = data.items;                    
            $scope.fLocation = data.focusLocation;                

            $scope.setMapMarkers($scope.results);
            $scope.map.setZoom(10);
            $scope.map.setCenter(new google.maps.LatLng($scope.fLocation.lat, $scope.fLocation.lng));
            

        
        loaderStat('hide');
        //$scope.$apply(function(){     
            //$scope.listResults = data.items;
        //}) 
        //$scope.setMapMarkers($scope.pageResults);
    }
    $scope.onSearchSuccess = function(data) {                
        $scope.showControls = true;
        $scope.hasError = false;
        $scope.errorList = null;
                             
        console.log(data); 

             $scope.results = data.items;
             $scope.fLocation = data.focusLocation;
             if($scope.results.length > 0){ 
                 $scope.setMapMarkers($scope.results);
                 if($scope.fLocation && $scope.fLocation.lat){ 
                    $scope.map.setZoom(10);
                    $scope.map.setCenter(new google.maps.LatLng($scope.fLocation.lat, $scope.fLocation.lng));
                    
                 }else{
                    $scope.map.setZoom(10);
                    $scope.map.setCenter(new google.maps.LatLng($scope.results[0].latitude, $scope.results[0].longitude));
                    //$scope.map.setZoom(10);
                 }
             }else{
                 for (var i = 0; i < markersArray.length; i++) {
                    if (markersArray[i] != undefined)
                        markersArray[i].setMap(null);
                    markerClusterer.clearMarkers();
                }
                markersArray = [];
                if($scope.fLocation && $scope.fLocation.lat){ 
                    $scope.map.setZoom(10);
                     $scope.map.setCenter(new google.maps.LatLng($scope.fLocation.lat, $scope.fLocation.lng));
                    //$scope.map.setZoom(7);
                } 
             }
        
        loaderStat('hide');
    } 
   $scope.onSearchError = function(jqXHR, error) {
        console.log("Unsuccessful search");
        $scope.hasError = true;
        //$scope.$apply(function(){                 
            console.log("error: ", jqXHR.responseJSON);
            $scope.errorList = jqXHR.responseJSON.errors;
            console.log($scope.errorList);
      // });
        loaderStat('hide');
        console.error(jqXHR.responseJSON);
    }


   
    $scope.setMapMarkers = function(results) {
        
        for (var i = 0; i < markersArray.length; i++) {
            if (markersArray[i] != undefined)
                markersArray[i].setMap(null);
            markerClusterer.clearMarkers();
        }
        markersArray = [];

        var iconMap = new google.maps.MarkerImage(
                  "assets/images/MapPin.png",
                     null, /* size is determined at runtime */
                    null, /* origin is 0,0 */
                    null, /* anchor is bottom center of the scaled image */
                    new google.maps.Size(35, 45)
          );
        results.forEach(function (item, i) {
            var location = new google.maps.LatLng(item.latitude, item.longitude);                    
            var marker = new google.maps.Marker({
                map: $scope.map,
                icon: iconMap,
                position: location,
               // label: $scope.labels[i % $scope.labels.length],
                markerItem: item
            });
            item.marker = marker;
            markersArray.push(marker);
            google.maps.event.addListener(marker, 'mouseover', $scope.onMarkerHover);
            google.maps.event.addListener(marker, 'click', $scope.onMarkerClick);
        });
         markerClusterer = new MarkerClusterer($scope.map, markersArray, mcOptions);
         loaderStat('hide');
    }
    $scope.onMarkerHover= function(marker, content, infowindow) {
        var url = '#/merchants-detail/'+this.markerItem.id;
        var popup = '<div>' + '<h4><a href=' + url + '>' + this.markerItem.com + '</h4></a>' + '<h5>' + this.markerItem.addr+','+this.markerItem.city+'<br>'+this.markerItem.zip+','+this.markerItem.country+'<br></h5><br><a href="'+url+'">Click To More Info</a>' + '</div>';
        $scope.infoWindow.setContent(popup);
        $scope.infoWindow.open($scope.map, this);

        loaderStat('hide');
    }
    $scope.onMarkerClick = function(marker, content, infowindow) {
         var url = '#/merchants-detail/'+this.markerItem.id;
        var popup = '<div>' + '<h4><a href=' + url + '>' + this.markerItem.com + '</h4></a>' + '<h5>' + this.markerItem.addr+','+this.markerItem.city+'<br>'+this.markerItem.zip+','+this.markerItem.country+'<br></h5><br><a href="'+url+'">Click To More Info</a>' + '</div>';
        $scope.infoWindow.setContent(popup);
        $scope.infoWindow.open($scope.map, this);
        loaderStat('hide');
    }

    $scope.category = function(category) {
        $('#category').modal('hide');
        loaderStat('show');
        if ($scope.searchItem != null) {
            $scope.searchItem.category = category;
            console.log($scope.searchItem);
            mSearchItem = $scope.searchItem;
            $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
            loaderStat('hide');
        }
        else {
            $scope.searchItem = {};

            $scope.searchItem.category = category;
            console.log($scope.searchItem);
            mSearchItem = $scope.searchItem;
            $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
            loaderStat('hide');
        }
        
    }
    console.log("controller made"); //check controller factory successfully finishes

    $scope.reset = function(){
        $('#filter').modal('hide');
        loaderStat('show');
        $scope.searchItem.category = '';
        $scope.searchItem.distance = '';
        $scope.searchItem.cityState = '';
        $scope.searchItem.name = '';
        $scope.$mapCategorySearchService.searchNearby($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
    }

    if (navigator.geolocation && $scope.alreadySearched == false) { 
        navigator.geolocation.getCurrentPosition($scope.ShowCureentPostion, $scope.PositionError); 
    } else {
          console.log("test out");
        $scope.$mapCategorySearchService.selectByCategory($scope.searchItem, $scope.onSearchSuccess, $scope.onSearchError);
        //console.log($scope.searchItem);
    }

    var deferred = $q.defer();
    apiSvc.post(urls.categories, {"getcat":"categories"} )
    .then(function(result) {
                $scope.categories = result;
                //console.log("categories "+$scope.categories);
        }, function(error) {
        deferred.reject(error);
        //loaderStat('hide');
    });
    return deferred.promise; 
    /////////////////////////////////////////////////////////////////////////////////// 

    //loaderStat('hide');
}); 
