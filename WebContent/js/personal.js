/**
 * 注册之前进行验证
 */

$(function() {
	//$('textarea#remark').attr('placeholder','200字数以内');
	var wordsize;
	$
	.ajax({
		url : "user/getJobConfim.do",
		type : "get",
		//async : false,
		data : {},
		dataType : "json",
		success : function(data) {
			if(data.message=="noLogin"){
				alert("请先登录");
				//location.href="pages/login.jsp";
				return false;
			}else if(data.message=="noInfor"){
				//$('table.interview_details_table tbody').css('display','none');
				$('#remark').attr("readonly",true);
				$('#tips').text("无您的相关面试信息");
				return false;
			}else if(data.message=="success"){
				var recurit=data.returnlist;
				$('#interviewTime').text(recurit.interviewTime);
				$('#interviewLocation').text(recurit.interviewLocation);
				$('#interviewStatus').text(recurit.interviewStatus);
				$('#offerStatus').text(recurit.offerStatus);
				$('#signingTime').text(recurit.signingTime);
				$('#signPlace').text(recurit.signPlace);
/*				$('#employment').text(recurit.employment);
				$('#recommendation').text(recurit.recommendation);
				$('#soreTranscript').text(recurit.soreTranscript);
				$('#sixCertificate').text(recurit.sixCertificate);
				$('#IDCopy').text(recurit.IDCopy);
				$('#tripartite').text(recurit.tripartite);
				
				$('#workPosition').text(recurit.workPosition);
				$('#settledPlace').text(recurit.settledPlace);
				$('#firstJob').text(recurit.firstJob);
				$('#secondJob').text(recurit.secondJob);
				$('#signJobTwo').text(recurit.signJobTwo);
				$('#totalsalary').text(recurit.totalsalary);
				$('#floatingQuota').text(recurit.floatingQuota);
				$('#signingJobTitle').text(recurit.signingJobTitle);*/
			}
			
		}
	});
	$
	.ajax({
		url : "user/getJobFeedback.do",
		type : "get",
		//async : false,
		data : {},
		dataType : "json",
		success : function(data) {
			if(data.message=="noLogin"){
				alert("请先登录");
				location.href="pages/login.jsp";
				return false;
			}else if(data.message=="noInfor"){
//				$('table.interview_details_table').css('display','none');
//				var p="<p>无您的相关面试信息</p>";
//				$('.interview_details').append(p);
				
				return false;
			}else if(data.message=="success"){
				var recurit=data.returnlist;
				if(recurit.userFeedBack!=""){
					$('#remark').val(recurit.userFeedBack);
					$('#remark').attr("readonly",true);
				}else{
					$('button#apply').css('display','block');
				}
				
				var tips=recurit.inforstate;
				if(tips=="无"){
					$('#tips').text("如您对现有信息有不同想法，请在下面备注中填写您的意向并提交申请");
				}else if(tips=="未处理"){
					$('#tips').text("您提交的申请还未处理，请等待……");
				}else if(tips=="申请通过"){
					$('#tips').text("您提交的申请已通过审核");
				}else if(tips=="申请未通过"){
					$('#tips').text("您提交的申请未通过审核");
				}
				
			}
			
		}
	});

	$.ajax({
		type : "get",
		dataType : "json",
		url : "admin/getDefaultJob.do",
		data : {}, // "wherePageCount" + where,个人建议不用这种方式
		async : false,
		success : function(msg) {
			if (msg.message === "success") {
				$.each( msg.resultlist, function(i, item)
				{  
					$('textarea#remark').attr('placeholder',item.number+'个字数以内');
					$('#info').text(item.jobinfor);
					wordsize=item.number;
				});
			}
		},
		error : function(msg) {
			alert(msg);
		}
	});
	$("button#apply").click(function() {
		var userFeedBack=$('#remark').val();
		if($('#tips').text() != "如您对现有信息有不同想法，请在下面备注中填写您的意向并提交申请")
		{
			alert("您已经提交过申请了，请耐心等待...");
			return false;
		}
		if (confirm('只有一次提交申请机会，确定填写这些内容提交吗？')) {
		$
		.ajax({
			url : "user/upadteJobConfim.do",
			type : "get",
			//async : false,
			data : {userFeedBack:userFeedBack},
			dataType : "json",
			success : function(data) {
				if(data.message=="noLogin"){
					alert("请先登录");
					location.href="pages/login.jsp";
					return false;
				}else if(data.message=="error"){
					alert('提交失败')
					return false;
				}else if(data.message=="success"){
					alert('提交成功')
					location.href="pages/personal.jsp";
				}
				
			}
		});
		}
	});
	
	$(document).bind('propertychange input', function () { 
		var str=$('textarea#remark').val()
        var counter =str.length;
        if(counter>wordsize){
        	$('textarea#remark').val(str.substring(0,wordsize))
        	inputPopover($('textarea#remark'),"字数超过限制",1);
    		return false;
        }
          
});
});
