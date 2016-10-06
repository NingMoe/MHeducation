package com.Form;

import java.util.Date;

public class UserPageForm {
	private int UserID;
	private String Email;
	private String Password;
	private String Nickname;
	private String Name;
	private String Sex;
	private String Phone;
	private String IdNumber;
	private String Diploma;
	private String Graduate_date;
	private String University;
	private String College;
	private String Special;
	private String Supervisor;
	private String Student_id;
	private String Major;
	private String totalResults;//总记录数
	private String currentPage;//当前页数
	private String pageSize;//每页的记录数
	
	
	public String getTotalResults() {
		return totalResults;
	}
	public void setTotalResults(String totalResults) {
		this.totalResults = totalResults;
	}
	public String getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(String currentPage) {
		this.currentPage = currentPage;
	}
	public String getPageSize() {
		return pageSize;
	}
	public void setPageSize(String pageSize) {
		this.pageSize = pageSize;
	}
	public String getEmail() {
		return Email;
	}
	public void setEmail(String email) {
		Email = email;
	}
	public String getDiploma() {
		return Diploma;
	}
	public void setDiploma(String diploma) {
		Diploma = diploma;
	}
	public int getUserID() {
		return UserID;
	}
	public void setUserID(int userID) {
		UserID = userID;
	}
	
	public String getPassword() {
		return Password;
	}
	public void setPassword(String password) {
		Password = password;
	}
	public String getNickname() {
		return Nickname;
	}
	public void setNickname(String nickname) {
		Nickname = nickname;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getSex() {
		return Sex;
	}
	public void setSex(String sex) {
		Sex = sex;
	}
	public String getPhone() {
		return Phone;
	}
	public void setPhone(String phone) {
		Phone = phone;
	}
	public String getIdNumber() {
		return IdNumber;
	}
	public void setIdNumber(String idNumber) {
		IdNumber = idNumber;
	}
	public String getGraduate_date() {
		return Graduate_date;
	}
	public void setGraduate_date(String graduate_date) {
		Graduate_date = graduate_date;
	}
	public String getUniversity() {
		return University;
	}
	public void setUniversity(String university) {
		University = university;
	}
	public String getCollege() {
		return College;
	}
	public void setCollege(String college) {
		College = college;
	}
	public String getSpecial() {
		return Special;
	}
	public void setSpecial(String special) {
		Special = special;
	}
	public String getSupervisor() {
		return Supervisor;
	}
	public void setSupervisor(String supervisor) {
		Supervisor = supervisor;
	}
	public String getStudent_id() {
		return Student_id;
	}
	public void setStudent_id(String student_id) {
		Student_id = student_id;
	}
	public String getMajor() {
		return Major;
	}
	public void setMajor(String major) {
		Major = major;
	}
	
}
