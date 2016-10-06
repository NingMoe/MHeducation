/**
 * 
 */
$(document).ready(function () {	
	$
	.ajax({
		url : "admin/getQuesnaireModule.do",
		type : "get",
		data : {},
		dataType : "json",
		async: false,
		success : function(data) {
               if(data.message=="success"){
               var quesnairelist = data.ranchquestionlist;
               var tableselect = $('#ranchQuestionnaire_select');
               var tableshortanswer = $('#ranchQuestionnaire_shortanswer');
               var select_quesnaire = new Array();
               var shortanswer_quesnaire = new Array();
               //将选择题和开放题分开
              for(var i=0; i<quesnairelist.length; i++)
               {
            	   if(quesnairelist[i].type == "0")
            	   {
            		   select_quesnaire.push(quesnairelist[i]);
            	   }
            	   if(quesnairelist[i].type == "1")
            	   {
            		   shortanswer_quesnaire.push(quesnairelist[i]);
            	   }
               }
               //选择题表格
               for(var select=0; select<select_quesnaire.length; select++)
               {
      				var tr=$("<tr id="+(select+1)+"></tr>");
    				tr.appendTo(tableselect);
    				//题目
    				var td_theme=$("<td class=\"select_title\"> <p align=\"center\"><span style=\"font-size:18px \">"+select_quesnaire[select].ranchquestions+"</span></p></td>");
    				td_theme.appendTo(tr);
    				//选择数字
    				var selectnumber = "<select>";
    				for(var i=0; i<select_quesnaire[select].level; i++)
    				{
    					selectnumber += "<option value=\""+(i+1)+"\">"+(i+1)+"</option>"
    				}
    				selectnumber += "</select>";
    				var td_level=$("<td class=\"select_level\">"+selectnumber+"</td>");
    				td_level.appendTo(tr);
    				//操作
    				var td_opr=$("<td class=\"select_operation\">" +
    						"<input id=\"select_edit\" value=\"编辑\" type=\"button\" onclick=\"edit_select("+select_quesnaire[select].id+",0);\"/>" +
    						"<input id=\"select_delete\" value=\"删除\" type=\"button\" onclick=\"delete_select("+select_quesnaire[select].id+",0);\"/>" +		
    				        "</td>");
    				td_opr.appendTo(tr);
               }
                
                //开放题
                for(var shortanswer=0; shortanswer<shortanswer_quesnaire.length; shortanswer++)
                {
      				var tr_title=$("<tr id="+(shortanswer+1)+"></tr>");
      				tr_title.appendTo(tableshortanswer);
      				var td_title=$("<td class=\"select_add\" colspan=3><p align = \"left\" ><span style=\"font-size:20px;\">"+(shortanswer+1)+"、"+shortanswer_quesnaire[shortanswer].ranchquestions+"</span></p></td>");
      				td_title.appendTo(tr_title);
      				var td_content=$("<input  id=shortanswer"+shortanswer+" name=shortanswer"+shortanswer+" style=\"font-size:20px;\" type=\"text\" size=\"55\" class=\"required\"/>");
      				td_content.appendTo(tr_title);
    				//操作
    				var td_opr=$("<td class=\"shortanswer_operation\">" +
    						"<input id=\"shortanswer_edit\" value=\"编辑\" type=\"button\" onclick=\"edit_shortanswer("+shortanswer_quesnaire[shortanswer].id+",1);\"/>" +
    						"<input id=\"shortanswer_delete\" value=\"删除\" type=\"button\" onclick=\"delete_shortanswer("+shortanswer_quesnaire[shortanswer].id+",1);\"/>" +		
    				        "</td>");
    				td_opr.appendTo(tr_title);
                }	
           }
		}
	});
})

function edit_select(id,type)
{
	var ranchquestions = prompt("请输入修改后的题目",""); 
	var level = prompt("请输入可选等级","");
	$
	.ajax({
		url : "admin/updateQuesnaireModule.do",
		type : "get",
		data : {id:id,ranchquestions:ranchquestions,level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
	
}

function delete_select(id,type)
{
	$
	.ajax({
		url : "admin/deleteQuesnaireModule.do",
		type : "get",
		data : {id:id},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
}

function edit_shortanswer(id,type)
{
	var ranchquestions = prompt("请输入修改后的题目",""); 
	var level="null";
	$
	.ajax({
		url : "admin/updateQuesnaireModule.do",
		type : "get",
		data : {id:id,ranchquestions:ranchquestions,level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
}

function delete_shortanswer(id,type)
{
	$
	.ajax({
		url : "admin/deleteQuesnaireModule.do",
		type : "get",
		data : {id:id},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
}

function addselectquestion()
{
	var ranchquestions = prompt("请输入需要添加的题目",""); 
	var level = prompt("请输入该题目的可选等级","");
	var type="0";
	$
	.ajax({
		url : "admin/addQuesnaireModule.do",
		type : "get",
		data : {type:type,ranchquestions:ranchquestions,level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
}

function addshortanswerquestion()
{
	var ranchquestions = prompt("请输入需要添加的题目",""); 
	var level = "null"
	var type="1";
	$
	.ajax({
		url : "admin/addQuesnaireModule.do",
		type : "get",
		data : {type:type,ranchquestions:ranchquestions,level:level},
		dataType : "json",
		success : function(data) {
			location.reload();
		}
	});
}