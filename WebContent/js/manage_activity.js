/**
 * 动态生成活动管理
 */
$(document).ready(function () {	
	$
	.ajax({
		url : "admin/getActivity.do",
		type : "get",
		data : {},
		dataType : "json",
		success : function(data) {
			if(data.message=="success")
			{
				var activitylist=data.activitylist;
				activitylistCount = activitylist.length;
			}
			var idList = new Array();
			var themeList =new Array();
			var typeList =new Array();
			var timeList = new Array();
			//获取活动list
        	for(var i=0; i<activitylistCount; i++)
        	{
        		idList[i] = activitylist[i].id;
        		themeList[i]=activitylist[i].theme;
        		typeList[i]=activitylist[i].type;
        		timeList[i]=activitylist[i].begin_time;
        	}
        	//添加到页面
			var Table=$("<table>");
			Table.appendTo($("#article_list"));
			for(var i=0; i<activitylistCount;i++)
			{
				var tr=$("<tr></tr>");
				tr.appendTo(Table);
				var td_theme=$("<td class=\"activity_title\"> <a href=\"pages/admin/read_activity.jsp?activity_id="+idList[i]+"\" class=\"article_title\">"+themeList[i]+"</a></td>");
				td_theme.appendTo(tr);
				var td_time=$("<td class=\"activity_date\"><span class=\"article_date\">"+timeList[i]+"</span></td>");
				td_time.appendTo(tr);
				var td_delete_update=$("<td class=\"activity_btn\">" +
						"<a onclick=\"if(confirm( '确认删除?'))  location.href='admin/deleteActivity.do?activity_id="+idList[i]+"&page=1';else;\" class=\"delete\">删除</a>" +
						"<a  class=\"modify\" href=\"pages/admin/modify_activity.jsp?activity_id="+idList[i]+"\">修改</a>"+
						"</td>");
				td_delete_update.appendTo(tr);
			}
			$("#article_list").append("</table>");
		}
	});	
})