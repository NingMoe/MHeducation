package com.user.dao;

import java.util.List;

import com.Form.AdminFeedbackForm;
import com.Form.DefaultJobForm;
import com.entity.User;
import com.entity.AdminOperation;
import com.entity.AdminActivity;


public interface AdminDaoInterface {

	String deleteSystemDDlWithParamsByList(String keyword);

	String saveSystemDDlWithParams(String keyword, String[] itemname);

	String[] getDdlname(String keyword);

	String UploadJobConfim(List<Object> rowlist);

	List<User> getUserByPage(User user);

	int getAllUser(User userlist);

	String deleteUser(int userID);

	User getUserById(int userID);

	List<User> getMoreUser(int[] mreo);

	String deleteMoreUser(int[] newid);

	String deleteJobConfim();

	String updateFeedbackState(AdminFeedbackForm adminFeedbackForm);

	String deleteMoreFeedback(String[] groupidnumber);

	String saveDefaultJob(DefaultJobForm defaultJobForm);

	List<DefaultJobForm> getDefaultJob(DefaultJobForm defaultJobForm);

	List<AdminOperation> getOperation(String title, AdminOperation adminOperation);
	
	List<?> getOperationDetails(Object entity, String entityName);
	
	List<AdminActivity> getAdminActivity();
	
	
	/**
	 *静态页面
	 */
	List<AdminActivity> getActivity(AdminActivity adminActivity);
	
	boolean setActivity(AdminActivity adminActivity);
	
	boolean delActivity(AdminActivity adminActivity);
	
	boolean modifyActivity(AdminActivity adminActivity);
	
	boolean finishActivity(AdminActivity adminActivity);
	
	
	//上传图片
	boolean uploadPic(String pic_path ,String pic_name);
	
	//获取用户信息
	List<User> getUser(User user);
	
	int downToCom(User user);
	
	int upToAdmin(User user);
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	

}
