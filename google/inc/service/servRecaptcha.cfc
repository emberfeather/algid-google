<cfcomponent extends="algid.inc.resource.base.service" output="false">
	<cffunction name="verify" access="public" returntype="void" output="false">
		<cfargument name="keys" type="struct" required="true" />
		<cfargument name="challenge" type="string" required="true" />
		<cfargument name="response" type="string" required="true" />
		<cfargument name="ipAddress" type="string" required="true" />
		
		<cfhttp url="https://www.google.com/recaptcha/api/verify" method="post" result="local.result">
			<cfhttpparam type="formfield" name="privatekey" value="#arguments.keys.private#" />
			<cfhttpparam type="formfield" name="remoteip" value="#arguments.ipAddress#" />
			<cfhttpparam type="formfield" name="challenge" value="#arguments.challenge#" />
			<cfhttpparam type="formfield" name="response" value="#arguments.response#" />
		</cfhttp>
		
		<cfif local.result.status_code neq 200>
			<cfthrow type="validation" message="ReCaptcha request failed" detail="Unable to verify the ReCaptcha response with the ReCaptcha Server" errorcode="recaptcha-not-reachable" />
		</cfif>
		
		<cfif listFirst(local.result.fileContent, chr(10)) neq true>
			<cfthrow type="validation" message="ReCaptcha does not match" detail="Validation for the ReCaptcha value failed" errorcode="#listLast(local.result.fileContent, chr(10))#" />
		</cfif>
	</cffunction>
</cfcomponent>
