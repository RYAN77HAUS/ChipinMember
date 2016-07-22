sabio.services.mapsearch = {};

sabio.services.mapsearch.searchNearByOrgs = function (formData, onSuccess, onError) {
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
}
sabio.services.mapsearch.searchNearby = function (formData, onSuccess, onError) {
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