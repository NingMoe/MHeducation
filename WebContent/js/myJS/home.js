
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
				//cache_email=data.context.email;
			}else if(data.message=="noUser"){
				alert("您还未登录！");
				return false;
			}
		}
	});
	
});