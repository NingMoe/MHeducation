package com.user.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Form.SecurityCodeForm;
import com.Form.UserForm;
import com.Form.UserJobConfimForm;
import com.Form.UserLoginForm;
import com.entity.User;
import com.user.service.UserServiceInterface;

@Controller
@RequestMapping("/user") 
public class UserController {
	private Logger logger = Logger.getLogger(getClass());  
	@Autowired 
	UserServiceInterface userservice;
	/**
	 * 用户进行登录
	 * @param req
	 * @param UserloginForm
	 * @return
	 */
/*	@ResponseBody
	@RequestMapping("/login.do")
	public String login(HttpServletRequest req,UserLoginForm UserloginForm,HttpSession httpSession){
		System.out.println("login.do");
		System.out.println("ID:"+UserloginForm.getUserID());
		System.out.println("Email:"+UserloginForm.getEmail());
		System.out.println("Phone:"+UserloginForm.getPhone());
		System.out.println("Password:"+UserloginForm.getPassword());
		logger.info(UserloginForm.getPhone()+" login");
		return userservice.login(UserloginForm,httpSession);
	}*/
	
	@RequestMapping("/logout.do")
	public String logout(HttpServletRequest req,UserLoginForm UserloginForm,HttpSession httpSession){
		String result=userservice.logout(UserloginForm,httpSession);
		if(result.equals("success")){
			return "login";
		}
		return "error";
	}
	@ResponseBody
	@RequestMapping("/RegisterByAjax.do")
	public String RegisterByAjax(HttpServletRequest req,UserForm userForm){
		
		return userservice.RegisterByAjax(userForm);
	}
	@RequestMapping("/test.do")
	public String test(HttpServletRequest req,HttpSession httpSession){
		User user=(User)httpSession.getAttribute("user");
		String result=userservice.getInfor();
		return result;
	}
	/**
	 * 用户注册
	 * @param req
	 * @param userForm
	 * @return
	 */
//	@ResponseBody
/*	@RequestMapping("/userRegister.do")
	public String userRegister(HttpServletRequest req,UserForm userForm,HttpSession httpSession){
		if(userservice.userRegister(userForm).equals("success")){
			return "login";
		}else{
			httpSession.setAttribute("errorMsg", "注册失败");
			return "error";
		}
		
	}*/
	@ResponseBody
	@RequestMapping("/findPassword.do")
	public String findPassword(HttpServletRequest req,UserLoginForm userForm){
		return userservice.findPassword(userForm);	
	}
	@ResponseBody
	@RequestMapping("/judgeCode.do")
	public String judgeCode(HttpServletRequest req,SecurityCodeForm securityCodeForm){
		return userservice.judgeCode(securityCodeForm);	
	}
	@ResponseBody
	@RequestMapping("/updatePassword.do")
	public String updatePassword(HttpServletRequest req,UserLoginForm userLoginForm){
		return userservice.updatePassword(userLoginForm);	
	}
	@ResponseBody
	@RequestMapping(value = "/getJobConfim.do", produces = "text/html;charset=UTF-8")
	public String getJobConfim( HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return userservice.getJobConfim(user);
	}
	@ResponseBody
	@RequestMapping(value = "/upadteJobConfim.do", produces = "text/html;charset=UTF-8")
	public String upadteJobConfim(UserJobConfimForm userJobConfimForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return userservice.upadteJobConfim(userJobConfimForm,user);
	}
	@ResponseBody
	@RequestMapping(value = "/getJobFeedback.do", produces = "text/html;charset=UTF-8")
	public String getJobFeedback(UserJobConfimForm userJobConfimForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return userservice.getJobFeedback(userJobConfimForm,user);
	}
	
	@ResponseBody
	@RequestMapping(value = "/getIntentionSurvey.do", produces = "text/html;charset=UTF-8")
	public String getIntentionSurvey(HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return userservice.getIntentionSurvey(user);
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/subranchQus_phone.do", produces = "text/html;charset=UTF-8")
	public String subranchQus_phone(HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return userservice.getIntentionSurvey(user);
		
	}
	
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	
	/**
	 * 用户进行注册
	 * MHeducation
	 * @param req
	 * @param User
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/userRegister.do")
	public String register(HttpServletRequest req,User user,HttpSession httpSession){
		user.setRole(user.getOccupation());
		return userservice.register(user,httpSession);
	}

	/**
	 * 用户进行登录
	 * MHeducation
	 * @param req
	 * @param User
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/login.do")
	public String login(HttpServletRequest req, HttpServletResponse response,User user,HttpSession httpSession){
		System.out.println(userservice.login(user,httpSession));
		return userservice.login(user,httpSession);
	}
}
