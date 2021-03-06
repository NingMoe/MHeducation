/**
 * 动态生成新闻管理
 */
$(document).ready(function () {
	$
	.ajax({
		url : "admin/getArticle.do",
		type : "get",
		data : {},
		dataType : "json",
		success : function(data) {
			if(data.message=="success")
			{	
				var articlelist=data.articlelist;
				articlelistCount = articlelist.length;
			}
			var idList = new Array();
			var titleList =new Array();
			var publish_timeList = new Array();
			//获取活动list
        	for(var i=0; i<articlelistCount; i++)
        	{
             	idList[i] = articlelist[i].id;
        		titleList[i]=articlelist[i].title;
        		publish_timeList[i]=articlelist[i].publish_time.split(" ")[0];
        	}
        	//添加到页面
			var Table=$("<table>");
			Table.appendTo($("#article_list"));
			for(var i=0; i<articlelistCount;i++)
			{
				var tr=$("<tr></tr>");
				tr.appendTo(Table);
				var td_theme=$("<td class=\"activity_title\"> <a href=\"pages/admin/read_article.jsp?article_id="+idList[i]+"\" class=\"article_title\">"+titleList[i]+"</a></td>");
				td_theme.appendTo(tr);
				var td_time=$("<td class=\"activity_date\"><span class=\"article_date\">"+publish_timeList[i]+"</span></td>");
				td_time.appendTo(tr);
				var td_delete_update=$("<td class=\"activity_btn\">" +
						"<a onclick=\"if(confirm( '确认删除?'))  location.href='admin/deleteArticle.do?article_id="+idList[i]+"&page=1';else;\" class=\"delete\">删除</a>" +
						"<a  class=\"modify\" href=\"pages/admin/modify_article.jsp?article_id="+idList[i]+"\">修改</a>"+
						"</td>");
				td_delete_update.appendTo(tr);
			}
			$("#article_list").append("</table>");
		}
	});	
})