component extends="algid.inc.resource.base.event" {
	public void function on404( required struct transport, required component content ) {
		local.template = arguments.transport.theRequest.managers.singleton.getTemplate();
		
		local.template.addScripts( arguments.transport.theRequest.webRoot & 'plugins/google/script/404-min.js' );
	}
}
