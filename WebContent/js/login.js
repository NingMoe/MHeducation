


$(function(){
	$("form :input.required").each(function(){
        var $required = $("<strong class='high'>*</strong>"); //创建元素
        $(this).parent().parent().find("td:first-child").append($required); //然后将它追加到文档中
    });
	$("#login_btn").click(function(){
		var inputList = $("input[class='required']");
		var validateResult = validateInputList(inputList);
		if (!validateResult) {
			return false;
		}
		var account=$("input#account").val();
		var password=$("input#password").val();
		if(account.match(/@/g)){
			$
			.ajax({
				url : "user/login.do",
				type : "POST",
				async : false,
				data : {
					Email : account,password:password
				},
				dataType : "json",
				success : function(data) {
					if(data.message=="success"){
						location.href = "pages/home.jsp"
					}else if(data.message=="noMatch"){
						alert("账号和密码不匹配。");
						return false;
					}else if(data.message=="noUser"){
						alert("账号不存在。");
						return false;
					}
					
				}
			});
		}else{
			$
			.ajax({
				url : "user/login.do",
				type : "POST",
				async : false,
				data : {
					Phone : account,password:password
				},
				dataType : "json",
				success : function(data) {
					if(data.message=="success"){
						location.href = "pages/home.jsp"
					}else if(data.message=="noMatch"){
						alert("账号和密码不匹配。");
						return false;
					}else if(data.message=="noUser"){
						alert("账号不存在。");
						return false;
					}
					
				}
			});
		}
		
	})
	$("#forgetPassword_btn").click(function(){
		location.href = "pages/forgetPassword.jsp"
	});
});