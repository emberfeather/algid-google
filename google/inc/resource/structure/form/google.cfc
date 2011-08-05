component extends="cf-compendium.inc.resource.structure.form.common" {
	/**
	 * Creates a map for plotting a coordinate.
	 **/
	public string function elementCoordinate(required struct element) {
		if(!structKeyExists(arguments.element, 'data')) {
			arguments.element.data = {};
		}
		
		if(!structKeyExists(arguments.element, 'class')) {
			arguments.element.class = '';
		}
		
		arguments.element.data['lat'] = arguments.element.value.lat;
		arguments.element.data['lng'] = arguments.element.value.lng;
		
		arguments.element.class &= 'coordinate ';
		
		local.formatted = '<div ';
		
		local.formatted &= variables.attributes.attributesHtml(arguments.element);
		
		// Add additional attributes
		local.formatted &= '></div>';
		
		local.ele = {
			class: 'lat',
			type: 'hidden',
			id: arguments.element.id & '-lat',
			name: arguments.element.name & '.lat',
			value: arguments.element.value.lat
		};
		
		local.formatted &= elementInput(local.ele);
		
		local.ele = {
			class: 'lng',
			type: 'hidden',
			id: arguments.element.id & '-lng',
			name: arguments.element.name & '.lng',
			value: arguments.element.value.lng
		};
		
		local.formatted &= elementInput(local.ele);
		
		return local.formatted;
	}
}
