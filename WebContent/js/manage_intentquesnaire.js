/**
 * 
 */
$(document).ready(function () {	
	$
	.ajax({
		url : "admin/getIntenrQuesnaireModule.do",
		type : "get",
		data : {},
		dataType : "json",
		async: false,
		success : function(data) {
               if(data.message=="success"){
               var quesnairelist = data.intentquestionlist;
               var table = $('#intentQuestionnaire');
               for(var i=0; i<quesnairelist.length; i++)
               {
     				var tr=$("<tr id="+(i+1)+"></tr>");
    				tr.appendTo(table);
    				var td_order=$("<td class=\"order\"><input id=\"id_"+(i+1)+"\" name=\"id_"+(i+1)+"\" value=\""+(i+1)+"\" type=\"text\" class=\"required\" readonly=\"readonly\"/></td>");
    				td_order.appendTo(tr);
    				var td_produceordepart=$("<td class=\"Depart\"><input id=\"Depart_"+(i+1)+"\" name=\"Depart_"+(i+1)+"\"  type=\"text\" readonly=\"readonly\"/></td>");
    				td_produceordepart.appendTo(tr);
    				var td_station=$("<td class=\"Post\"><input id=\"Post_"+(i+1)+"\" name=\"Post_"+(i+1)+"\" type=\"text\" readonly=\"readonly\"/></td>");
    				td_station.appendTo(tr);
    				//选择数字
    				var selectnumber = "<select>";
    				for(var j=0; j<quesnairelist[i].level; j++)
    				{
    					selectnumber += "<option value=\""+(j+1)+"\">"+(j+1)+"</option>"
    				}
    				selectnumber += "</select>";
    				var td_level=$("<td class=\"select_level\">"+selectnumber+"</td>");
    				td_level.appendTo(tr);
    				//操作
    				var td_opr=$("<td class=\"table_operation\">" +
    						"<input id=\"table_edit\" value=\"编辑\" type=\"button\" onclick=\"edit_table("+quesnairelist[i].id+");\"/>" +
    						"<input id=\"table_delete\" value=\"删除\" type=\"button\" onclick=\"delete_table("+quesnairelist[i].id+");\"/>" +		
    				        "</td>");
    				td_opr.appendTo(tr);
               }	   
           }
		}
	});
})

function edit_table(id)
{
	var level = prompt("请输入可选等级","");
	$
	.ajax({
		url : "admin/updateIntentQuesnaireModule.do",
		type : "get",
		data : {id:id,level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
	
}
function delete_table(id){
	var level ="null";
	$
	.ajax({
		url : "admin/deleteIntentQuesnaireModule.do",
		type : "get",
		data : {id:id,level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
	
}
function addtablequestion(){
	var level = prompt("请输入可选等级","");
	$
	.ajax({
		url : "admin/addIntentQuesnaireModule.do",
		type : "get",
		data : {level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
	
}