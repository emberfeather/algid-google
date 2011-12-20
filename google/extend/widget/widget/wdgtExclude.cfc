component extends="plugins.widget.inc.resource.base.widget" {
	public component function init(required struct transport, required string path) {
		super.init(arguments.transport, arguments.path);
		
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
				addScript('jQuery(function() { jQuery.track(''_setCustomVar'', 5, ''_exclude'', true, 1); jQuery.track(''_trackPageview''); });');
				
				return 'Marking browser as <strong>excluded</strong>.';
			}
			
			// Check for inclusion flag
			if(local.theUrl.searchBoolean('include')) {
				addScript('jQuery(function() { jQuery.track(''_setCustomVar'', 5, ''_exclude'', false, 1); jQuery.track(''_trackPageview''); });');
				
				return 'Marking browser as <strong>included</strong>.';
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
