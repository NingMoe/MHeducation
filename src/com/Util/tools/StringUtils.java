package com.Util.tools;

/**
 * 字符串处理工具类
 */
public class StringUtils {

	/**
	 * 判断字符串是否有中文
	 * 
	 * @param str
	 * @return
	 */
	public static boolean hasChinese(String str) {
		if (str == null) {
			return false;
		}
		if (str.getBytes().length != str.length()) {
			return true;
		}
		return false; 
	}

	/**
	 * 判断字符是否�?null �?空字符串
	 * 
	 * @param str
	 * @return if "str" is null or empty then return true else return false
	 */
	public static boolean isNullOrEmpty(Object str) {
		if (str == null || str.toString().trim().equals(""))
			return true;
		else
			return false;
	}

	/**
	 * 判断字符是否�?null �?空字符串
	 * 
	 * @param str
	 * @return str
	 */
	public static String NullOrEmpty(String str) {
		String res = "";
		try {
			if (str == null){
				return "";
			}else{
				str = str.trim();
				res = new String(str.getBytes("ISO-8859-1"),"UTF-8"); 
			}
		}catch(Exception e){
			
		}
		return res;
	}

	/**
	 *  冒泡排序
	 * @param x
	 * @return
	 */
	public static int[] maoPaoSort(int[] x) {
		for (int i = 0; i < x.length; i++) {
			for (int j = i + 1; j < x.length; j++) {
				if (x[i] > x[j]) {
					int temp = x[i];
					x[i] = x[j];
					x[j] = temp;
				}
			}
		}
		return x; 
	}
}
