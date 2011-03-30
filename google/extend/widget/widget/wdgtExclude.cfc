component extends="plugins.widget.inc.resource.base.widget" {
	public component function init(required struct transport) {
		super.init(arguments.transport);
		
		preventCaching();
		
		return this;
	}
	
	public string function process( required string content, required struct args ) {
		local.theUrl = variables.transport.theRequest.managers.singleton.getUrl();
		
		try {
			// Check if can exclude from analytics
			local.plugin = variables.transport.theApplication.managers.plugin.get('google');
			local.observerManager = local.plugin.getObserver();
			local.observer = observerManager.get('analytics');
			
			local.observer.beforeExclude(variables.transport);
			
			// Check for exclusion flag
			if(local.theUrl.searchBoolean('exclude')) {
				return 'Marking browser as <strong>excluded</strong>. <script>jQuery(function() { jQuery.track(''_setVar'', ''_exclude''); });</script>';
			}
			
			// Check for inclusion flag
			if(local.theUrl.searchBoolean('include')) {
				return 'Marking browser as <strong>included</strong>. <script>jQuery(function() { jQuery.track(''_setVar'', ''''; });</script>';
			}
			
			// Show options of including/excluding
			local.theUrl.setExclude('exclude', 'true');
			local.theUrl.setInclude('include', 'true');
			
			return '<a href="' & local.theUrl.getExclude() & '">Exclude</a> this browser from analytics OR <a href="' & local.theUrl.getInclude() & '">Include</a> this browser in analytics.';
		} catch (validation e) {
			return e.message;
		}
	}
}
