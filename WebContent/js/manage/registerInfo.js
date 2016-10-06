
function bindPager(pageIndex) {
	// 填充分布控件信息

	var pageCount = parseInt($("#lblPageCount").text()); // 总页数
	if (pageCount === 0) {
		document.getElementById("lblCurent").innerHTML = "0";
	} else {
		if (pageIndex > pageCount) {
			$("#lblCurent").text(1);
		} else {
			$("#lblCurent").text(pageIndex); // 当前页
		}
	}
	document.getElementById("first").disabled = (pageIndex === 1 || $(
			"#lblCurent").text() === "0") ? true : false;
	document.getElementById("previous").disabled = (pageIndex <= 1 || $(
			"#lblCurent").text() === "0") ? true : false;
	document.getElementById("next").disabled = (pageIndex >= pageCount) ? true
			: false;
	document.getElementById("last").disabled = (pageIndex === pageCount || $(
			"#lblCurent").text() === "0") ? true : false;
}
function bindData(obj, pageIndex) {

	$
			.ajax({
				type : "get", // 使用get方法访问后台
				dataType : "json", // 返回json格式的数据
				url : "admin/getUserByPage.do", // 要访问的后台地址
				data : obj, // 要发送的数据
				success : function(msg) {// msg为返回的数据，在这里做数据绑定

					if (msg.length !== 0) {
						var t = document.getElementById("tb_body"); // 获取展示数据的表格
						while (t.rows.length !== 0) {
							t.removeChild(t.rows[0]); // 在读取数据时如果表格已存在行．一律删除
						}

					}
					$("#lblPageCount").text(msg.totalPages);
					$("#lblToatl").text(msg.totalRows);

					$
							.each(
									msg.returnlist,
									function(i, item) {

										$("#tb_body")
												.append(
														'<tr><td><input type="checkbox" name="idGroup" value="'
																+ item.userID
																+ '" /></td>'
																+ '<td >'
																+ item.name
																+ "</td>"
																+ "<td >"
																+ item.sex
																+ " </td>"
																+ "<td >"
																+ item.phone
																+ '</td>'
																+ '<td >'
																+ item.idNumber
																+ " </td>"
																+ "<td >"
																+ item.university
																+ " </td>"
																+ "<td >"
																+ item.college
																+ "</td>"
																+ "<td >"
																+ item.special
																+ '</td>'
																+ '<td >'
																+ item.graduate_date
																+ '</td>'
																+ '<td ><a id="delete'
																+ item.userID
																+ '" ><img src="images/delete.gif" border="0" title="删除"></a> </td></tr>');

									});

					$(".tableone tr:nth-child(even)").addClass("trOdd");
					$("td").addClass("bookList");

					bindPager(pageIndex);
				},
				error : function() {
					var t = document.getElementById("tb_body"); // 获取展示数据的表格
					while (t.rows.length !== 0) {
						t.removeChild(t.rows[0]); // 在读取数据时如果表格已存在行．一律删除
					}
					alert("加载数据失败");
				}
			});

}
// 页脚属性设置

