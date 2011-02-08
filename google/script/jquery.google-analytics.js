/**
 * jquery-google-analytics plugin
 * 
 * A jQuery plugin that makes it easier to implement Google Analytics tracking,
 * including event and link tracking.
 * 
 * This version is a rewrite of the original:
 *     http://github.com/christianhellsten/jquery-google-analytics/
 * 
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Credits:
 *    - http://google.com/analytics
 */
var _gaq = _gaq || [];

(function($) {
	var settings;
	
	$(function (){
		settings = $.extend({}, {
			account_id: 'UA-xxx-xxx',
			callback: undefined
		}, $.track.settings);
		
		$.track('_setAccount', settings.account_id);
		
		$.ajax({
			type : "GET",
			url : ("https:" === document.location.protocol ? "https://ssl." : "http://www." ) +
				'google-analytics.com/ga.js',
			success : settings.callback,
			dataType : "script",
			cache : true
		});
	});
	
	/**
	 * Add analytics command to the queue.
	 * 
	 * See the API documentation for the available commands and arguments:
	 *     - http://code.google.com/apis/analytics/docs/gaJS/gaJSApi.html
	 * 
	 * The track method takes one or more arguments:
	 * 
	 * commandName - string. Name of the command to push
	 * [arguments] - any. Additional arguments to be passed to the command
	 */
	$.track = function(commandName) {
		var args = Array.prototype.slice.call(arguments);
		
		debug('Tracking: ' + args);
		
		_gaq.push(args);
	};
	
	$.track.settings = {};
	
	/**
	 * Adds click tracking to elements.
	 * 
	 * Usage: $('a').track();
	 */
	$.fn.track = function(options) {
		// Add event handler to all matching elements
		return this.each(function() {
			var element = $(this);
			
			// Prevent an element from being tracked multiple times.
			if (element.hasClass('tracked')) {
				return false;
			} else {
				element.addClass('tracked');
			}
			
			// Merge custom options with defaults.
			var category = evaluate(element, settings.category);
			var action = evaluate(element, settings.action);
			var label = evaluate(element, settings.label);
			var value = evaluate(element, settings.value);
			var event_name = evaluate(element, settings.event_name);
			
			var message = "category:'" + category +
				"' action:'" + action +
				"' label:'" + label +
				"' value:'" + value + "'";
			
			// Bind the event to this element.
			element.live(event_name + '.track', function() {
				// Should we skip internal links?
				var skip = settings.skip_internal && element[0].hostname === location.hostname;
				
				if (!skip) {
					$.track('_trackEvent', category, action, label, value);
				}
				
				return true;
			});
		});
	};
	
	/**
	 * Checks whether a setting value is a string or a function.
	 * 
	 * If second parameter is a string: returns the value of the second
	 * parameter. If the second parameter is a function: passes the element
	 * to the function and returns function's return value.
	 */
	function evaluate(element, text_or_function) {
		if ($.isFunction(text_or_function)) {
			return text_or_function(element);
		}
		
		return text_or_function;
	}
	
	/**
	 * Prints to console, if available. To enable:
	 * 
	 * $.fn.track.defaults.debug = true;
	 */
	function debug(message) {
		if ($.fn.track.defaults.debug &&
				typeof console !== 'undefined' &&
				typeof console.debug !== 'undefined') {
			console.debug(message);
		}
	}
	
	/**
	 * Default (overridable) settings.
	 */
	$.fn.track.defaults = {
		category : function(element) {
			return element[0].hostname === location.hostname ? 'internal' : 'external';
		},
		action : 'click',
		label : function(element) {
			return element.attr('href');
		},
		value : null,
		skip_internal : true,
		event_name : 'click',
		debug : false
	};
}(jQuery));
