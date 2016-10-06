$(document).ready(function () {

	if($("#type").children('option:selected').val() == "武研校园行"){
			$("#isroll").show();
		}else{
			$("#isroll").hide();
		}
	
	$("#type").change(function(){
		if($(this).children('option:selected').val() == "武研校园行"){
			$("#isroll").show();
		}else{
			$("#isroll").hide();
		}
	});
	
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
			var Table=$("<ul>");
			Table.appendTo($("#article_list"));
			for(var i=0; i<activitylistCount;i++)
			{
				var tr=$("<li></li>");
				tr.appendTo(Table);
				var td_theme=$("<div class=\"activity_title\"> <a href=\"pages/read_activity_user.jsp?activity_id="+idList[i]+"\" class=\"article_title\">"+themeList[i]+"</a>");
				td_theme.appendTo(tr);
				var td_time=$("<span class=\"article_date\">"+timeList[i]+"</span></div>");
				td_time.appendTo(tr);
			}
			$("#article_list").append("</ul>");
		}
	});
});