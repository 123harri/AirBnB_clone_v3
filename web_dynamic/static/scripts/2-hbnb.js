$(document).ready(function () {
    // Load API status when the page is loaded
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            // Add the class 'available' to div#api_status if status is OK
            $('#api_status').addClass('available');
        }
    });
});
