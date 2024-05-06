$(document).ready(function () {
    // Load API status when the page is loaded
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            // Add the class 'available' to div#api_status if status is OK
            $('#api_status').addClass('available');
        }
    });

    // Request places data from the backend
    $.ajax({
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function (data) {
            // Loop through the places data and create article tags
            data.forEach(function (place) {
                var article = $('<article>');
                article.append('<div class="title"><h2>' + place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div>');
                article.append('<div class="information"><div class="max_guest"><i class="fa fa-users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div><div class="number_rooms"><i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"><i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom</div></div>');
                article.append('<div class="user"><strong>Owner: </strong></div>');
                article.append('<div class="description">' + place.description + '</div>');
                $('.places').append(article);
            });
        }
    });
});
