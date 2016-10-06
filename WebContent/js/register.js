/**
 * 注册之前进行验证
 */
$(function() {
	$("form :input.required").each(function(){
        var $required = $("<strong class='high'>*</strong>"); //创建元素
        $(this).parent().parent().find("td:first-child").append($required); //然后将它追加到文档中
    });
	 $('form :input').blur(function(){
       //验证邮箱
         if( $(this).is('#Email') ){
            if(  $(this).val()=="" ){
              	var errorMsg = '邮箱不能为空';
              	inputPopover($(this), errorMsg, 1);
  				return false;
            }
            if (!isEmail($(this).val())){
                  	var errorMsg = '请输入正确的邮箱地址.';
                  	inputPopover($(this), errorMsg, 1);
      				return false;
            }
            if(checkExist("Email",$(this).val())){
            	var errorMsg = '该邮箱地址已被注册.';
              	inputPopover($(this), errorMsg, 1);
  				return false;
            }
         }
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
         if( $(this).is('#Password_') ){
        	 if($(this).val()==""){
        			var errorMsg="重复密码不能为空"
        			inputPopover($(this), errorMsg, 1);
      				return false;
        		}
        		if($(this).val()!=$("#Password").val()) {
        			var errorMsg="两次输入的密码不一致"
        			inputPopover($(this), errorMsg, 1);
      				return false;
        		}
        		
          }
         //验证昵称
         if( $(this).is('#Nickname') ){
        	 if(  $(this).val()=="" ){
               	var errorMsg = '昵称不能为空';
               	inputPopover($(this), errorMsg, 1);
   				return false;
             }
             if(checkExist("Nickname",$(this).val())){
             	var errorMsg = '该昵称已被注册.';
               	inputPopover($(this), errorMsg, 1);
   				return false;
             }
          }
         //验证电话号码
         if( $(this).is('#Phone') ){
        	 if(  $(this).val()=="" ){
               	var errorMsg = '电话号码不能为空';
               	inputPopover($(this), errorMsg, 1);
   				return false;
             }
             if (!isPhone($(this).val())){
                   	var errorMsg = '请输入正确的电话号码.';
                   	inputPopover($(this), errorMsg, 1);
       				return false;
             }
             if(checkExist("Phone",$(this).val())){
             	var errorMsg = '该电话号码已被注册.';
               	inputPopover($(this), errorMsg, 1);
   				return false;
             }
          }
       //验证身份证号码
         if( $(this).is('#IdNumber') ){
        	 if(  $(this).val()=="" ){
               	var errorMsg = '身份证号码不能为空';
               	inputPopover($(this), errorMsg, 1);
   				return false;
             }
             if (!isIdNumber($(this).val())){
                   	var errorMsg = '请输入正确的身份证号码.';
                   	inputPopover($(this), errorMsg, 1);
       				return false;
             }
             if(checkExist("IdNumber",$(this).val())){
             	var errorMsg = '该身份证号码已被注册.';
               	inputPopover($(this), errorMsg, 1);
   				return false;
             }
          }
         
    }).focus(function(){
         $(this).triggerHandler("focus");
    });//end blur

});
function check() {

	var inputList = $("input[class='required']");
	var validateResult = validateInputList(inputList);
	if (!validateResult) {
		return false;
	}
//	var form=$("#register_form");
//	form.submit();
	// 检查昵称是否存在

	// 修改缓存中的登录用户名，清除登录密码
//	localStorage.account = $(
//			".main_content form .input-group input[name='account']").val();
//	localStorage.password = "";
	return true;
}

/**
 * 判断账号和电话，省份证号码是否已经存在
 * 
 * @param account
 */
function checkExist(name, value) {
	var exist = false;
	if(name=="Nickname"){
		$
		.ajax({
			url : "user/RegisterByAjax.do",
			type : "POST",
			async : false,
			data : {
				Nickname : value
			},
			dataType : "json",
			success : function(data) {
				if(data.message=="HasExit"){
					exist=true;
				}
				
			}
		});
	}
	if(name=="Email"){
		$
		.ajax({
			url : "user/RegisterByAjax.do",
			type : "POST",
			async : false,
			data : {
				Email : value
			},
			dataType : "json",
			success : function(data) {
				if(data.message=="HasExit"){
					exist=true;
				}
				
			}
		});
	}
	if(name=="Phone"){
		$
		.ajax({
			url : "user/RegisterByAjax.do",
			type : "POST",
			async : false,
			data : {
				Phone : value
			},
			dataType : "json",
			success : function(data) {
				if(data.message=="HasExit"){
					exist=true;
				}
				
			}
		});
	}
	if(name=="IdNumber"){
		$
		.ajax({
			url : "user/RegisterByAjax.do",
			type : "POST",
			async : false,
			data : {
				IdNumber : value
			},
			dataType : "json",
			success : function(data) {
				if(data.message=="HasExit"){
					exist=true;
				}
				
			}
		});
	}
	return exist;
}


