component extends="plugins.widget.inc.resource.base.widget" {
	public component function init(required struct transport, required string path) {
		super.init(arguments.transport, arguments.path);
		
		preventCaching();
		
		return this;
	}
	
	public string function process( required string content, required struct args ) {
		addStyle(variables.transport.theRequest.webRoot & 'plugins/google/style/map.css');
		addScript('//maps.googleapis.com/maps/api/js?sensor=false');
		addScript(variables.transport.theRequest.webRoot & 'plugins/google/script/map.js');
		
		local.formatted = '<div class="google map" ';
		
		if(structKeyExists(arguments.args, 'lat')) {
			local.formatted &= 'data-lat="' & arguments.args.lat & '" ';
		}
		
		if(structKeyExists(arguments.args, 'lng')) {
			local.formatted &= 'data-lng="' & arguments.args.lng & '" ';
		}
		
		if(structKeyExists(arguments.args, 'info')) {
			local.formatted &= 'data-info="' & arguments.args.info & '" ';
		}
		
		if(structKeyExists(arguments.args, 'options')) {
			if(!isSimpleValue(arguments.args.options)) {
				arguments.args.options = serializeJson(arguments.args.options);
			}
			
			local.formatted &= 'data-options=''' & arguments.args.options & ''' ';
		}
		
		local.formatted &= '>' & arguments.content & '</div>';
		
		return local.formatted;
	}
}
