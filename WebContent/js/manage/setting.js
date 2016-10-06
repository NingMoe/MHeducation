$(function() {
	
	$("span.size").width($('span.info').width());

	//返回现有的数据
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
					$('input#wordSize').val(item.number);
					$('textarea#info').val(item.jobinfor);
						});
			}
		},
		error : function(msg) {
			alert(msg);
		}
	});
	// 保存信息
	$("button#saveSetting").click(function() {
		
	
		var wordSize = $('input#wordSize').val();
		if (wordSize==null||wordSize=="") {
			inputPopover($('input#wordSize'),"字数不能为空",1);
			return false;
		}
		if (!wordSize.match(/^[1-9]\d*$/g)) {
			inputPopover($('input#wordSize'),"字数不符合规定",1);
			return false;
		}
		var info = $('textarea#info').val();
		if (info==null||info=="") {
			inputPopover($('textarea#info'),"信息不能为空",1);
			return false;
		}
		$.ajax({
			type : "get",
			dataType : "json",
			url : "admin/saveDefaultJob.do",
			data : {
				"number" : wordSize,
				"jobinfor" : info,
			}, // "wherePageCount" + where,个人建议不用这种方式
			async : false,
			success : function(msg) {
				if (msg.message === "success") {
					alert('保存成功');
				}else{
					alert('保存失败');
				}
			},
			error : function(msg) {
				alert(msg);
			}
		});
	});

});
