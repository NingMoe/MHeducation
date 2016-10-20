package com.Form;

import org.springframework.web.multipart.MultipartFile;

public class UserEssentialForm {

	private String email;
	private String occupation;
	private String nickname;
	private String phone;
	private String readingSchool;
	private String placeOfOrigin;
	private String collegeEntranceExaminationScores;
	private MultipartFile resume;
	private String resumeFileName;
	private MultipartFile audioFrequency;
	private String audioFrequencyFileName;
	private MultipartFile headPortrait;
	private String headPortraitFileName;
	private String uploadTime;
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getOccupation() {
		return occupation;
	}
	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getReadingSchool() {
		return readingSchool;
	}
	public void setReadingSchool(String readingSchool) {
		this.readingSchool = readingSchool;
	}
	public String getPlaceOfOrigin() {
		return placeOfOrigin;
	}
	public void setPlaceOfOrigin(String placeOfOrigin) {
		this.placeOfOrigin = placeOfOrigin;
	}
	public String getCollegeEntranceExaminationScores() {
		return collegeEntranceExaminationScores;
	}
	public void setCollegeEntranceExaminationScores(
			String collegeEntranceExaminationScores) {
		this.collegeEntranceExaminationScores = collegeEntranceExaminationScores;
	}
	public MultipartFile getResume() {
		return resume;
	}
	public void setResume(MultipartFile resume) {
		this.resume = resume;
	}
	public MultipartFile getAudioFrequency() {
		return audioFrequency;
	}
	public void setAudioFrequency(MultipartFile audioFrequency) {
		this.audioFrequency = audioFrequency;
	}
	public String getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(String uploadTime) {
		this.uploadTime = uploadTime;
	}
	public String getResumeFileName() {
		return resumeFileName;
	}
	public void setResumeFileName(String resumeFileName) {
		this.resumeFileName = resumeFileName;
	}
	public String getAudioFrequencyFileName() {
		return audioFrequencyFileName;
	}
	public void setAudioFrequencyFileName(String audioFrequencyFileName) {
		this.audioFrequencyFileName = audioFrequencyFileName;
	}
	public MultipartFile getHeadPortrait() {
		return headPortrait;
	}
	public void setHeadPortrait(MultipartFile headPortrait) {
		this.headPortrait = headPortrait;
	}
	public String getHeadPortraitFileName() {
		return headPortraitFileName;
	}
	public void setHeadPortraitFileName(String headPortraitFileName) {
		this.headPortraitFileName = headPortraitFileName;
	}
	
}
