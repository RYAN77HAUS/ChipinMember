var MerchantOrgApi = angular.module('MerchantOrgApi', []);

MerchantOrgApi.factory("merchantApi", ["$rootScope", "$http", "$q", "$window", "$cookieStore", "$location", "apiSvc",  function($rootScope, $http, $q, $window, $cookieStore, $location, apiSvc) {

    var service = {};
     
    service.selectByCategory = function (formData, onSuccess, onError) {
        //debugger;
        loaderStat('show');
        var url = urls.apiUrl+urls.merchant;
        var settings = {
            cache: false
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , data: formData
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    };

    service.selectByGeoLocation = function (formData, onSuccess, onError) {
        var url = urls.apiUrl+urls.merchant+"?geolocation=1";
        loaderStat('show');
        //var url = "http://new.chipinworld.com/api/search/merchant/category";
        var settings = {
            cache: false
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , data: formData
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    };

    service.selectByNearLocation = function (formData, onSuccess, onError) {
        var url = urls.apiUrl+urls.merchant+"?near=1";
        loaderStat('show');
        //var url = "http://new.chipinworld.com/api/search/merchant/category";
        var settings = {
            cache: false
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , data: formData
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    };

    service.searchNearby = function (formData, onSuccess, onError) {
	    var url = urls.apiUrl+urls.merchant;
	    loaderStat('show');
	    var settings = {
	        cache: false
	           , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
	           , data: formData
	           , dataType: "json"
	           , success: onSuccess
	           , error: onError
	           , type: "GET"
	    };
	    $.ajax(url, settings);
	}
 
     return {
            selectByCategory: service.selectByCategory,
            selectByGeoLocation: service.selectByGeoLocation,
            selectByNearLocation: service.selectByNearLocation,
            searchNearby: service.searchNearby 
        };
}]);



MerchantOrgApi.factory("orgApi", ["$rootScope", "$http", "$q", "$window", "$cookieStore", "$location", "apiSvc",  function($rootScope, $http, $q, $window, $cookieStore, $location, apiSvc) {

    var service = {};
     
    service.selectByCategory = function (formData, onSuccess, onError) {
        //debugger;
        loaderStat('show');
        var url = urls.apiUrl+urls.organization;
        var settings = {
            cache: false
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , data: formData
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    };

    service.selectByGeoLocation = function (formData, onSuccess, onError) {
        var url = urls.apiUrl+urls.organization+"?geolocation=1";
        loaderStat('show');
        //var url = "http://new.chipinworld.com/api/search/organization/category";
        var settings = {
            cache: false
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , data: formData
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    };

    service.selectByNearLocation = function (formData, onSuccess, onError) {
        var url = urls.apiUrl+urls.organization+"?near=1";
        loaderStat('show');
        //var url = "http://new.chipinworld.com/api/search/organization/category";
        var settings = {
            cache: false
            , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
            , data: formData
            , dataType: "json"
            , success: onSuccess
            , error: onError
            , type: "GET"
        };
        $.ajax(url, settings);
    };

    service.searchNearby = function (formData, onSuccess, onError) {
	    var url = urls.apiUrl+urls.organization;
	    loaderStat('show');
	    var settings = {
	        cache: false
	           , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
	           , data: formData
	           , dataType: "json"
	           , success: onSuccess
	           , error: onError
	           , type: "GET"
	    };
	    $.ajax(url, settings);
	}
 
     return {
            selectByCategory: service.selectByCategory,
            selectByGeoLocation: service.selectByGeoLocation,
            selectByNearLocation: service.selectByNearLocation,
            searchNearby: service.searchNearby 
        };
}]);