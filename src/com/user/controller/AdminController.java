package com.user.controller;


import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.Form.AdminFeedbackForm;
import com.Form.BookBackstageForm;
import com.Form.DefaultJobForm;
import com.Form.FeedbackPageForm;
import com.Form.FileUploadForm;
import com.Form.UserBatchForm;
import com.Form.UserPageForm;
import com.Util.tools.ExcelFileGenerator;
import com.Util.tools.StaticVariables;
import com.entity.AdminActivity;
import com.entity.User;
import com.entity.AdminOperation;
import com.user.service.AdminServiceInterface;

@Controller
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	AdminServiceInterface adminservice;
	

	/**
	 * 保存数据字典
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/saveDdl.do")
	public String saveDdl(HttpServletRequest req,
			BookBackstageForm bookBackstageForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return adminservice.saveDdl(bookBackstageForm, user);
	}
	/**
	 * 保存数据字典
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/saveDefaultJob.do")
	public String saveDefaultJob(HttpServletRequest req,
			DefaultJobForm defaultJobForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return adminservice.saveDefaultJob(defaultJobForm, user);
	}
	/**
	 * 保存数据字典
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getDefaultJob.do", produces = "text/html;charset=UTF-8")
	public String getDefaultJob(HttpServletRequest req,
			DefaultJobForm defaultJobForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return adminservice.getDefaultJob(defaultJobForm, user);
	}

	/**
	 * 招聘岗位确认上传excel
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/uploadJobConfim.do")
	public String UploadJobConfim(HttpServletRequest req,
			FileUploadForm fileUploadForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return adminservice.UploadJobConfim(fileUploadForm, user);
	}

	/**
	 * 导出招聘岗位的模版
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportJobConfim.do")
	public void exportJobConfim(HttpServletRequest req,
			HttpServletResponse response, HttpSession httpSession)
			throws IOException {
		XSSFWorkbook result = adminservice.exportJobConfim(response,
				httpSession);
		OutputStream fOut = response.getOutputStream();
		result.write(fOut);
		fOut.flush();
		fOut.close();
	}

	/**
	 * 根据keyword获取数据项
	 * 
	 * @param req
	 * @param bookBackstageForm
	 * @param httpSession
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getDdlname.do", produces = "text/html;charset=UTF-8")
	public String getDdlname(HttpServletRequest req,
			BookBackstageForm bookBackstageForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return adminservice.getDdlname(bookBackstageForm, user);
	}

	@ResponseBody
	@RequestMapping(value = "/getUserByPage.do", produces = "text/html;charset=UTF-8")
	public String getUserByPage(HttpServletRequest req,
			UserPageForm userPageForm, HttpSession httpSession) {
		User user = (User) httpSession.getAttribute("user");
		return adminservice.getUserByPage(userPageForm, user);
	}

//	@ResponseBody
//	@RequestMapping(value = "/getInterviewExcel.do", produces = "text/html;charset=UTF-8")
//	public String getInterviewExcel(HttpServletRequest req,
//			UserPageForm userPageForm, HttpSession httpSession) {
//		User user = (User) httpSession.getAttribute("user");
//		return adminservice.getUserByPage(userPageForm, user);
//	}

	@ResponseBody
	@RequestMapping(value = "/deleteMoreUser.do", produces = "text/html;charset=UTF-8")
	public String deleteMoreUser(UserBatchForm userBatchForm) {

		return adminservice.deleteMoreUser(userBatchForm);
	}

	@ResponseBody
	@RequestMapping(value = "/getallFeedback.do", produces = "text/html;charset=UTF-8")
	public String getallFeedback(FeedbackPageForm feedbackPageForm) {

		return adminservice.getallFeedbackBypage(feedbackPageForm);
	}

	@ResponseBody
	@RequestMapping(value = "/updateFeedbackState.do", produces = "text/html;charset=UTF-8")
	public String updateFeedbackState(AdminFeedbackForm adminFeedbackForm) {

		return adminservice.updateFeedbackState(adminFeedbackForm);
	}

	@ResponseBody
	@RequestMapping(value = "/deleteMoreFeedback.do", produces = "text/html;charset=UTF-8")
	public String deleteMoreFeedback(AdminFeedbackForm adminFeedbackForm) {

		return adminservice.deleteMoreFeedback(adminFeedbackForm);
	}
	@ResponseBody
	@RequestMapping(value = "/getFeedBackadminInfor.do", produces = "text/html;charset=UTF-8")
	public String getFeedBackadminInfor(AdminFeedbackForm adminFeedbackForm) {

		return adminservice.getFeedBackadminInfor(adminFeedbackForm);
	}

	/**
	 * 导出岗位反馈意见
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportJobConfimInfor.do")
	public void exportJobConfimInfor(FeedbackPageForm feedbackPageForm,
			HttpServletResponse response, HttpSession httpSession) {
		// 获取导出的表头和数据
		// 获取表头,存放到ArrayList filedName对象中(登录名 用户姓名 性别 联系电话 是否在职)
		ArrayList<String> filedName = adminservice.getExcelHead(StaticVariables.uploadJobFeedBack);
		ArrayList<ArrayList<String>> filedData = adminservice
				.getfeedbackExcelInfor(feedbackPageForm);
		OutputStream out;
		try {
			out = response.getOutputStream();
			// 重置输出流
			response.reset();
			response.setHeader("Content-disposition", "attachment;filename=\""
					+ new String(("导出信息.xls").getBytes("GBK"), "ISO-8859-1") + "\"");
			// 设置导出Excel报表的导出形式
			response.setContentType("application/vnd.ms-excel;charset=UTF-8");
			ExcelFileGenerator generator = new ExcelFileGenerator(filedName,
					filedData);
			generator.expordExcel(out);
			System.setOut(new PrintStream(out));
			out.flush();
			out.close();
		} catch (Exception e) {			
			e.printStackTrace();
		}
		
	}
	/**
	 * 导出岗位反馈意见
	 * 
	 * @param req
	 * @param UserloginForm
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "/exportUserInfor.do")
	public void exportUserInfor(UserPageForm userPageForm,
			HttpServletResponse response, HttpSession httpSession) {
		// 获取导出的表头和数据
		// 获取表头,存放到ArrayList filedName对象中(登录名 用户姓名 性别 联系电话 是否在职)
		ArrayList<String> filedName = adminservice.getExcelHead(StaticVariables.UserInforHead);
		ArrayList<ArrayList<String>> filedData = adminservice
				.exportUserInfor(userPageForm);
	
		OutputStream out;
		try {
			out = response.getOutputStream();
			// 重置输出流
			response.reset();
			response.setHeader("Content-disposition", "attachment;filename=\""
					+ new String(("注册信息导出.xls").getBytes("GBK"), "ISO-8859-1") + "\"");
			// 设置导出Excel报表的导出形式
			response.setContentType("application/vnd.ms-excel;charset=UTF-8");
			ExcelFileGenerator generator = new ExcelFileGenerator(filedName,
					filedData);
			generator.expordExcel(out);
			System.setOut(new PrintStream(out));
			out.flush();
			out.close();
		} catch (Exception e) {			
			e.printStackTrace();
		}
		
	}
	/*
	 * 动态获取管理活动
	 * */
	@ResponseBody
	@RequestMapping(value = "/getManageModuleByTitle.do", produces = "text/html;charset=UTF-8")
	public String getManageModuleByTitle(HttpServletRequest req,
			AdminOperation adminOperation, HttpSession httpSession) {
		//1.检查权限，若权限不足则返回错误。
		//2.获得操作的图片路径并返回
		User user = (User) httpSession.getAttribute("user");
		String moduleName = req.getParameter("title");
		if(moduleName.equals("校园活动管理") || moduleName.equals("社会招聘管理")|| moduleName.equals("武研新闻管理")|| moduleName.equals("华为俱乐部管理"))
		{
			return adminservice.getOperation(moduleName,adminOperation);
		}
		else
		{
			return null;
		}
		
	}
	
	/*
	 * 
	* 动态生成活动管理
	* */
	@ResponseBody
	@RequestMapping(value = "/getActivity.do", produces = "text/html;charset=UTF-8")
	public String getActivity(HttpServletRequest req,
			AdminActivity adminActivity, HttpSession httpSession) {
			return adminservice.getActivity(adminActivity);			
		}
	/*
	 * 
	 * 新建活动
	 * */
	@RequestMapping(value = "/createActivity.do", produces = "text/html;charset=UTF-8")
	public String test(HttpServletRequest req,ModelMap model,
			AdminActivity adminActivity, HttpSession httpSession) {
		    //上传图片
			String ctxPath = req.getSession().getServletContext().getRealPath("")+ File.separator + "upload"+File.separator;

			try {
				MultipartFile uploadFile = adminActivity.getPicture();
				String filename = uploadFile.getOriginalFilename();
				//如果服务器已存和上传文件同名的文件，则输出提示信息
				File temFile = new File(uploadFile +filename );
				if(temFile.exists())
				{
					boolean delResult = temFile.delete();
					System.out.println("删除已存在的文件 : " + delResult);
				}
				//开始保存文件到服务器
				if(!filename.equals(""))
				{
					File file = new File(ctxPath+ File.separator +filename);
					adminActivity.setPoster(filename);
					uploadFile.transferTo(file);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			//存储数据库
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			adminActivity.setPublish_time(df.format(new Date()));
			if(adminservice.setActivity(adminActivity).equals("successful"))
		    {
		    	 return "admin/manage_activity";
		    }
		    else
		    {
		    	return "admin/create_activity";
		    }
		
		}
	/*
	 * 
	 * 删除活动
	 * */
	@RequestMapping(value = "/deleteActivity.do", produces = "text/html;charset=UTF-8")
	public String deleteActivity(HttpServletRequest req,
			AdminActivity adminActivity, HttpSession httpSession) {
			adminActivity.setId(Integer.valueOf(req.getParameter("activity_id")));
			if(adminservice.delActivity(adminActivity).equals("successful"))
		    {
		    	 return "admin/manage_activity";
		    }
		    else
		    {
		    	return "admin/read_activity";
		    }
		
		}
	/*
	 * 
	 * 修改活动
	 * */
	@RequestMapping(value = "/modifyActivity.do", produces = "text/html;charset=UTF-8")
	public String modifyActivity(HttpServletRequest req,ModelMap model,
			AdminActivity adminActivity, HttpSession httpSession) {
	    //上传图片
		String ctxPath = req.getSession().getServletContext().getRealPath("")+ File.separator + "upload"+File.separator;

		try {
			MultipartFile uploadFile = adminActivity.getPicture();
			String filename = uploadFile.getOriginalFilename();
			//如果服务器已存和上传文件同名的文件，则输出提示信息
			File temFile = new File(uploadFile +filename );
			if(temFile.exists())
			{
				boolean delResult = temFile.delete();
				System.out.println("删除已存在的文件 : " + delResult);
			}
			//开始保存文件到服务器
			if(!filename.equals(""))
			{
				File file = new File(ctxPath+ File.separator +filename);
				adminActivity.setPoster(filename);
				uploadFile.transferTo(file);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		//存入数据库
			adminActivity.setId(Integer.valueOf(req.getParameter("activity_id")));
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			adminActivity.setPublish_time(df.format(new Date()));
			if(adminservice.modifyActivity(adminActivity).equals("successful"))
		    {
		    	 return "admin/manage_activity";
		    }
		    else
		    {
		    	return "admin/modify_activity";
		    }
		
		}
	/*
	 * 
	 * 结束活动
	 * */
	@RequestMapping(value = "/finishActivity.do", produces = "text/html;charset=UTF-8")
	public String finishActivity(HttpServletRequest req,
			AdminActivity adminActivity, HttpSession httpSession) {
			adminActivity.setId(Integer.valueOf(req.getParameter("activity_id")));
			if(adminservice.finishActivity(adminActivity).equals("successful"))
		    {
		    	 return "admin/manage_activity";
		    }
		    else
		    {
		    	return "admin/modify_activity";
		    }
		
		}		
	/*
	 * 
	 * 获得用户
	 * */
	@ResponseBody
	@RequestMapping(value = "/getUser.do", produces = "text/html;charset=UTF-8")
	public String getUser(HttpServletRequest req,
			User users, HttpSession httpSession) {
		return adminservice.getUser(users);
		}
/////////////////////////////MHeducation//////////////////////////////////////////////////////////	
}
