$(document).ready(function () {
  // task 2
  const amenityIds = {};
  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenityIds[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityIds[$(this).data('id')];
    }
    if (Object.keys(amenityIds).length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenityIds).join(', '));
    }
  });
});
