var _gaq=_gaq||[];
(function(b){function e(a,d){if(b.isFunction(d))return d(a);return d}function f(a){b.fn.track.defaults.debug&&typeof console!=="undefined"&&typeof console.debug!=="undefined"&&console.debug(a)}var c;b(function(){c=b.extend({},{account:"UA-xxx-xxx",callback:undefined},b.track.settings);b.track("_setAccount",c.account);c.domainName&&b.track("_setDomainName",c.domainName);c.allowHash&&b.track("_setAllowHash",c.allowHash);c.allowLinker&&b.track("_setAllowLinker",c.allowLinker);b.track("_trackPageview");b.ajax({type:"GET",
url:("https:"===document.location.protocol?"https://ssl.":"http://www.")+"google-analytics.com/ga.js",success:c.callback,dataType:"script",cache:true})});b.track=function(a){var d;if(b.isFunction(a)){f("Tracking: [function]");_gaq.push(a)}else{d=Array.prototype.slice.call(arguments);f("Tracking: "+d);_gaq.push(d)}};b.track.settings={};b.fn.track=function(){return this.each(function(){var a=b(this);if(a.hasClass("tracked"))return false;else a.addClass("tracked");var d=e(a,c.category),g=e(a,c.action),
h=e(a,c.label),i=e(a,c.value),j=e(a,c.event_name);a.live(j+".track",function(){c.skip_internal&&a[0].hostname===location.hostname||b.track("_trackEvent",d,g,h,i);return true})})};b.fn.track.defaults={category:function(a){return a[0].hostname===location.hostname?"internal":"external"},action:"click",label:function(a){return a.attr("href")},value:null,skip_internal:true,event_name:"click",debug:false}})(jQuery);
