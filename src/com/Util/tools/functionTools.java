package com.Util.tools;

import java.util.Map;

public class functionTools {

	public static String splitWithSingleQuote(String sens)
	{
		
		return "";
	}
	public static void dealMap(Map<Object, Object> map)
	{
		if(map==null)return ;
		int pageNow,pageSize;
		int start;
		pageNow=Integer.parseInt((String)map.get("pageNow"));
		pageSize=Integer.parseInt((String)map.get("pageSize"));
		//日志处理这个pageNow的异常捕获
		start =(pageNow-1)*pageSize;
		map.put("start", start);
		
		
		
	}
	public static String getUUID() {
		// TODO Auto-generated method stub
		return java.util.UUID.randomUUID().toString().replace("-", "");
	}

	
}
