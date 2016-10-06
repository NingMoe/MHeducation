var wait = 60;

$(function() {
	$("form :input.required").each(function() {
		var $required = $("<strong class='high'>*</strong>"); // 创建元素
		$(this).parent().parent().find("td:first-child").append($required); // 然后将它追加到文档中
	});
	$("#changePassword_btn").click(function() {
		var phone = $("input#Phone").val();
		if (phone == "") {
			var errorMsg = '电话号码不能为空';
			inputPopover($("input#Phone"), errorMsg, 1);
			return false;
		}
		if (!isPhone(phone)) {
			var errorMsg = '请输入正确的电话号码.';
			inputPopover($("input#Phone"), errorMsg, 1);
			return false;
		}
		var code = $("input#Code").val();
		if (code == "") {
			var errorMsg = '验证码不能为空';
			inputPopover($("input#Code"), errorMsg, 1);
			return false;
		}
		if (!isCode(code)) {
			var errorMsg = '验证码不合法.';
			inputPopover($("input#Code"), errorMsg, 1);
			return false;
		}
		$("p#msg").text("");
		wait = -1;
		$.ajax({
			url : "user/judgeCode.do",
			type : "POST",
			// async : false,
			data : {
				Phone : phone,
				Code : code
			},
			dataType : "json",
			success : function(data) {
				if (data.message == "CodeLongtime") {
					// alert("验证码已失效，请重新获取");
					$("p#msg").text("验证码已失效，请重新获取");
					return false;
				} else if (data.message == "CodeNoMatch") {
					$("p#msg").text("验证码错误");
					return false;
				} else if (data.message == "success") {
					// location.href = "pages/changePassword.jsp";
					var form = $("<form>");// 定义一个form表单
					form.attr("style", "display:none");
					form.attr("target", "");
					form.attr("method", "post");
					form.attr("action", "pages/changePassword.jsp");
					var input1 = $("<input>");
					input1.attr("type", "hidden");
					input1.attr("name", "Phone");
					input1.attr("value", phone);

					$("body").append(form);// 将表单放置在web中
					form.append(input1);

					form.submit();// 表单提交
					form.remove();
				}

			}
		});
	});
	// 发送短信验证码
	$("#btn-verity-send").click(function() {
		var phone = $("input#Phone").val();
		if (phone == "") {
			var errorMsg = '电话号码不能为空';
			inputPopover($("input#Phone"), errorMsg, 1);
			return false;
		}
		if (!isPhone(phone)) {
			var errorMsg = '请输入正确的电话号码.';
			inputPopover($("input#Phone"), errorMsg, 1);
			return false;
		}

		$.ajax({
			url : "user/findPassword.do",
			type : "POST",
			async : false,
			data : {
				Phone : phone
			},
			dataType : "json",
			success : function(data) {
				if (data.message == "NoExit") {
					$("p#msg").text("验证码发送失败，手机号码未被注册");
					return false;
				} else if (data.message == "success") {
					time($("#btn-verity-send"))
				} else {
					// alert("验证码发送失败");
					$("p#msg").text("验证码发送失败");
					return false;
				}

			}
		});
	});
});
function time(o) {// o为按钮的对象，p为可选，这里是60秒过后，提示文字的改变
	if (wait == 0) {
		o.removeAttr("disabled");
		// o.text("获取验证码");// 改变按钮中value的值
		$("p#msg").text("如果您在1分钟内没有收到验证码，请检查您填写的手机号码是否正确或重新发送");
		wait = 60;
	} else if (wait == -1) {
		o.removeAttr("disabled");
		wait = 60;
	} else {
		o.attr("disabled", true);// 倒计时过程中禁止点击按钮
		$("p#msg").text("验证码发送成功，请注意查看手机。" + wait + "秒后重新获取验证码");
		// o.text(wait + "秒后重新获取验证码");// 改变按钮中value的值
		wait--;
		setTimeout(function() {
			time(o);// 循环调用
		}, 1000)
	}
}
/**
 * 验证验证码是否合法
 */
function isCode(inputString) {
	var partten = /^[\dA-Za-z]{4}$/;
	if (partten.test(inputString)) {
		return true;
	} else {
		return false;
	}
}