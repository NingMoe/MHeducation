package com.Util.tools;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import net.sf.json.JSONObject;

/**
 * 简单的JSON工具类
 * 也可使用---> JSON-lib-jdk15.jar中提供的方法， 该jar包已经导入
 */
public class JsonUtils
{
	private Map<String, Object> jsonMap = new HashMap<String, Object>();
	private static SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-mm-dd");
	/**
	 * 清除JSONObject
	 */
	public void clear()
	{
		this.jsonMap.clear();
	}

	/**
	 * 
	 * @param key 
	 * @param value  
	 * @return jsonMap
	 */
	public Map<String, Object> put(String key, Object value)
	{
		this.jsonMap.put(key, value);
		return this.jsonMap;
	}
	  public Map<String, Object> getMap() {  
	        return this.jsonMap;  
	    }  
	/**
	 * 判断是否加引号
	 * @param value
	 * @return
	 */
	private static boolean isNoQuote(Object value)
	{
		return (value instanceof Integer || value instanceof Boolean || value instanceof Double || value instanceof Float || value instanceof Short
				|| value instanceof Long || value instanceof Byte);
	}

	public static boolean isQuote(Object value){
		return (value instanceof String||value instanceof Character);
	}

	 /** 
	  * 重写toString方法
	  * 返回类型{"apple":"red","lemon":"yellow"}
      */ 
	   @SuppressWarnings("unchecked")
	   @Override
	    public String toString() {  
	        StringBuffer sb = new StringBuffer();  
	        sb.append("{");  
	        Set<Entry<String, Object>> set = jsonMap.entrySet();  
	        for (Entry<String, Object> entry : set) {  
	            Object value = entry.getValue();  
	            if (value == null) {  
	                continue;
	            }  
	            sb.append("\"").append(entry.getKey()).append("\":");  
	            if (value instanceof JsonUtils) {  
	                sb.append(value.toString());  
	            } else if (isNoQuote(value)) {  
	                sb.append(value);  
	            } else if (value instanceof Date) {  
	                sb.append("\"").append(simpleDateFormat.format(value)).append("\"");  
	            } else if (isQuote(value)) {  
	                sb.append("\"").append(value).append("\"");  
	            } else if (value.getClass().isArray()) {  
	                sb.append(ArrayToStr((int[]) value));  
	            } else if (value instanceof Map) {  
	                sb.append(fromObject((Map<String, Object>) value).toString());  
	            } else if (value instanceof List) {  
	                sb.append(ListToStr((List<Object>) value));  
	            } else {  
	                sb.append(fromObject(value).toString());  
	            }  
	            sb.append(",");  
	        }  
	        int len = sb.length();  
	        if (len > 1) {  
	            sb.delete(len - 1, len);  
	        }  
	        sb.append("}");  
	        return sb.toString();  
	    }  
	   
	   /**
	    * 将数组转换为JSON格式
	    * @param array
	    * @return
	    */
	    public static String ArrayToStr(Object array) {  
	        if (!array.getClass().isArray())  
	            return "[]";  
	        StringBuffer sb = new StringBuffer();  
	        sb.append("[");  
	        int len = Array.getLength(array);  
	        Object v = null;  
	        for (int i = 0; i < len; i++) {  
	            v = Array.get(array, i);  
	            if (v instanceof Date) {  
	               sb.append("\"").append(simpleDateFormat.format(v)).append("\"").append(",");  
	            } else if (isQuote(v)) {  
	                sb.append("\"").append(v).append("\"").append(",");  
	            } else if (isNoQuote(v)) {  
	                sb.append(i).append(",");  
	            } else {  
	                sb.append(fromObject(v)).append(",");  
	            }  
	        }  
	        len = sb.length();  
	        if (len > 1)  
	            sb.delete(len - 1, len);  
	        sb.append("]");  
	        return sb.toString();  
	    } 
	  
