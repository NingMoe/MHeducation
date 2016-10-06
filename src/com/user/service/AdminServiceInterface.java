package com.user.service;

import java.util.ArrayList;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.Form.AdminFeedbackForm;
import com.Form.BookBackstageForm;
import com.Form.DefaultJobForm;
import com.Form.FeedbackPageForm;
import com.Form.FileUploadForm;
import com.Form.UserBatchForm;
import com.Form.UserPageForm;
import com.entity.AdminActivity;
import com.entity.User;
import com.entity.AdminOperation;

public interface AdminServiceInterface {

	String saveDdl(BookBackstageForm bookBackstageForm, User user);

	String getDdlname(BookBackstageForm bookBackstageForm, User user);
	
	/**
	 * 导入岗位确认信息
	 * @param fileUploadForm
	 * @param user
	 * @return
	 */
	String UploadJobConfim(FileUploadForm fileUploadForm, User user);

	String getUserByPage(UserPageForm userPageForm, User user);

	String deleteUser(UserPageForm userPageForm);

	/**
	 * 删除多条数据
	 * @param userBatchForm
	 * @return
	 */
	String deleteMoreUser(UserBatchForm userBatchForm);

	XSSFWorkbook exportJobConfim(HttpServletResponse response, HttpSession httpSession);

	/**
	 * 获取分页的岗位反馈信息
	 * @param feedbackPageForm
	 * @return
	 */
	String getallFeedbackBypage(FeedbackPageForm feedbackPageForm);
	/**
	 * 更新处理状态
	 * @param feedbackPageForm
	 * @return
	 */
	String updateFeedbackState(AdminFeedbackForm adminFeedbackForm);


	String deleteMoreFeedback(AdminFeedbackForm adminFeedbackForm);



	ArrayList<ArrayList<String>> getfeedbackExcelInfor(FeedbackPageForm feedbackPageForm);

	ArrayList<String> getExcelHead(String head);

	String getFeedBackadminInfor(AdminFeedbackForm adminFeedbackForm);

	ArrayList<ArrayList<String>> exportUserInfor(UserPageForm userPageForm);

	String saveDefaultJob(DefaultJobForm defaultJobForm, User user);

	String getDefaultJob(DefaultJobForm defaultJobForm, User user);

	/*
	 * 活动管理
	 * 
	 * */
	String getOperation(String moduleName,AdminOperation adminOperation);
	
	/**
	 * 静态管理页面
	 * 
	 * */
	String getActivity(AdminActivity adminActivity);
	
	String setActivity(AdminActivity adminActivity);
	
	String delActivity(AdminActivity adminActivity);
	
	String modifyActivity(AdminActivity adminActivity);
	
	String finishActivity(AdminActivity adminActivity);
	
	String getUser(User users);
	
	String downToCom(User users);
	
	String upToAdmin(User users);
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	

}
