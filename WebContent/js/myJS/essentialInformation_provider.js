/**
 * essentialInformation_provider.js
 * 
 * */
$(document).ready(function () { 
	$
	.ajax({
		url : "/MHeducation/user/getUserInfo.do",
		type : "POST",
		dataType : "json",
		async: false,
		success : function(data) {
			if(data.message=="success"){
				console.log(data.context);
				$("#email").val(data.context.email);
				$('#email').attr("disabled",true);
				$("#occupation").val(data.context.occupation);
				$('#occupation').attr("disabled",true);
				$("#nickname").val(data.context.nickname);
				$("#telphone").val(data.context.phone);
			}else if(data.message=="noUser"){
				alert("您还未登录！");
				return false;
			}
		}
	});
		
});

//提交全部信息
function submitUserEssentialInfo()
{
	var formData = new FormData($("#resume")[0]);
	$
	.ajax({
		url : "/MHeducation/user/perfectInformation.do",
		type : "POST",
		dataType : "json",
		data: formData,
	    contentType: false, //必须false才会避开jQuery对 formdata 的默认处理 XMLHttpRequest会对 formdata 进行正确的处理  
	    processData: false, //必须false才会自动加上正确的Content-Type
		async: false,
		success : function(data) {
			if(data.message=="success"){
				console.log(data.context);
			}else if(data.message=="noUser"){
				alert("您还未登录！");
				return false;
			}
		}
	});
}
//选取头像图片更新预览
$('#headPortrait').change(function() { 
	
	alert("input change");
	
});