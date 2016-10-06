
function popup(message) {
		var maskHeight = $(document).height();
		var maskWidth = $(document).width();
		var dialogTop = (maskHeight / 2) - ($('#dialog-box').height());
		var dialogLeft = (maskWidth / 2) - ($('#dialog-box').width() / 2);
		$('#dialog-overlay').css({
			height : maskHeight,
			width : maskWidth
		}).show();
		$('#dialog-box').css({
			top : dialogTop,
			left : dialogLeft
		}).show();
		$('#dialog-message').html(message);
		$('textarea#adminInfor').val("");
		$('textarea#adminInfor').attr('readonly',false);
		$('.dialog-footer').css('display','block');

	}
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
				url : "admin/getallFeedback.do", // 要访问的后台地址
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
										var content='<tr><td><input type="checkbox" name="idGroup" value="'
											+ item.idNumber
											+ '" /></td>'
											+ '<td >'
											+ item.name
											+ "</td>"
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
											+ item.workPosition
											+ " </td>"
											+ "<td >"
											+ item.settledPlace
											+ "</td>"
											+ "<td >"
											+ item.employment
											+ '</td>'
											+ '<td >'
											+ item.recommendation
											+ '</td>'
											+ '<td >'
											+ item.soreTranscript
											+ "</td>"
											+ "<td >"
											+ item.sixCertificate
											+ '</td>'
											+ '<td >'
											+ item.IDCopy
											+ " </td>"
											+ "<td >"
											+ item.tripartite
											+ " </td>"
											+ "<td >"
											+ item.firstJob
											+ " </td>"
											+ "<td >"
											+ item.secondJob
											+ "</td>"
											+ "<td >"
											+ item.signJobTwo
											+ '</td>'
											+ "<td >"
											+ item.signingJobTitle
											+ " </td>"
											+ '<td >'
											+ item.totalsalary
											+ '</td>'
											+ "<td >"
											+ item.floatingQuota
											+ " </td>"
											+ "<td >"
											+ item.userFeedBack
											+ "</td>"
											+ "<td >"
											+ item.inforstate
											+ '</td>';
										if(item.inforstate=="无"){
											content+='<td >不需处理 </td>';
										}else if(item.inforstate=="未处理"){
											content+='<td ><a id="process'
												+ item.idNumber
												+ '" >待处理</a></td>';
										}else if(item.inforstate=="申请通过"){
											content+='<td >已同意  <a id="check'
												+ item.idNumber
												+ '" >查看</a></td>';
										}else if(item.inforstate=="申请未通过"){
											content+='<td >已拒绝  <a id="check'
												+ item.idNumber
												+ '" >查看</a></td>';
										}
										content+='<td ><a id="delete'
											+ item.idNumber
											+ '" ><img src="images/delete.gif" border="0" title="删除"></a> </td></tr>';
										$("#tb_body")
												.append(content);
														

									});

					//$("td a[id^='yes']").css('color','green');
					//$("td a[id^='no']").css('color','red');
					$("td a[id^='process']").addClass('tbody_a1');
					$("td a[id^='check']").addClass('tbody_a1');
					//$("td a[id^='no']").addClass('tbody_a2');
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
	var inforstate = $("select#inforstate option:checked").val();
	var University = $("input#University").val();
	
	var dataObject = {
		"pageSize" : pageSize,
		"currentPage" : pageIndex,
		"Name" : Name,
		"Phone" : Phone,
		"IdNumber" : IdNumber,
		"inforstate" : inforstate,
		"University" : University,
		
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
		var inforstate = $("select#inforstate option:checked").val();
		var University = $("input#University").val();

		var form = $("<form>");// 定义一个form表单
		form.attr("style", "display:none");
		form.attr("target", "");
		form.attr("method", "post");
		form.attr("action", "admin/exportJobConfimInfor.do");
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
		input3.attr("name", "IdNumber");
		input3.attr("value", IdNumber);
		var input4 = $("<input>");
		input4.attr("type", "hidden");
		input4.attr("name", "University");
		input4.attr("value", University);
		var input5 = $("<input>");
		input5.attr("type", "hidden");
		input5.attr("name", "inforstate");
		input5.attr("value", inforstate);
		$("body").append(form);// 将表单放置在web中
		form.append(input1);
		form.append(input2);
		form.append(input3);
		form.append(input4);
		form.append(input5);
		form.submit();// 表单提交
		form.remove();
	});

	
	$(document).on("click", "[id^='process']", function() {// 修改成这样的写法
		var id = $(this).attr("id").toString().slice(7);
		popup(id);
	});
	$(document).on("click", "[id^='check']", function() {// 修改成这样的写法
		var id = $(this).attr("id").toString().slice(5);
		
		$.ajax({
			type : "get",
			dataType : "json",
			url : "admin/getFeedBackadminInfor.do",
			data : {
				"IdNumber" : id
			}, // "wherePageCount" + where,个人建议不用这种方式
			async : false,
			success : function(msg) {
				if (msg.message === "success") {
					popup(id);
					$('.dialog-footer').css('display','none');
					var adminInfor=msg.returnlist.adminInfor;
					if(adminInfor!=""){
						$('textarea#adminInfor').val(adminInfor);
					}else{
						$('textarea#adminInfor').val("无意见信息");
					}
					
					$('textarea#adminInfor').attr('readonly',true);
				}
			},
			error : function(msg) {
				alert(msg);
			}
		});
		
	});

	
	// 删除

	$(document).on("click", "[id^='delete']", function() {// 修改成这样的写法
		var id = $(this).attr("id").toString().slice(6);
		if (confirm('确定删除这条信息吗 ？')) {
			$.ajax({
				type : "get",
				dataType : "json",
				url : "admin/deleteMoreFeedback.do",
				data : {
					"IdNumber" : id
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
					url : "admin/deleteMoreFeedback.do",
					data : {
						"IdNumber" : idGroup
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
	
	/**
	 * 关闭弹出层
	 */
	$('a.close, #dialog-overlay').click(function() {
		$('#dialog-overlay, #dialog-box').hide();
		return false;
	});
	/**
	 * 同意
	 */
	$('button#yes').click(function() {
		var id = $('#dialog-message').html();
		var adminInfor=$('textarea#adminInfor').val();
		$('#dialog-overlay, #dialog-box').hide();
		$.ajax({
			type : "get",
			dataType : "json",
			url : "admin/updateFeedbackState.do",
			data : {
				"IdNumber" : id,
				"adminInfor":adminInfor,
				"inforstate":"申请通过"
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
		
	});
	

	/**
	 * 不同意
	 */
	$('button#no').click(function() {
		var id = $('#dialog-message').html();
		var adminInfor=$('textarea#adminInfor').val();
		$('#dialog-overlay, #dialog-box').hide();
		$.ajax({
			type : "get",
			dataType : "json",
			url : "admin/updateFeedbackState.do",
			data : {
				"IdNumber" : id,
				"adminInfor":adminInfor,
				"inforstate":"申请未通过"
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
		
	});

});
