package com.entity;

import java.util.Date;

public class ParentNeed {

	private int id;
	private String parent_id;
	private String public_time;
	private String need_subject;
	private String wish_hourly_wage;
	private Date is_completed;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getParent_id() {
		return parent_id;
	}
	public void setParent_id(String parent_id) {
		this.parent_id = parent_id;
	}
	public String getPublic_time() {
		return public_time;
	}
	public void setPublic_time(String public_time) {
		this.public_time = public_time;
	}
	public String getNeed_subject() {
		return need_subject;
	}
	public void setNeed_subject(String need_subject) {
		this.need_subject = need_subject;
	}
	public String getWish_hourly_wage() {
		return wish_hourly_wage;
	}
	public void setWish_hourly_wage(String wish_hourly_wage) {
		this.wish_hourly_wage = wish_hourly_wage;
	}
	public Date getIs_completed() {
		return is_completed;
	}
	public void setIs_completed(Date is_completed) {
		this.is_completed = is_completed;
	}
	
	

}
