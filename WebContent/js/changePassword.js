
$(function() {
	$("form :input.required").each(function() {
		var $required = $("<strong class='high'>*</strong>"); // 创建元素
		$(this).parent().parent().find("td:first-child").append($required); // 然后将它追加到文档中
	});
	$('form :input').blur(function(){
	       
	         //验证密码
	         if( $(this).is('#Password') ){
	        	 if($(this).val()==""){
	        			var errorMsg="密码不能为空"
	        			inputPopover($(this), errorMsg, 1);
	      				return false;
	        		}
	        	
	        		if($(this).val().length < 8) {
	        			var errorMsg="至少含有8个字符"
	        			inputPopover($(this), errorMsg, 1);
	      				return false;
	        		}
	        		if(!($(this).val().match(/\d+/g))) {
	        			var errorMsg="必须含有数字"
	        			inputPopover($(this), errorMsg, 1);
	      				return false;
	        		}
	        		if(!($(this).val().match(/[A-Za-z]+/g))){
	        			var errorMsg="必须含有字母"
	        			inputPopover($(this), errorMsg, 1);
	      				return false;
	        		    }
	          }
	        
	         
	        
	         
	    }).focus(function(){
	         $(this).triggerHandler("focus");
	    });//end blur
	$("#save_btn").click(function() {
		var inputList = $("input[class='required']");
		var validateResult = validateInputList(inputList);
		if (!validateResult) {
			return false;
		}
		if($("input#Password_").val()!=$("#Password").val()) {
			var errorMsg="两次输入的密码不一致"
			inputPopover($("input#Password_"), errorMsg, 1);
				return false;
		}
		var phone=$("input#Phone").val();
		var password=$("input#Password").val();
		$.ajax({
			url : "user/updatePassword.do",
			type : "POST",
			 async : false,
			data : {
				Phone : phone,
				Password : password
			},
			dataType : "json",
			success : function(data) {
				if (data.message == "success") {
					location.href = "pages/changePasswordSuccess.jsp";
				} else {
					alert("修改失败")
					return false;
				} 

			}
		});
	});
});	