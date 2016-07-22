sabio.services.merchant = {};

var demoUrl = 'http://work.elayers.net/chipin/chipin/assets/mapjs/geolocation.json';

sabio.services.merchant.create = function (formData, onSuccess, onError) {
	var url = "api/map/merchants.php";//pulled RoutePrefix and Route from API controller, uset in REST client
	var settings = {
		cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: formData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "POST"
	};
	$.ajax(url, settings);

};



sabio.services.merchant.update = function (formData, merchantId, onSuccess, onError) {
	var url = "api/map/merchants.php?id=" + merchantId;//pulled RoutePrefix and Route from API controller, used in REST client
	var settings = {
		cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: formData
        , dataType: "json"
        , success: onSuccess
		, error: onError
        , type: "PUT"
	};
	$.ajax(url, settings);
};

sabio.services.merchant.updateDescription = function (formData, merchantId, onSuccess, onError) {
    var url = "api/map/merchants.php?id=" + merchantId + "&description=1";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: formData
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
};


sabio.services.merchant.select = function (merchantId, onSuccess, onError) {
	var url = "api/map/merchants.php?id=" + merchantId;
	var settings = {
		cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null //this portion is not needed because your not sending any data.
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
	};
	$.ajax(url, settings);

};

sabio.services.merchant.selectByUserId = function (onSuccess, onError) {
    var url = "api/map/merchants.php?current=1";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null //this portion is not needed because your not sending any data.
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);

};

sabio.services.merchant.adminSelect = function (onSuccess, onError) {
    var url = "api/map/merchants.php";
    var settings = {
        cache: false
                , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
                , data: null
                , dataType: "json"
                , success: onSuccess
                , error: onError
                , type: "GET"
    };
    $.ajax(url, settings);
}


sabio.services.merchant.getGeoList = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php";
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

sabio.services.merchant.searchMerchantName = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?searchMerchantName=1";
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

//Get for Merchant Profile Photo
sabio.services.merchant.selectProfileData = function (onSuccess, onError) {
    var url = "api/map/merchants.php?imageData=1";
    var settings = {
        cache: false
           , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
           , data: null
           , dataType: "json"
           , success: onSuccess
           , error: onError
           , type: "GET"
    };
    $.ajax(url, settings);
}

sabio.services.merchant.insertEvent = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?insertEvent=1";//pulled RoutePrefix and Route from API controller, uset in REST client
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: formData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "POST"
    };
    $.ajax(url, settings);
}
sabio.services.merchant.updateEvent = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?updateEvent=1";//pulled RoutePrefix and Route from API controller, uset in REST client
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: formData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "PUT"
    };
    $.ajax(url, settings);
}
sabio.services.merchant.getEvents = function (onSuccess, onError) {
    var url = "api/map/merchants.php?getEvents=1";//pulled RoutePrefix and Route from API controller, uset in REST client
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: null
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "GET"
    };
    $.ajax(url, settings);
}


sabio.services.merchant.getImagesByGuid = function (entityGuid, onSuccess, onError) {

    var url = "api/map/merchants.php?getImagesByGuid=1&entityGuid=" + entityGuid;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
       , success: onSuccess
       , error: onError
       , type: "GET"
    };
    $.ajax(demoUrl, settings);
}

sabio.services.merchant.deleteEvents = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?deleteEvents=1";//pulled RoutePrefix and Route from API controller, uset in REST client
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: formData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "DELETE"
    };
    $.ajax(url, settings);
}

sabio.services.merchant.confirmEvent = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?confirmEvent=1";//pulled RoutePrefix and Route from API controller, uset in REST client
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: formData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "PUT"
    };
    $.ajax(url, settings);
}

sabio.services.merchant.getLocal = function (onSuccess, onError) {
    var url = "api/map/merchants.php?local=1";
    var myData = null;
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: myData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "GET"
    };
    $.ajax(url, settings);
};

sabio.services.merchant.selectByCategory = function (formData, onSuccess, onError) {
    //debugger;
    var url = "api/map/merchants.php";
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

sabio.services.merchant.selectByGeoLocation = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?geolocation=1";
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

sabio.services.merchant.selectByNearLocation = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?near=1";
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

sabio.services.merchant.findEvents = function (merchantId, onSuccess, onError) {
    var url = "api/map/merchants.php?merchant=" + merchantId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}
sabio.services.merchant.findConfirmedEvents = function (merchantId, onSuccess, onError) {
    var url = "api/map/merchants.php?merchant_confirmed=" + merchantId;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: null
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
}
sabio.services.merchant.confirmedEventsNearby = function (formData, onSuccess, onError) {
    var url = "api/map/merchants.php?merchant_local"
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