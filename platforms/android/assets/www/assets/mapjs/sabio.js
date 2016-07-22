var sabio = {
    layout: {}
    , page: {
        handlers: {}
        , startUp: null
    }
    , services: {}
};


sabio.layout.startUp = function () {


    //this does a null check on sabio.page.startUp
    if (sabio.page.startUp) {
        console.debug("sabio.page.startUp");
        sabio.page.startUp();
    }
};
$(document).ready(sabio.layout.startUp);

$body = $("body");

$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); },
    ajaxError: function () { $body.removeClass("loading"); }
});