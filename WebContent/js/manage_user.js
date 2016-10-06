/**
 * 动态生成用户
 */
$(document).ready(function () {	
	$
	.ajax({
		url : "admin/getUser.do",
		type : "get",
		data : {},
		dataType : "json",
		success : function(data) {
			if(data.message=="success")
			{
				var userList=data.userList;
				userListCount = userList.length;
			}
			var idList = new Array();
			var nameList = new Array();
			var emailList =new Array();
			var phoneList =new Array();
			var universityList = new Array();
			var collegeList = new Array();
			var specialList = new Array();
			var diplomalList = new Array();
			var managerList = new Array();
			//获取list
        	for(var i=0; i<userListCount; i++)
        	{
        		idList[i] = userList[i].userID;
        		nameList[i] = userList[i].name;
        		emailList[i]=userList[i].email;
        		phoneList[i]=userList[i].phone;
        		universityList[i]=userList[i].university;
        		collegeList[i]=userList[i].college;
        		specialList[i]=userList[i].special;
        		diplomalList[i]=userList[i].diploma;
        		managerList[i]=userList[i].manager;
        	}
        	//添加到页面
			var Table=$("<table>");
			Table.appendTo($("#article_list"));
			
			for(var i=0; i<userListCount ;i++)
			{
				if(managerList[i] == '0')
				{
				var tr=$("<tr></tr>");
				tr.appendTo(Table);
				var td_name=$("<td>"+nameList[i]+"</td>");
				td_name.appendTo(tr);
				var td_email=$("<td>"+emailList[i]+"</td>");
				td_email.appendTo(tr);
				var td_phone=$("<td>"+phoneList[i]+"</td>");
				td_phone.appendTo(tr);
				var td_university=$("<td>"+universityList[i]+"</td>");
				td_university.appendTo(tr);
				var td_college=$("<td>"+collegeList[i]+"</td>");
				td_college.appendTo(tr);
				var td_special=$("<td>"+specialList[i]+"</td>");
				td_special.appendTo(tr);
				var td_diplomal=$("<td>"+diplomalList[i]+"</td>");
				td_diplomal.appendTo(tr);
				var td_delete_update=$("<td class=\"activity_btn\">" +
						"<button type=\"button\" onClick=\"upToAdmin("+idList[i]+")\" >设为管理员</button>"+
						"</td>");
				td_delete_update.appendTo(tr);
				}

			}
			
			$("#article_list").append("</table>");
		}
	});	
})

function upToAdmin(userId)
{
	$
	.ajax({
		url : "admin/upToAdmin.do",
		type : "get",
		data : {"userId":userId},
		dataType : "json",
		success : function(data) {
			if(data.message=="success")
			{
				window.location.reload();
				alert("更新权限成功");
			}
		}
		});	
}