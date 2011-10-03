/**
 * jQuery Google Analytics
 * 
 * Version: 0.1.0
 * 
 * jQuery wrapper for working with the google analytics.
 * 
 * Loads the google analytics script on the document ready.
 * 
 * More Information:
 *     - http://google.com/analytics
 */
var _gaq = _gaq || [];

(function($) {
	var settings;
	
	$(function (){
		settings = $.extend({
			callback: undefined
		}, $.track.settings);
		
		$.ajax({
			type : "GET",
			url : (
					"https:" === document.location.protocol ?
					"https://ssl." :
					"http://www."
				) +
				'google-analytics.com/ga.js',
			success : settings.callback,
			dataType : "script",
			cache : true
		});
	});
	
	/**
	 * Add an analytics command to the queue.
	 * 
	 * See the API documentation for the available commands and arguments:
	 *     - http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html
	 * 
	 * commandName - string or function. Name of the command to push or a function to push
	 * [arguments]* - any. Additional arguments to be passed to the command
	 */
	$.track = function(command) {
		if($.isFunction(command)) {
			_gaq.push(command);
		} else {
			_gaq.push(Array.prototype.slice.call(arguments));
		}
	};
	
	$.track.settings = {};
}(jQuery));
