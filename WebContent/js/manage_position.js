/**
 * 动态生成招聘管理
 */
$(document).ready(function () {	
	$
	.ajax({
		url : "admin/getPosition.do",
		type : "get",
		data : {},
		dataType : "json",
		success : function(data) {
			if(data.message=="success")
			{
				var positionlist=data.positionlist;
				positionlistCount = positionlist.length;
			}
			var idList = new Array();
			var typeList =new Array();
			var titleList =new Array();
			var publish_timeList = new Array();
			//获取活动list
        	for(var i=0; i<positionlistCount; i++)
        	{
        		idList[i] = positionlist[i].id;
        		typeList[i]=positionlist[i].type;
        		titleList[i]=positionlist[i].title;
        		publish_timeList[i]=positionlist[i].publish_time.split(" ")[0];
        	}
        	//添加到页面
			var Table=$("<table>");
			Table.appendTo($("#article_list"));
			for(var i=0; i<positionlistCount;i++)
			{
				var tr=$("<tr></tr>");
				tr.appendTo(Table);
				var td_theme=$("<td class=\"article_title\"> <a href=\"pages/admin/read_position.jsp?job_id="+idList[i]+"\" class=\"article_title\">【"+typeList[i]+"】"+titleList[i]+"</a></td>");
				td_theme.appendTo(tr);
				var td_time=$("<td class=\"article_date\"><span class=\"article_date\">"+publish_timeList[i]+"</span></td>");
				td_time.appendTo(tr);
				var td_delete_update=$("<td>" +
						"<a onclick=\"if(confirm( '确认删除?'))  location.href='admin/delPosition.do?job_id="+idList[i]+"';else;\" class=\"delete\">删除</a>" +
						"<a href=\"pages/admin/modify_position.jsp?job_id="+idList[i]+"\" class=\"modify\">修改</a>"+
						"</td>");
				td_delete_update.appendTo(tr);
			}
			$("#article_list").append("</table>");
		}
	});	
})