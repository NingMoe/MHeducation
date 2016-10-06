package com.entity;

import java.util.Date;

public class MH {

	private int id;
	private String parent_id;
	private String student_id;
	private String type;
	private String state;
	private Date invite_time;
	private Date receive_time;
	private String is_send_email;
	private String is_receive_email;
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
	public String getStudent_id() {
		return student_id;
	}
	public void setStudent_id(String student_id) {
		this.student_id = student_id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public Date getInvite_time() {
		return invite_time;
	}
	public void setInvite_time(Date invite_time) {
		this.invite_time = invite_time;
	}
	public Date getReceive_time() {
		return receive_time;
	}
	public void setReceive_time(Date receive_time) {
		this.receive_time = receive_time;
	}
	public String getIs_send_email() {
		return is_send_email;
	}
	public void setIs_send_email(String is_send_email) {
		this.is_send_email = is_send_email;
	}
	public String getIs_receive_email() {
		return is_receive_email;
	}
	public void setIs_receive_email(String is_receive_email) {
		this.is_receive_email = is_receive_email;
	}
	
	
}
