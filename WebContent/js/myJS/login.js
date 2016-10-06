$(document).ready(function () { 
	
	$("#login_submit").click(function(){
		//获得是否记住
		var aNods = $("#remember > div");
		var is_remember = aNods.attr("aria-checked");
		
		$
		.ajax({
			url : "/MHeducation/user/login.do",
			type : "POST",
			data : {
				email : $("#email").val(),
				password:$("#password").val()
			},
			dataType : "json",
			success : function(data) {
				if(data.message=="success"){
					window.location.href="/MHeducation/MPersonal/home.html";
				}else if(data.message=="noMatch"){
					alert("账号和密码不匹配。");
					return false;
				}else if(data.message=="noUser"){
					alert("账号不存在。");
					return false;
				}
				
			}
		});
	});
	
});