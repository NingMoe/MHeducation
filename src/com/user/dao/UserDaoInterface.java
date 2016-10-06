package com.user.dao;

import com.Form.UserForm;
import com.Form.UserLoginForm;
import com.entity.User;

public interface UserDaoInterface {

	public String userRegister(User user);
		
	public String RegisterByAjax(UserForm userForm);

	public String saveSecurityCode(String phone, String code);

	public void deletCodeByPhone(String phone);

	public String updatePassword(UserLoginForm userLoginForm);
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	
	public String register(User user);
	
	public User login(User user);
}