	    /**
	     * 将LIST转换为JSON格式
	     * @param <T>
	     * @param list 
	     * @return 字符串
	     */
	    @SuppressWarnings({ "unchecked", "rawtypes" })
		public static <T> String ListToStr(List<T> list) {  
	        if (list == null){  
	            return null;  
	        }
	        StringBuffer sb = new StringBuffer();  
	        sb.append("[");  
	        Object value = null;  
	        for (java.util.Iterator<Object> it = (Iterator<Object>) list.iterator(); it.hasNext();) {  
	            value = it.next();  
	            if (value instanceof Map) {  
	                sb.append(fromObject((Map) value).toString()).append(",");  
	            } else if (isNoQuote(value)) {  
	                sb.append(value).append(",");  
	            } else if (isQuote(value)) {  
	                sb.append("\"").append(value).append("\"").append(",");  
	            } else {  
	                sb.append(fromObject(value).toString()).append(",");  
	            }  
	        }  
	        int len = sb.length();  
	        if (len > 1)  
	            sb.delete(len - 1, len);  
	        sb.append("]");  
	        return sb.toString();  
	    }  
	    
	    /** 
	     * 将JavaBean转换为JSONUtils
	     * @param object 
	     * @return 
	     */  
	    @SuppressWarnings("unchecked")  
	    public static JsonUtils fromObject(Object bean) {  
	        JsonUtils json = new JsonUtils();  
	        if (bean == null){  
	            return json;  
	        }
			@SuppressWarnings("rawtypes")
			Class cls = bean.getClass();  
	        Field[] fs = cls.getDeclaredFields();  
	        Object value = null;  
	        String fieldName = null;  
	        Method method = null;  
	        int len = fs.length;  
	        for (int i = 0; i < len; i++) {  
	            fieldName = fs[i].getName();  
	            try {  
	                method = cls.getMethod(getGetter(fieldName), (Class[]) null);  
	                value = method.invoke(bean, (Object[]) null);  
	            } catch (Exception e) {    
	                continue;  
	            }  
	            json.put(fieldName, value);  
	        }  
	        return json;  
	    } 
	    
	    /** 
	     * 将Map类型转换为JsonUtils
	     * @param map 
	     * @return 
	     */  
	    public static JsonUtils fromObject(Map<String, Object> map) {  
	       JsonUtils json = new JsonUtils();  
	        if (map == null) { 
	            return json;  
	        }
	        json.getMap().putAll(map);
	        return json;  
	    }  
	    
	    private static String getGetter(String property) {  
	        return "get" + property.substring(0, 1).toUpperCase()  
	                + property.substring(1, property.length());  
	    }  
	    
	    /**
		 * 将JSON格式数据转换为 Map
		 * @param jsonData
		 * @return
		 */ 
		public  static Map<Object,Object> generateMapFromJson(String jsonData){
			Map<Object,Object> map = generateMap(jsonData);
			return map;
		}
		
		/**
		 * 将JSON格式数据转换为 Map
		 * 此方法是封装分页时所需的Map参数.
		 * @param jsonData
		 * @return
		 */

		protected static Map<Object,Object> generateMap(String jsonData){
			Map<Object,Object> map = null; 
			if(!StringUtils.isNullOrEmpty(jsonData)){
				//将前天输入的json字符串格式转换为Map
				JSONObject  jasonObject = null;
				try{
					jsonData = jsonData.replace("#＆#", "&"); 
					jsonData = jsonData.replace("#﹪#", "%");
					jasonObject = JSONObject.fromObject(jsonData);
				}catch(Exception e){
					System.err.println("*************** 无效的JSON格式数据. ****************");
					e.printStackTrace();
				}
				//将jasonObject转换为Map
				map = JsonUtils.getMapFromJSON(jasonObject); 
			}else{
				map = new HashMap<Object,Object>();
			} 
			return map;
		}
	    

		/**
		 * 把JSONObject对象转成java Map
		 * 
		 * @return
		 */
		public static Map<Object , Object> getMapFromJSON(JSONObject jsonObj) {
			Map<Object , Object> map = new HashMap<Object , Object>();
			Iterator<?> keys = jsonObj.keys();
			String key;
			Object value;
			while (keys.hasNext()) {
				key = (String) keys.next();
				value = jsonObj.get(key);
				map.put(key, value);
			}
			return map;
		}
}

