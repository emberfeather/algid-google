(function(c){function f(b){c.fn.track.defaults.debug&&typeof console!=="undefined"&&typeof console.debug!=="undefined"&&console.debug(b)}function h(b,a){if(typeof a==="function")a=a(b);return a}var g;c.trackPage=function(b,a){var e="https:"===document.location.protocol?"https://ssl.":"http://www.",d=c.extend({},{onload:true,status_code:200},a),i=e+"google-analytics.com/ga.js";load_script=function(){c.ajax({type:"GET",url:i,success:function(){if(typeof _gat!==undefined){f("Google Analytics loaded");
g=_gat._getTracker(b);if(d.status_code===null||d.status_code===200)g._trackPageview();else{f("Tracking error "+d.status_code);g._trackPageview("/"+d.status_code+".html?page="+document.location.pathname+document.location.search+"&from="+document.referrer)}c.isFunction(d.callback)&&d.callback()}else throw"_gat is undefined";},dataType:"script",cache:true})};d.onload===true||d.onload===null?c(window).load(load_script):load_script()};c.trackEvent=function(b,a,e,d){typeof g==="undefined"?f("FATAL: pageTracker is not defined"):
g._trackEvent(b,a,e,d)};c.trackPageview=function(b){typeof g==="undefined"?f("FATAL: pageTracker is not defined"):g._trackPageview(b)};c.fn.track=function(b){return this.each(function(){var a=c(this);if(a.hasClass("tracked"))return false;else a.addClass("tracked");var e=c.extend({},c.fn.track.defaults,b),d=h(a,e.category),i=h(a,e.action),k=h(a,e.label),l=h(a,e.value),m=h(a,e.event_name),j="category:'"+d+"' action:'"+i+"' label:'"+k+"' value:'"+l+"'";f("Tracking "+m+" "+j);a.bind(m+".track",function(){if(e.skip_internal&&
a[0].hostname===location.hostname)f("Skipped "+j);else{c.trackEvent(d,i,k,l);f("Tracked "+j)}return true})})};c.fn.track.defaults={category:function(b){return b[0].hostname===location.hostname?"internal":"external"},action:"click",label:function(b){return b.attr("href")},value:null,skip_internal:true,event_name:"click",debug:false}})(jQuery);