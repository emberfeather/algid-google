require(["jquery"],function(e){(function(a){a.google=a.extend({maps:{lat:-34.397,lng:150.644,options:{zoom:8,mapTypeId:google.maps.MapTypeId.ROADMAP}}},a.google||{});a(function(){a(".google.map").each(function(){var b,c=a(this);b=new google.maps.LatLng(c.data("lat")||a.google.maps.lat,c.data("lng")||a.google.maps.lng);var d=a.extend(a.google.maps.options,c.data("options")||{},{center:b}),d=new google.maps.Map(this,d),e=new google.maps.Marker({position:b,map:d});c.data("info")&&(b=new google.maps.InfoWindow,
b.setContent(c.data("info")),b.open(d,e))})})})(e)});