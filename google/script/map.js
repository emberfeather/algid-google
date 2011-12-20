require(['jquery'], function(jQuery) {
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
			$('.google.map').each(function() {
				var infoWindow;
				var element = $(this);
				
				var latlng = new google.maps.LatLng(element.data('lat')
						|| $.google.maps.lat, element.data('lng')
						|| $.google.maps.lng);
				
				var options = $.extend($.google.maps.options,
						element.data('options') || {},
						{ center: latlng });
				
				var map = new google.maps.Map(this, options);
				
				var marker = new google.maps.Marker({
					position : latlng,
					map : map
				});
				
				var info = element.data('info');
				
				if(info) {
					infoWindow = new google.maps.InfoWindow();
					
					infoWindow.setContent(element.data('info'));
					infoWindow.open(map, marker);
				}
			});
		});
	}(jQuery));
});
