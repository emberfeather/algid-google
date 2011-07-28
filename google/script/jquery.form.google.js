(function($) {
	var geocoder;
	
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
					element.data('options') || {},
					{ center: latlng });
			
			console.log(element.data('options'));
			console.log(options);
			
			var map = new google.maps.Map(this, options);
			
			var marker = new google.maps.Marker({
				position : latlng,
				map : map
			});
			
			element.data('map', map);
			element.data('marker', marker);
			element.data('options', options);
			
			google.maps.event.addListener(map, 'click', function(event) {
				elementLat.val(event.latLng.lat());
				elementLng.val(event.latLng.lng());
				
				map.panTo(event.latLng);
				marker.setPosition(event.latLng);
			});
		}).bind('geocode', function(event, address) {
			geocoder = geocoder || new google.maps.Geocoder();
			
			var element = $(this);
			var elementLat = $('.lat', element.parent());
			var elementLng = $('.lng', element.parent());
			
			geocoder.geocode({ 'address' : address }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					element.data('map').panTo(results[0].geometry.location);
					element.data('marker').setPosition(results[0].geometry.location);
					
					elementLat.val(results[0].geometry.location.lat());
					elementLng.val(results[0].geometry.location.lng());
				} else {
					console.error("Geocode Failed: " + status);
				}
			});
		});
	});
}(jQuery));
