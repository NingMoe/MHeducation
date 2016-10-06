package com.user.service.impl;

import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sun.misc.BASE64Encoder;

import com.Form.SecurityCodeForm;
import com.Form.UserForm;
import com.Form.UserJobConfimForm;
import com.Form.UserLoginForm;
import com.Util.tools.SmsServer;
import com.entity.User;
import com.user.dao.UserDaoInterface;
import com.user.service.UserServiceInterface;

@Service("userservice")
@Transactional
public class UserServiceImpl extends BasService implements UserServiceInterface {
	@Autowired
	UserDaoInterface userdao;
	// @Autowired
	// SecurityCodeDaoInterface userdao;
	private Logger logger = Logger.getLogger(getClass());

	public String getInfor() {
		String result = null;
		return result;
		// return "ss";
	}



	/**
	 * 通过Ajax进行注册
	 * 
	 */
	public String RegisterByAjax(UserForm userForm) {
		JSONObject json = new JSONObject();
		if (StringUtils.isNotBlank(userForm.getIdNumber())) {
			userForm.setIdNumber(userForm.getIdNumber().toLowerCase());
		}
		String result = userdao.RegisterByAjax(userForm);
		if (result.equals("exit")) {
			return generateJsonObject(json, "106", "HasExit");
		} else {
			return generateJsonObject(json, "107", "NoExit");
		}
		// 1
	}

	/**
	 * 找回密码,先判断用户是否存在
	 */
	public String findPassword(UserLoginForm userForm) {
		JSONObject json = new JSONObject();
		UserForm newuserForm = new UserForm();
		newuserForm.setPhone(userForm.getPhone());
		String result = userdao.RegisterByAjax(newuserForm);

		if (!result.equals("exit")) {
			return generateJsonObject(json, "107", "NoExit");
		}
		// 如果用户存在
		// 生产验证码
		String code = generateWord();
		logger.info("find password:" + userForm.getPhone() + ";" + code + ";"
				+ new Date());
		SmsServer smsServer = new SmsServer();
		String sendmessage = "您的验证码为";
		try {
			userdao.deletCodeByPhone(userForm.getPhone());
			result = userdao.saveSecurityCode(userForm.getPhone(), code);
			if (!result.equals("success")) {
				logger.error(userForm.getPhone() + ";" + "SaveCodeError");
				return generateJsonObject(json, "109", "SaveCodeError");
			}
			result = smsServer.SendSms(userForm.getPhone(), sendmessage + code);
			if (result.equals("success")) {
				return generateJsonObject(json, "200", "success");
			}
			logger.error(userForm.getPhone() + ";" + "SendCodeError");
			return generateJsonObject(json, "110", "SendCodeError");
		} catch (IOException e) {
			logger.error("exception:" + e);
			return generateJsonObject(json, "104", "exception");
		}
	}

	private String generateWord() {
		String[] beforeShuffle = new String[] { "0", "1", "2", "3", "4", "5",
				"6", "7", "8", "9", "a", "b", "b", "d", "e", "f", "g", "h",
				"i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
				"u", "v", "w", "x", "y", "z" };
		List list = Arrays.asList(beforeShuffle);
		Collections.shuffle(list);
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			sb.append(list.get(i));
		}
		String afterShuffle = sb.toString();
		String result = afterShuffle.substring(5, 9);
		return result;
	}

	public String logout(UserLoginForm userloginForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		if (user == null) {
			return "error";
		}
		if (StringUtils.isNotBlank(user.getPhone())) {
			logger.info("logout:" + user.getPhone());
		}
		httpSession.removeAttribute("user");
		return "success";
	}


	@Override
	public String updatePassword(UserLoginForm userLoginForm) {
		JSONObject json = new JSONObject();
		MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("MD5");
			BASE64Encoder base64en = new BASE64Encoder();
			String password = base64en.encode(md5.digest(userLoginForm.getPassword().getBytes("utf-8")));
			userLoginForm.setPassword(password);
			String result=userdao.updatePassword(userLoginForm);
			if(result.equals("success")){
				return generateJsonObject(json, "200", "success");
			}else{
				return generateJsonObject(json, "404", "error");
			}
		} catch (Exception e) {
			logger.error("eception:"+e);
			return generateJsonObject(json, "404", "error");
		}

	}

	@Override
	public String userRegister(UserForm userForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String judgeCode(SecurityCodeForm securityCodeForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getJobConfim(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String upadteJobConfim(UserJobConfimForm userJobConfimForm, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getJobFeedback(UserJobConfimForm userJobConfimForm, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getRanchQesInfor(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getIntentionSurvey(User user) {
		// TODO Auto-generated method stub
		return null;
	}
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	

	/**
	 * MHeducation
	 * */
	public String register(User user, HttpSession httpSession) {
		//获取注册时间
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
		user.setRegistration_time(df.format(new Date()));
		df = new SimpleDateFormat("yyyyMMddHHmmss");
		user.setUser_id(df.format(new Date()));
		JSONObject json = new JSONObject();
		MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("MD5");
			BASE64Encoder base64en = new BASE64Encoder();
			String password = base64en.encode(md5.digest(user.getPassword().getBytes("utf-8")));
			user.setPassword(password);
			String result=userdao.register(user);
			if(result.equals("success")){
				return generateJsonObject(json, "200", "success");
			}else{
				return generateJsonObject(json, "404", "error");
			}
		} catch (Exception e) {
			logger.error("eception:"+e);
			return generateJsonObject(json, "404", "error");
		}
	}
	
	/**
	 * 用户登录
	 * MHeducation
	 * @throws Exception
	 */
	public String login(User user, HttpSession httpSession) {
		User result = userdao.login(user);
		JSONObject json = new JSONObject();
		// 验证密码是否正确
		if (result == null) {
			return generateJsonObject(json, "102", "noUser");
		}
		MessageDigest md5;
		try {
			md5 = MessageDigest.getInstance("MD5");
			BASE64Encoder base64en = new BASE64Encoder();
			String password = base64en.encode(md5.digest(user
					.getPassword().getBytes("utf-8")));
			if (!password.equals(result.getPassword())) {
				return generateJsonObject(json, "103", "noMatch");
			} else {
				logger.info(result.getPhone() + "login success");
				result.setPassword("");
				httpSession.setAttribute("user", result);
				return generateJsonObject(json, "200", "success");
			}
		} catch (Exception e) {
			logger.error(e);
			return generateJsonObject(json, "104", "exception");
		}

	}

}
