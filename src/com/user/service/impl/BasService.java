package com.user.service.impl;

import net.sf.json.JSONObject;


public class BasService {
	
	public String generateJsonObject(JSONObject resultJsonObject, String code,
			String message) {

		resultJsonObject.put("code", code);
		resultJsonObject.put("message", message);

		return resultJsonObject.toString();
	}

	public String generateJsonObject(JSONObject resultJsonObject, String code,
			String message, Object object) {
		resultJsonObject.put("code", code);
		resultJsonObject.put("message", message);
		resultJsonObject.put("context", object);
		return resultJsonObject.toString();
	}
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	

}