function search(pageSize, pageIndex) {
	var Name = $("input#Name").val();
	var Phone = $("input#Phone").val();
	var IdNumber = $("input#IdNumber").val();
	var Sex = $("select#Sex option:checked").val();
	var University = $("input#University").val();
	var Graduate_date = $("input#Graduate_date").val();
	var dataObject = {
		"pageSize" : pageSize,
		"currentPage" : pageIndex,
		"Name" : Name,
		"Phone" : Phone,
		"IdNumber" : IdNumber,
		"Sex" : Sex,
		"University" : University,
		"Graduate_date" : Graduate_date
	};
	bindData(dataObject, pageIndex);

}
$(function() {
	var pageSize = 10;
	var pageIndex = 1;
	$('#pagesize').val(pageSize);
	search(pageSize, pageIndex);

	$("#first").click(function() {
		// alert('first');
		pageIndex = 1;
		$("#lblCurent").text(1);
		search(pageSize, pageIndex);
	});
	// 上一页按钮click事件
	$("#previous").click(function() {
		if (pageIndex !== 1) {
			pageIndex--;
			$("#lblCurent").text(pageIndex);
		}
		search(pageSize, pageIndex);
	});
	// 下一页按钮click事件
	$("#next").click(function() {
		var pageCount = parseInt($("#lblPageCount").text());
		if (pageIndex !== pageCount) {
			pageIndex++;
			$("#lblCurent").text(pageIndex);
		}
		search(pageSize, pageIndex);
	});
	// 最后一页按钮click事件
	$("#last").click(function() {
		var pageCount = parseInt($("#lblPageCount").text());
		pageIndex = pageCount;
		search(pageSize, pageIndex);
	});
	// 跳转
	$("input#goPage").blur(function() {
		var page = $(this).val();
		var pageCount = parseInt($("#lblPageCount").text());
		// alert(page+" "+pageCount);
		if (page !== null && page !== "") {
			var reg = /^\d+$/g;
			if (reg.test(page)) {
				if (page > pageCount || page < 1) {
					alert("不存在这一页");
				} else {
					pageIndex = page;
					search(pageSize, pageIndex);
				}
			} else {
				alert('页码必须为正整数');
			}
		}
	});
	$("input#goPage").keypress(function() {
		var page = $(this).val();
		var pageCount = parseInt($("#lblPageCount").text());
		if (event.keyCode == 13) {// 13 回车键
			if (page !== null && page !== "") {
				var reg = /^\d+$/g;
				if (reg.test(page)) {
					if (page > pageCount || page < 1) {
						alert("不存在这一页");
					} else {
						pageIndex = page;
						search(pageSize, pageIndex);
					}
				} else {
					alert('页码必须为正整数');
				}
			}
		}
	});

	$("input#pagesize").blur(function() {
		var pagesize = $(this).val();
		if (pagesize !== null && pagesize !== "") {
			var reg = /^\d+$/g
			if (reg.test(pagesize)) {
				pageSize = pagesize;
				search(pageSize, pageIndex);
			} else {
				alert('每行显示行数必须为正整数')
				return false;
			}
		}
	});
	$("input#pagesize").keypress(function() {
		var pagesize = $(this).val();
		if (event.keyCode == 13) {// 13 回车键
			if (pagesize !== null && pagesize !== "") {
				var reg = /^\d+$/g
				if (reg.test(pagesize)) {
					pageSize = pagesize;
					search(pageSize, pageIndex);
				} else {
					alert('每行显示行数必须为正整数')
					return false;
				}
			}
		}
	});

	// 查询
	$("button#btnSearch").click(function() {
		search(pageSize, pageIndex);
	});
	$("button#exportData").click(function() {
		var Name = $("input#Name").val();
		var Phone = $("input#Phone").val();
		var IdNumber = $("input#IdNumber").val();
		var Sex = $("select#Sex option:checked").val();
		var University = $("input#University").val();
		var Graduate_date = $("input#Graduate_date").val();

		var form = $("<form>");// 定义一个form表单
		form.attr("style", "display:none");
		form.attr("target", "");
		form.attr("method", "post");
		form.attr("action", "admin/exportUserInfor.do");
		var input1 = $("<input>");
		input1.attr("type", "hidden");
		input1.attr("name", "Name");
		input1.attr("value", Name);
		var input2 = $("<input>");
		input2.attr("type", "hidden");
		input2.attr("name", "Phone");
		input2.attr("value", Phone);
		var input3 = $("<input>");
		input3.attr("type", "hidden");
		input3.attr("name", "Sex");
		input3.attr("value", Sex);
		var input4 = $("<input>");
		input4.attr("type", "hidden");
		input4.attr("name", "University");
		input4.attr("value", University);
		var input5 = $("<input>");
		input5.attr("type", "hidden");
		input5.attr("name", "Graduate_date");
		input5.attr("value", Graduate_date);
		var input6 = $("<input>");
		input6.attr("type", "hidden");
		input6.attr("name", "IdNumber");
		input6.attr("value", IdNumber);
		$("body").append(form);// 将表单放置在web中
		form.append(input1);
		form.append(input2);
		form.append(input3);
		form.append(input4);
		form.append(input5);
		form.append(input6);
		form.submit();// 表单提交
		form.remove();
	});

	// 删除

	$(document).on("click", "[id^='delete']", function() {// 修改成这样的写法
		var id = $(this).attr("id").toString().slice(6);
		if (confirm('确定删除这条信息吗 ？')) {
			$.ajax({
				type : "get",
				dataType : "json",
				url : "admin/deleteUser.do",
				data : {
					"UserID" : id
				}, // "wherePageCount" + where,个人建议不用这种方式
				async : false,
				success : function(msg) {
					if (msg.message === "success") {
						search(pageSize, pageIndex);
					}
				},
				error : function(msg) {
					alert(msg);
				}
			});
		}

	});
	$(document).on("mouseenter", "[id^='delete']", function() {// 修改成这样的写法
		$(this).find('img').attr('src', "images/delete_no.gif");
	});
	$(document).on("mouseleave", "[id^='delete']", function() {// 修改成这样的写法
		$(this).find('img').attr('src', "images/delete.gif");
	});
	/**
	 * 无效 不知道原因 就用上面的代替
	 */
	// $("a[id^='delete']").hover(function(){
	// alert('mouseover');
	// $(this).css("background-color","yellow");
	// //$(this).find('img').attr('src',"images/delete_no.gif");
	// },function(){
	// $(this).css("background-color","pink");
	// //$(this).find('img').attr('src',"images/delete.gif");
	// });

	// 选中全部
	$('.selectAll').click(function() {
		$('#tb_body').find('tr').each(function() {
			$(this).find(':checkbox').prop('checked', true);
		});
	});
	// 反选
	$('.revSelectAll').click(function() {
		$('#tb_body').find('tr').each(function() {
			if ($(this).find(':checkbox').prop('checked')) {
				$(this).find(':checkbox').prop('checked', false);
			} else {
				$(this).find(':checkbox').prop('checked', true);
			}
		});
	});
	// 全不选
	$('.delSelectAll').click(function() {
		$('#tb_body').find('tr').each(function() {
			$(this).find(':checkbox').prop('checked', false);
		});
	});
	// 删除选中数据处理
	$('#Batchdelete').click(function() {
		var idGroup = '';
		$(':checkbox').each(function() {
			if ($(this).prop('checked')) {
				var id = $(this).val();
				idGroup += id + ','
			}
		});
		if (idGroup == "") {
			alert("请选择需要删除的数据")
		} else {
			if (confirm("是否确认删除所选数据?")) {
				idGroup = idGroup.substring(0, idGroup.length - 1);
				
				$.ajax({
					type : "get",
					dataType : "json",
					url : "admin/deleteMoreUser.do",
					data : {
						"idGroups" : idGroup
					}, // "wherePageCount" + where,个人建议不用这种方式
					async : false,
					success : function(msg) {
						if (msg.message === "success") {
							search(pageSize, pageIndex);
						}
					},
					error : function(msg) {
						alert(msg);
					}
				});
			}
		}

	});

});
