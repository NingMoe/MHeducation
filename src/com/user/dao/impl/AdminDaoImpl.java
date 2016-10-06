package com.user.dao.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

import com.Form.AdminFeedbackForm;
import com.Form.DefaultJobForm;
import com.entity.AdminActivity;
import com.entity.AdminOperation;
import com.entity.User;
import com.user.dao.AdminDaoInterface;

@Service("adminDaoImpl")
public class AdminDaoImpl  extends SqlSessionDaoSupport implements AdminDaoInterface{

	
	public String deleteSystemDDlWithParamsByList(String keyword) {
		this.getSqlSession().delete("Bookdictionary.deleteBookDictionaryBykeyword",keyword);
		return "success";

		
	}

	@Override
	public String[] getDdlname(String keyword) {		
		List<Map<Object,Object>> list=this.getSqlSession().selectList("Bookdictionary.getDdlname",keyword);
		String[] Ddlname=new String[list.size()];
		for(int i=0;i<list.size();i++){
			Map<Object,Object> map=list.get(i);
			Ddlname[i]=(String) map.get("DdlName");
		}	
		return Ddlname;
	}


	@Override
	public String UploadJobConfim(List<Object> rowlist) {
		
		return null;
	}


	@Override
	public List<User> getUserByPage(User user) {
		List<User> returnlist=this.getSqlSession().selectList("User.getUserByPage",user);
		return returnlist;
	}


	@Override
	public int getAllUser(User user) {
		int totalrows=this.getSqlSession().selectOne("User.getAllUser",user);
		return totalrows;
	}


	@Override
	public String deleteUser(int userID) {
		int result=this.getSqlSession().delete("User.deleteUser",userID);
		if(result==0){
			return "error";
		}else{
			return "success";
		}
	}


	@Override
	public User getUserById(int userID) {
		User user=this.getSqlSession().selectOne("User.getUserById",userID);
		return user;
	}


	@Override
	public List<User> getMoreUser(int[] moreUserID) {
		List<User> returnlist=this.getSqlSession().selectList("User.getMoreUser",moreUserID);
		return returnlist;
	}


	@Override
	public String deleteMoreUser(int[] newid) {
		int result=this.getSqlSession().delete("User.deleteMoreUser",newid);
		if(result==0){
			return "error";
		}else{
			return "success";
		}
	}

	@Override
	public String deleteJobConfim() {

		this.getSqlSession().delete("JobConfim.deleteJobConfim");
		this.getSqlSession().delete("JobFeedback.deleteJobFeedback");
		return null;
	}
	
	public String updateFeedbackState(AdminFeedbackForm adminFeedbackForm) {
		int result=this.getSqlSession().update("JobFeedback.updateFeedbackState",adminFeedbackForm);
		if(result!=0){
			return "success";
		}else{	
			
			return "error";
		}
		
	}


	@Override
	public String deleteMoreFeedback(String[] newidnumber) {
		int result=this.getSqlSession().delete("JobConfim.deleteMoreFeedConfim",newidnumber);	
		if(result==0){
			return "error";
		}else{
			result=this.getSqlSession().delete("JobFeedback.deleteMoreFeedback",newidnumber);
			if(result==0){
				return "error";
			}else{
				return "success";
			}
		}

	}



	@Override
	public String saveDefaultJob(DefaultJobForm defaultJobForm) {
		this.getSqlSession().delete("JobConfim.deleteDefaultJob");	
		int result=this.getSqlSession().insert("JobConfim.saveDefaultJob",defaultJobForm);
		if(result==0){
			return "error";
		}else{
			
			return "success";
		}
		
	}


	@Override
	public List<DefaultJobForm> getDefaultJob(DefaultJobForm defaultJobForm) {
		List<DefaultJobForm> jobFeedbacklist=this.getSqlSession().selectList("JobConfim.getDefaultJob");

		return jobFeedbacklist;
	}


	@Override
	public List<AdminOperation> getOperation(String title, AdminOperation adminOperation) {
		adminOperation.setBelongs(title);
		List<AdminOperation> operationList=this.getSqlSession().selectList("AdminOperation.getOperationList",adminOperation);
		return operationList;
	}


	@Override
	public List<?> getOperationDetails(Object entity, String entityName) {
		String choose = "AdminOperation.get"+entityName;
		List<?> operationDetailsList = this.getSqlSession().selectList(choose);
		return operationDetailsList;
	}


	@Override
	public List<AdminActivity> getAdminActivity() {
		List<AdminActivity> adminActivityList=this.getSqlSession().selectList("AdminOperation.getAdminActivity");
		return adminActivityList;
	}

	@Override
	public List<AdminActivity> getActivity(AdminActivity adminActivity) {
		List<AdminActivity> activitylist=this.getSqlSession().selectList("AdminOperation.getAdminActivity");
		return activitylist;
	}


	@Override
	public boolean setActivity(AdminActivity adminActivity) {
		//上传图片文件
		
		//存入数据库
		int i = this.getSqlSession().insert("AdminOperation.setActivity", adminActivity);
		if(i == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


	@Override
	public boolean delActivity(AdminActivity adminActivity) {
		int i = this.getSqlSession().delete("AdminOperation.delActivity", adminActivity);
		if(i == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


	@Override
	public boolean modifyActivity(AdminActivity adminActivity) {
		int i = this.getSqlSession().update("AdminOperation.modifyActivity", adminActivity);
		if(i == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


	@Override
	public boolean finishActivity(AdminActivity adminActivity) {
		int i = this.getSqlSession().update("AdminOperation.finishActivity", adminActivity);
		if(i == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	@Override
	public boolean uploadPic(String pic_path, String pic_name) {
		// TODO Auto-generated method stub
		return false;
	}


	@Override
	public List<User> getUser(User user) {
		List<User> userList=this.getSqlSession().selectList("AdminOperation.getUsers");
		return userList;
	}


	@Override
	public int downToCom(User user) {
		return this.getSqlSession().update("AdminOperation.downToCom", user);
	}


	@Override
	public int upToAdmin(User user) {
		return this.getSqlSession().update("AdminOperation.upToAdmin", user);
	}

	@Override
	public String saveSystemDDlWithParams(String keyword, String[] itemname) {
		// TODO Auto-generated method stub
		return null;
	}
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	

}
