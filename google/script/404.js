require(['jquery'], function(jQuery) {
	(function($) {
		$(function() {
			if($.track) {
				$.track('_trackEvent', 'error', '404', document.location.pathname + document.location.search + ' ref: ' + document.referrer);
			}
		});
	}(jQuery));
});
