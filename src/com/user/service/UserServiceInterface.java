package com.user.service;

import javax.servlet.http.HttpSession;

import com.Form.SecurityCodeForm;
import com.Form.UserForm;
import com.Form.UserJobConfimForm;
import com.Form.UserLoginForm;
import com.entity.User;

public interface UserServiceInterface {

	String getInfor();

	String userRegister(UserForm userForm);



	String RegisterByAjax(UserForm userForm);

	String findPassword(UserLoginForm userForm);
	/**
	 * 登录退出
	 * @param userloginForm
	 * @param httpSession
	 * @return
	 */
	String logout(UserLoginForm userloginForm, HttpSession httpSession);

	String judgeCode(SecurityCodeForm securityCodeForm);

	String updatePassword(UserLoginForm userLoginForm);
	/**
	 * 获取用户的岗位
	 * @param user
	 * @return
	 */
	String getJobConfim(User user);
	/**
	 * 更新用户的体检信息
	 * @param userJobConfimForm 
	 * @param user
	 * @return
	 */
	String upadteJobConfim(UserJobConfimForm userJobConfimForm, User user);

	String getJobFeedback(UserJobConfimForm userJobConfimForm, User user);
	
	/**
	 *更新用户分会场问卷 
	 */
	String getRanchQesInfor(User user);
	String getIntentionSurvey(User user);
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	
	/**
	 * 新用户注册
	 * @param userJobConfimForm 
	 * @param httpSession
	 * @return
	 */
	String register(User user,HttpSession httpSession);
	
	String login(User userloginForm, HttpSession httpSession) ;
}
