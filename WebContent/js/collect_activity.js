/**
 * 
 */
var operationdetailsCount = 0;
var themeList =new Array();
var typeList =new Array();
var timeList = new Array();
var navigationslist =new Array();
var mainbodylist =new Array();
var center;
$(document).ready(function () {	
	$("a").click(function(){
		var title = $(this).attr("title");
		var left_title1 = "a_manage_activity";
		var left_title2 = "a_public_activity";
		$
		.ajax({
			url : "admin/getManageModuleByTitle.do",
			type : "get",
			data : {title:title},
			dataType : "json",
			async: false,
			success : function(data) {
	               if(data.message=="success"){
	           		center = title;
	           		saveObject(data.operationlist,data.operationdetails);
	            	//左侧导航栏
	            	var operationlist = new Array();
	            	operationlist=data.operationlist;
	            	document.getElementById("img_manage_activity").src=operationlist[0].picture;
	            	document.getElementById("img_public_activity").src=operationlist[1].picture;
	            	//主体部分
	            	var operationdetails = data.operationdetails;
	            	operationdetailsCount = operationdetails.length;
	            	for(var i=0; i<operationdetailsCount; i++)
	            	{
	            		themeList[i]=operationdetails[i].theme;
	            		typeList[i]=operationdetails[i].type;
	            		timeList[i]=operationdetails[i].begin_time;
	            	}
	            	
	    			$("#mainbody").children().remove();
	    			$("#list_footer").children().remove();
	    			document.getElementById("img_mainbody_title").src=operationlist[0].picture;
	           }
			},
			error : function(XMLResponse){
			}
		});
		
		$(function(){
			$("#mainbody").children().remove();
			$("#list_footer").children().remove();
		})
		
    	if(title == left_title1)
    	{
    		document.getElementById("img_mainbody_title").src=document.getElementById("img_manage_activity").src;
    		updetaTable(0,title);
    	}
    	if(title == left_title2)
    	{
    		document.getElementById("img_mainbody_title").src=document.getElementById("img_public_activity").src;
    		updetaTable(1,title);
    	}
    	
    	function updetaTable(shadow,title){
    		$(function(){
    			$("#mainbody").children().remove();
    		})
    		if(shadow == 0 && center == "校园活动管理")
    		{
    			var Table=$("<table>");
    			Table.appendTo($("#mainbody"));
    			for(var i=0; i<operationdetailsCount;i++)
    			{
    				var tr=$("<tr></tr>");
    				tr.appendTo(Table);
    				var td_theme=$("<td class=\"activity_title\"> <a href=\"\" class=\"article_title\">"+themeList[i]+"</a></td>");
    				td_theme.appendTo(tr);
    				var td_type=$("<td class=\"activity_type\"><span class=\"article_date\">"+typeList[i]+"</span></td>");
    				td_type.appendTo(tr);
    				var td_time=$("<td class=\"activity_date\"><span class=\"article_date\">"+timeList[i]+"</span></td>");
    				td_time.appendTo(tr);
    				var td_delete_update=$("<td class=\"activity_btn\">" +
    						"<a onclick=\"';else;\" class=\"delete\">删除</a>" +
    						"<a href=\"modify_activity.php?activity_id=<?php echo $value['ActivityID']?>\" class=\"modify\">修改</a>"+
    						"</td>");
    				td_delete_update.appendTo(tr);
    			}
    			$("#mainbody").append("</table>");
    			var Div = $("<div>");
    			Div.appendTo($("#list_footer"));
    			var a_before =$("<a>上一页</a>");
    			var a_after =$("<a>下一页</a>");
    			a_before.appendTo(Div);
    			a_after.appendTo(Div);
    			$("#list_footer").append("</div>");
    		}
    		
    		if(shadow == 1 && center == "校园活动管理")
    		{
    			var Form=$("<form id=\"create_form\" name=\"create_form\" method=\"post\" action=\"../handle/create_activity.handle.php\" enctype=\"multipart/form-data\"> ");
    			Form.appendTo($("#mainbody"));
    			var Table=$("<table class=\"article_detailes\">");
    			Table.appendTo(Form);
    			var tr_theme =$("<tr></tr>");
    			tr_theme.appendTo(Table);
    			var td_theme_name=$("<td><span>主       题</span></td>");
    			var td_theme_input=$("<td><input id=\"title\" name=\"title\" type=\"text\" /></td>");
    			td_theme_name.appendTo(tr_theme);
    			td_theme_input.appendTo(tr_theme);
    			var tr_is_display=$("<tr></tr>");
    			tr_is_display.appendTo(Table);
    			var td_is_title = $("<td><span>首页显示</span></td>");
    			var td_is_select =$("<td><select id=\"top\" name=\"top\">" +
    					"<option value=\"0\">不显示</option>" +
    					"<option value=\"1\">显示</option>"+
    					"</select></td>");
    			td_is_title.appendTo(tr_is_display);
    			td_is_select.appendTo(tr_is_display);
    			var tr_location =$("<tr></tr>");
    			tr_location.appendTo(Table);
    			var td_location_name=$("<td><span>地       点</span></td>");
    			var td_location_input=$("<td><input id=\"place\" name=\"place\" type=\"text\" /></td>");
    			td_location_name.appendTo(tr_location);
    			td_location_input.appendTo(tr_location);
    			var tr_type=$("<tr></tr>");
    			tr_type.appendTo(Table);
    			var td_type_title = $("<td><span>活动类型</span></td>");
    			var td_type_select =$("<td><select id=\"type\" name=\"type\">" +
    					"<option value=\"校园招聘\">校园招聘</option>" +
    					"<option value=\"武研校园行\">武研校园行</option>"+
    					"</select></td>");
    			td_type_title.appendTo(tr_type);
    			td_type_select.appendTo(tr_type);
    			var tr_recommend=$("<tr></tr>");
    			tr_recommend.appendTo(Table);
    			var td_recommend_title = $("<td><span>滚动推荐</span></td>");
    			var td_recommend_select =$("<td><select id=\"roll\" name=\"roll\">" +
    					"<option value=\"0\">不推荐</option>" +
    					"<option value=\"1\">推荐</option>"+
    					"</select></td>");
    			td_recommend_title.appendTo(tr_recommend);
    			td_recommend_select.appendTo(tr_recommend);
    			var tr_object =$("<tr></tr>");
    			tr_object.appendTo(Table);
    			var td_object_name=$("<td><span>参与对象</span></td>");
    			var td_object_input=$("<td><input id=\"participator\" name=\"participator\" type=\"text\" /></td>");
    			td_object_name.appendTo(tr_object);
    			td_object_input.appendTo(tr_object);
    			var tr_time =$("<tr></tr>");
    			tr_time.appendTo(Table);
    			var td_time_name=$("<td><span>开始时间</span></td>");
    			var td_time_input=$("<td><input id=\"start_date\" name=\"start_date\" type=\"date\" /> — " +
    					"<input id=\"start_date\" name=\"start_date\" type=\"date\" /></td>");
    			td_time_name.appendTo(tr_time);
    			td_time_input.appendTo(tr_time);
    			var tr_poster =$("<tr></tr>");
    			tr_poster.appendTo(Table);
    			var td_poster_name=$("<td><span>海       报</span></td>");
    			var td_poster_text=$("<td><input id=\"pic_text\" name=\"pic_text\" type=\"text\" readOnly=\"true\"/> " +
    								"<input id=\"picture\" name=\"picture\" type=\"file\" style=\"display:none;\" onchange =\"readimg(); \"/> " +
    								"<input id=\"pic_instead\" value=\"上传文件\" type=\"button\" onclick=\"uploadimg();\"/> </td>");
    			td_poster_name.appendTo(tr_poster);
    			td_poster_text.appendTo(tr_poster);
    			var tr_summary =$("<tr></tr>");
    			tr_summary.appendTo(Table);
    			var td_summary_name=$("<td><span>简       介</span></td>");
    			var td_poster_content=$("<td><textarea id=\"content\" name=\"content\" style=\"height:150px;max-height:150px;\"></textarea></td>");
    			td_summary_name.appendTo(tr_summary);
    			td_poster_content.appendTo(tr_summary);
    			var tr_btn =$("<tr></tr>");
    			tr_btn.appendTo(Table);
    			var td_btn_name=$("<td></td>");
    			var td_btn=$("<td><input id=\"cancel\" name=\"reset\" type=\"reset\" value=\"重置\" /> <input id=\"submit\" name=\"submit\" type=\"submit\" value=\"发布\"/></td> ");
    			td_btn_name.appendTo(tr_btn);
    			td_btn.appendTo(tr_btn);
    			$("#mainbody").append("</table>");
    			$("#mainbody").append("</form>");	
    		}
    	}

	})
});

function saveObject(aa,bb)
{
	navigationslist = aa;
	mainbodylist = bb;
}
