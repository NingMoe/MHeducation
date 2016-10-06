package com.user.dao.impl;


import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.Form.SecurityCodeForm;
import com.Form.UserForm;
import com.Form.UserJobConfimForm;
import com.Form.UserLoginForm;
import com.entity.User;
import com.user.dao.UserDaoInterface;

@Service("userDaoImpl")
public class UserDaoImpl  extends SqlSessionDaoSupport implements UserDaoInterface{

	public String login() {
		User user=this.getSqlSession().selectOne("User.login");
		System.out.println(user);
		return user.getEmail();
	}


	public String userRegister(User user) {
		int result=this.getSqlSession().insert("User.userRegister",user);
		if(result==1){
			return "success";
		}else{
			return "error";
		}
		
	}
	public User login(User user) {
		if(StringUtils.isBlank(user.getEmail())){			
			return null;				
		}else{
			User resultUser=this.getSqlSession().selectOne("User.login",user);
			return resultUser;
			
		}

	}


	public String RegisterByAjax(UserForm userForm) {
	
		List<User> user=this.getSqlSession().selectList("User.RegisterByAjax",userForm);
		if(user.size()!=0){
			return "exit";
		}else{
			return "success";
		}
		
	}

	@Override
	public void deletCodeByPhone(String phone) {
		this.getSqlSession().delete("SecurityCode.deletCodeByPhone",phone);
		
	}


	@Override
	public String updatePassword(UserLoginForm userLoginForm) {
		int result=this.getSqlSession().update("User.updatePassword",userLoginForm);
		if(result==1){
			return "success";
		}else{			
			return "error";
		}
	}


	@Override
	public String saveSecurityCode(String phone, String code) {
		// TODO Auto-generated method stub
		return null;
	}
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	


	@Override
	public String register(User user) {
		int result=this.getSqlSession().insert("User.userRegister",user);
		if(result==1){
			return "success";
		}else{
			return "error";
		}
	}

}
