(function($) {
	$.google = $.extend({
		maps: {
			lat: -34.397,
			lng: 150.644,
			options: {
				zoom : 8,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			}
		}
	}, $.google || {})
	
	$(function() {
		$('.element .coordinate').each(function() {
			var element = $(this);
			var elementLat = $('.lat', element.parent());
			var elementLng = $('.lng', element.parent());
			
			var latlng = new google.maps.LatLng(element.data('lat')
					|| $.google.maps.lat, element.data('lng')
					|| $.google.maps.lng);
			
			var options = $.extend($.google.maps.options,
					element.data('options'),
					{ center: latlng });
			
			var map = new google.maps.Map(this, options);
			
			var marker = new google.maps.Marker({
				position : latlng,
				map : map
			});
			
			google.maps.event.addListener(map, 'click', function(event) {
				elementLat.val(event.latLng.lat());
				elementLng.val(event.latLng.lng());
				
				map.panTo(event.latLng);
				marker.setPosition(event.latLng);
			});
		});
	});
}(jQuery));
