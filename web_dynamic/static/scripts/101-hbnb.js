$(document).ready(function () {
    // Load API status when the page is loaded
    $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
        if (data.status === "OK") {
            // Add the class 'available' to div#api_status if status is OK
            $('#api_status').addClass('available');
        }
    });

    // Function to toggle show/hide reviews
    $('span#toggle_reviews').click(function() {
        var $reviews = $('div#reviews');
        if ($(this).text() === "show") {
            // Fetch and display reviews
            $.get("http://0.0.0.0:5001/api/v1/reviews/", function (data) {
                data.forEach(function (review) {
                    var reviewElement = $('<div class="review">');
                    reviewElement.text(review.text);
                    $reviews.append(reviewElement);
                });
            });
            $(this).text("hide");
        } else {
            // Hide reviews
            $reviews.empty();
            $(this).text("show");
        }
    });
});
