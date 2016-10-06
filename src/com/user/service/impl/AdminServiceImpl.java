package com.user.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Form.AdminFeedbackForm;
import com.Form.BookBackstageForm;
import com.Form.DefaultJobForm;
import com.Form.FeedbackPageForm;
import com.Form.FileUploadForm;
import com.Form.UserBatchForm;
import com.Form.UserPageForm;
import com.Util.tools.StaticVariables;
import com.entity.User;
import com.entity.AdminOperation;
import com.entity.AdminActivity;
import com.user.dao.AdminDaoInterface;
import com.user.service.AdminServiceInterface;

@Service("adminservice")
@Transactional
public class AdminServiceImpl extends BasService implements
		AdminServiceInterface {
	 
	@Autowired
	AdminDaoInterface admindao;
	private Logger logger = Logger.getLogger(getClass());
	/**
	 * 保存并修改数据字典
	 */
	public String saveDdl(BookBackstageForm backstageform, User user) {
		JSONObject json = new JSONObject();
		String keyword = backstageform.getKeyword();
		String[] itemname = backstageform.getDdlName();
		logger.info(user.getPhone() + " save ddl keyword=" + keyword);
		if (keyword != null) {
			String result = admindao.deleteSystemDDlWithParamsByList(keyword);
			result = admindao.saveSystemDDlWithParams(keyword, itemname);
			if (result.equals("success")) {
				return generateJsonObject(json, "200", "success");
			} else
				return generateJsonObject(json, "105", "saveFail");
		} else
			return generateJsonObject(json, "105", "saveFail");

	}

	@Override
	public String getDdlname(BookBackstageForm bookBackstageForm, User user) {
		JSONObject json = new JSONObject();
		String keyword = bookBackstageForm.getKeyword();
		String[] result = admindao.getDdlname(keyword);
		BookBackstageForm returnForm = new BookBackstageForm();
		returnForm.setDdlName(result);
		returnForm.setKeyword(keyword);
		return generateJsonObject(json, "200", "success", returnForm);

	}
	/**
	 * 读取Cell的值
	 * 
	 * @param sheet
	 * @return
	 */
	public List<Object> readCell(Row row,int length) {
		List<Object> rowlist = new ArrayList<Object>();
		for (Cell cell : row) {
//			CellReference cellRef = new CellReference(row.getRowNum(),
//					cell.getColumnIndex());
//			String key = cellRef.formatAsString();
			switch (cell.getCellType()) {
			// 字符串
			case Cell.CELL_TYPE_STRING:
				rowlist.add(cell.getRichStringCellValue().getString().trim());
				break;
			// 数字
			case Cell.CELL_TYPE_NUMERIC:
				if (DateUtil.isCellDateFormatted(cell)) {
					rowlist.add(cell.getDateCellValue());
					// map.put(key, cell.getDateCellValue());
					// System.out.println("2"+cell.getDateCellValue());
				} else {
					cell.setCellType(Cell.CELL_TYPE_STRING);
//					rowlist.add(cell.getNumericCellValue());
					rowlist.add(cell.getRichStringCellValue().getString().trim());
					// map.put(key, cell.getNumericCellValue());
					// System.out.println("3"+cell.getNumericCellValue());
				}
				break;
			// boolean
			case Cell.CELL_TYPE_BOOLEAN:
				rowlist.add(cell.getBooleanCellValue());
//				map.put(key, cell.getBooleanCellValue());
				break;
			// 方程式
			case Cell.CELL_TYPE_FORMULA:
				rowlist.add(cell.getCellFormula());
//				map.put(key, cell.getCellFormula());
				break;
			// 空值
			default:
//				System.out.println();
				rowlist.add("");
//				map.put(key, "");
			}
		}
		if(rowlist.size()!=length){
			for(int i=rowlist.size();i<length;i++){
				rowlist.add("");
			}
		}
		return rowlist;

	}


	public XSSFWorkbook exportJobConfim(HttpServletResponse response, HttpSession httpSession) {
		User user=(User) httpSession.getAttribute("user");
		response.setContentType("application/vnd.ms-excel");
		//logger.info("导出岗位分配记录模版："+user.getPhone());
		String codedFileName;
		try {
			codedFileName = java.net.URLEncoder.encode("面试进展及岗位分配记录模版", "UTF-8");
			response.setHeader("content-disposition", "attachment;filename="
					+ codedFileName + ".xlsx");
			XSSFWorkbook workbook = new XSSFWorkbook();
			XSSFSheet sheet = workbook.createSheet();
			String head[]=StaticVariables.uploadJobConfimHead.split(",");
			XSSFRow row = sheet.createRow(0);// 创建一行
			for (int i = 0; i < head.length; i++) {				
				XSSFCell cell = row.createCell(i);// 创建一列
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(head[i]);
			}
			
			return workbook;
		} catch (Exception e) {
			logger.error("exception:"+e);
			return null;
		}
		
		
	}


	@Override
	public String updateFeedbackState(AdminFeedbackForm adminFeedbackForm) {
		JSONObject json = new JSONObject();
		String result=admindao.updateFeedbackState(adminFeedbackForm);
		if(result.equals("success")){
			return generateJsonObject(json, "200", "success");
		}
		return generateJsonObject(json, "404", "error");
	}

	@Override
	public String deleteMoreFeedback(AdminFeedbackForm adminFeedbackForm) {
		JSONObject json = new JSONObject();
		String[] groupidnumber=adminFeedbackForm.getIdNumber().split(",");		
		String result = admindao.deleteMoreFeedback(groupidnumber);
		if(result.equals("success")){	
			for(String idnumber:groupidnumber){
				logger.info("deleteidnumber:"+idnumber);
			}			
			return generateJsonObject(json,"200","success");
		}else{
			return generateJsonObject(json,"111","DeleteFail");
		}
	}






	public ArrayList<String> getExcelHead(String header) {
		ArrayList<String> list=new ArrayList<String>();
		String head[]=header.split(",");
		for (int i = 0; i < head.length; i++) {				
			list.add(head[i]);
		}
		return list;
	}


	@Override
	public String saveDefaultJob(DefaultJobForm defaultJobForm, User user) {
		JSONObject json = new JSONObject();
		String result = admindao.saveDefaultJob(defaultJobForm);
		if (result.equals("success")) {
			return generateJsonObject(json, "200", "success");
		} else
			return generateJsonObject(json, "105", "saveFail");
	}
	@Override
	public String getDefaultJob(DefaultJobForm defaultJobForm, User user) {

		JSONObject json = new JSONObject();
		List<DefaultJobForm> result = admindao.getDefaultJob(defaultJobForm);
		if(result==null||result.size()==0){
			return generateJsonObject(json, "116", "noinfor");
		}else{
			json.put("resultlist", result);
			return generateJsonObject(json, "200", "success");
		}
		
		
	}

	public String getOperation(String moduleName,AdminOperation adminOperation) {
		JSONObject json = new JSONObject();
		List<AdminOperation> operation = admindao.getOperation(moduleName,adminOperation);
		/*
		 * 动态页面
		 * 
		 * */
		/*
		 * 依赖反射机制
		 * **/
//		String entityName = operation.get(0).getEntity();
//		String entityAllName ="com.entity." + operation.get(0).getEntity();
//		System.out.println(entityAllName);
//		try {
//			Class<?> tableClass = Class.forName(entityAllName);
//			Object entity = tableClass.newInstance();
//			List<?> operationDetails  = admindao.getOperationDetails(entity,entityName);
//		} catch (ClassNotFoundException | InstantiationException | IllegalAccessException | SecurityException e) {
//			System.out.println("failed to create  entity: "+entityAllName);
//			e.printStackTrace();
//		}
		String entityName = operation.get(0).getEntity();
		if(entityName.equals("AdminActivity"))
		{
			List<AdminActivity> adminActivity = admindao.getAdminActivity();
			if(adminActivity==null||adminActivity.size()==0){
				return generateJsonObject(json, "202", "noeneityinfor");
			}else{
				json.put("operationdetails", adminActivity);
				//return generateJsonObject(json, "204", "eneitysuccess");
			}
		}
		
		/*
		 * 写入json
		 * */
		if(operation==null||operation.size()==0){
			return generateJsonObject(json, "116", "noinfor");
		}else{
			json.put("operationlist", operation);
			return generateJsonObject(json, "200", "success");
		}
	}

	@Override
	public String getActivity(AdminActivity adminActivity) {
		JSONObject json = new JSONObject();
		List<AdminActivity> activitylist = admindao.getActivity(adminActivity);
		if(activitylist==null||activitylist.size()==0){
			return generateJsonObject(json, "116", "noinfor");
		}else{
			json.put("activitylist", activitylist);
			return generateJsonObject(json, "200", "success");
		}
	}

	@Override
	public String setActivity(AdminActivity adminActivity) {
		boolean is_successful = admindao.setActivity(adminActivity);
		if(is_successful)
		{
			return "successful";
		}else
		{
			return "error";
		}
	}

	@Override
	public String delActivity(AdminActivity adminActivity) {
		boolean is_successful = admindao.delActivity(adminActivity);
		if(is_successful)
		{
			return "successful";
		}else
		{
			return "error";
		}
	}

	@Override
	public String modifyActivity(AdminActivity adminActivity) {
		boolean is_successful = admindao.modifyActivity(adminActivity);
		if(is_successful)
		{
			return "successful";
		}else
		{
			return "error";
		}
	}

	@Override
	public String finishActivity(AdminActivity adminActivity) {
		boolean is_successful = admindao.finishActivity(adminActivity);
		if(is_successful)
		{
			return "successful";
		}else
		{
			return "error";
		}
	}


	@Override
	public String upToAdmin(User users) {
		JSONObject json = new JSONObject();
		int result = admindao.upToAdmin(users);
		if(result==0){
			return generateJsonObject(json, "116", "noinfor");
		}else{
			return generateJsonObject(json, "200", "success");
		}
	}

	@Override
	public String UploadJobConfim(FileUploadForm fileUploadForm, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUserByPage(UserPageForm userPageForm, User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteUser(UserPageForm userPageForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteMoreUser(UserBatchForm userBatchForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getallFeedbackBypage(FeedbackPageForm feedbackPageForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<ArrayList<String>> getfeedbackExcelInfor(
			FeedbackPageForm feedbackPageForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getFeedBackadminInfor(AdminFeedbackForm adminFeedbackForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ArrayList<ArrayList<String>> exportUserInfor(
			UserPageForm userPageForm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUser(User users) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String downToCom(User users) {
		// TODO Auto-generated method stub
		return null;
	}

/////////////////////////////MHeducation//////////////////////////////////////////////////////////	

}
