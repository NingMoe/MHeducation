package com.user.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Form.UserLoginForm;

@Controller
@RequestMapping("/base") 
public class BaseController {

	/**
	 * 检测用户是否登录
	 * @param req
	 * @param UserloginForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/home.do")
	public void login(HttpServletRequest req,UserLoginForm UserloginForm,HttpSession httpSession){
		System.out.println("home.do");

	}
}
