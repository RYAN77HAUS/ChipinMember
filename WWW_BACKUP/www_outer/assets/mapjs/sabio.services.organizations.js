sabio.services.organizations = {};
sabio.services.organizations.create = function (formData, onSuccess, onError) {
	var url = "api/map/organizations.php";
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

sabio.services.organizations.update = function (formData, onSuccess, onError, newId) {
	var url = "api/map/organizations.php?newId="+newId;
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

sabio.services.organizations.get = function (onSuccess, onError, newId) {
	var url = "api/map/organizations.php?newId="+newId;
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
};

sabio.services.organizations.selectAll = function (onSuccess, onError) {
	var url = "api/map/organizations.php";
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

sabio.services.organizations.selectGeoList = function (formData, onSuccess, onError) {
    var url = "api/map/organizations.php";
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

sabio.services.organizations.getImgData = function (onSuccess, onError) {
    var url = "api/map/organizations.php?data=1";
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
sabio.services.organizations.selectRandom = function (onSuccess, onError) {
    var url ="api/map/organizations.php?onload=1";
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

sabio.services.organizations.getImagesByGuid = function (entityGuid, onSuccess, onError) {

    var url = "api/map/organizations.php?entityGuid=1"; 
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
sabio.services.organizations.createEvent = function (formData, onSuccess, onError) {
    var url = "api/map/organizations.php?createEvent=1";
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
sabio.services.organizations.updateEvent = function (formData, onSuccess, onError) {
    var url = "api/map/organizations.php?updateEvent=1";
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
sabio.services.organizations.deleteEvent = function (formData, onSuccess, onError) {
    var url = "api/map/organizations.php?deleteEvent=1";
    var settings = {
        cache: false
		, contentType: "application/x-www-form-urlencoded; charset=UTF-8"
		, data: formData
		, dataType: "json"
		, success: onSuccess
		, error: onError
		, type: "DELETE"
    }
    $.ajax(url, settings);
};
sabio.services.organizations.getMerchantEvents = function (onSuccess, onError) {
    var url = "api/map/organizations.php?getMerchantEvents=1";
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
sabio.services.organizations.findOrgEvents = function (orgId, onSuccess, onError) {
    var url = "api/map/organizations.php?orgId="+orgId;
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

sabio.services.organizations.selectByCategory = function (formData, onSuccess, onError) {
    var url = "api/map/organizations.php?category";
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

sabio.services.organizations.selectByGeoLocation = function (formData, onSuccess, onError) {
    var url = "api/map/organizations.php";
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

sabio.services.organizations.updateDescription = function (formData, onSuccess, onError, newId) {
    var url = "api/map/organizations.php?description=1";
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

sabio.services.organizations.selectByUserId = function (onSuccess, onError) {
    var url = "api/map/organizations.php?selectByUserId=1";
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