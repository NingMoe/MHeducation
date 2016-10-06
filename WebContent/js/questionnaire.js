/**
 * 
 */

function addExistsRanchInfo()
{
	$
	.ajax({
		url : "user/getRanchQesInfor.do",
		type : "get",
		data : {},
		dataType : "json",
		success : function(data) {
               if(data.message=="success"){
				var recurit=data.returnlist;
				$("#Name").attr("value",recurit.name);
				$("#phoneNumber").attr("value",recurit.phoneNumber);		
				$("#Depart").attr("value",recurit.depart);	
				$("#ClassroomNumber").attr("value",recurit.classroomNumber);
				matchQues($('#Ques_1'),recurit,1);
				matchQues($('#Ques_2'),recurit,2);
				matchQues($('#Ques_3'),recurit,3);
				matchQues($('#Ques_4'),recurit,4);
				matchQues($('#Ques_5'),recurit,5);
				matchShortQues($('#QuesShort_1'),recurit,1);
				matchShortQues($('#QuesShort_2'),recurit,2);
				matchShortQues($('#QuesShort_3'),recurit,3);
				matchShortQues($('#QuesShort_4'),recurit,4);
				matchShortQues($('#QuesShort_5'),recurit,5);
			}
		}
	});
}

function matchQues(obj,recurit,number)
{
	if(obj.attr("value") == recurit.ques_1)
	{	
		$("input[type='radio'][name='Depth_"+number+"']").get((recurit.depth_1-1)).checked=true;
		//$("#level_"+number+"_"+(recurit.depth_1)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
		$("input[type='radio'][name='Depth_"+number+"']").checkboxradio("refresh");
		//$("#select input[name=\"Depth_"+number+"\"][ value=\""+recurit.depth_1+"\"]").attr("checked",true).checkboxradio("refresh");
	}
	if(obj.attr("value") == recurit.ques_2)
	{
		$("input[type='radio'][name='Depth_"+number+"']").get((recurit.depth_2-1)).checked=true;
		//$("#level_"+number+"_"+(recurit.depth_2)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
		$("input[type='radio'][name='Depth_"+number+"']").checkboxradio("refresh");
		//$("#select input[name=\"Depth_"+number+"\"][ value=\""+recurit.depth_2+"\"]").attr("checked",true).checkboxradio("refresh");
	}
	if(obj.attr("value") == recurit.ques_3)
	{
		$("input[type='radio'][name='Depth_"+number+"']").get((recurit.depth_3-1)).checked=true;
		//$("#level_"+number+"_"+(recurit.depth_3)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
		$("input[type='radio'][name='Depth_"+number+"']").checkboxradio("refresh");
		//$("#select input[name=\"Depth_"+number+"\" ][value=\""+recurit.depth_3+"\"]").attr("checked",true).checkboxradio("refresh");
	}
	if(obj.attr("value") == recurit.ques_4)
	{
		$("input[type='radio'][name='Depth_"+number+"']").get((recurit.depth_4-1)).checked=true;
		//$("#level_"+number+"_"+(recurit.depth_4)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
		$("input[type='radio'][name='Depth_"+number+"']").checkboxradio("refresh");
		//$("#select input[name=\"Depth_"+number+"\"][ value=\""+recurit.depth_4+"\"]").attr("checked",true).checkboxradio("refresh");
	}
	if(obj.attr("value") == recurit.ques_5)
	{
		$("input[type='radio'][name='Depth_"+number+"']").get((recurit.depth_5-1)).checked=true;
		//$("#level_"+number+"_"+(recurit.depth_5)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
		$("input[type='radio'][name='Depth_"+number+"']").checkboxradio("refresh");
		//$("#select input[name=\"Depth_"+number+"\" ][value=\""+recurit.depth_5+"\"]").attr("checked",true).checkboxradio("refresh");
	}
	

}

function matchShortQues(obj,recurit,number)
{
	console.log("obj.attr(\"value\")"+obj.attr("value"));
	if(obj.attr("value") == recurit.quesShort_1)
	{
		$("#Two_"+number+"").attr("value",recurit.two_1);
	}
	if(obj.attr("value") == recurit.quesShort_2)
	{
		$("#Two_"+number+"").attr("value",recurit.two_2);
	}
	if(obj.attr("value") == recurit.quesShort_3)
	{
		$("#Two_"+number+"").attr("value",recurit.two_3);
	}
	if(obj.attr("value") == recurit.quesShort_4)
	{
		$("#Two_"+number+"").attr("value",recurit.two_4);
	}
	if(obj.attr("value") == recurit.quesShort_5)
	{
		$("#Two_"+number+"").attr("value",recurit.two_5);
	}
}
function addExistsIntentionSurvey()
{
	$
	.ajax({
		url : "user/getIntentionSurvey.do",
		type : "get",
		data : {},
		dataType : "json",
		success : function(data) {
               if(data.message=="success"){         	
				var recurit=data.returnlist;
				
				$("#Name").attr("value",data.Name);	
				$("#Tel").attr("value",data.Tel);	
				$("#College").attr("value",data.College);	
				
				$("#Depart_1").attr("value",data.Depart_1);	
				$("#Post_1").attr("value",data.Post_1);	
				$("input[type='radio'][name='Depth_1']").get((data.Depth_1)-1).checked=true;
				$("#lab_level_1_"+(data.Depth_1)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
				
				$("#Depart_2").attr("value",data.Depart_2);	
				$("#Post_2").attr("value",data.Post_2);	
				$("input[type='radio'][name='Depth_2']").get((data.Depth_2)-1).checked=true;
				$("#lab_level_2_"+(data.Depth_2)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
				
				$("#Depart_3").attr("value",data.Depart_3);	
				$("#Post_3").attr("value",data.Post_3);	
				$("input[type='radio'][name='Depth_3']").get((data.Depth_3)-1).checked=true;
				$("#lab_level_3_"+(data.Depth_3)).removeClass("ui-radio-off").addClass("ui-radio-on ui-btn-active");
				console.log($("input[type='radio'][name='Depth_1']").get((data.Depth_1)-1).checked);
				console.log($("input[type='radio'][name='Depth_2']").get((data.Depth_2)-1).checked);
				console.log($("input[type='radio'][name='Depth_3']").get((data.Depth_3)-1).checked);

/*				document.getElementById("Depart_2").value=data.Depart_2;
				document.getElementById("Post_2").value=data.Post_2;
				$("input[type='radio'][name='Depth_2']").get((data.Depth_2-1)).checked=true;
				document.getElementById("Depart_3").value=data.Depart_3;
				document.getElementById("Post_3").value=data.Post_3;
				$("input[type='radio'][name='Depth_3']").get((data.Depth_3-1)).checked=true;*/
/*				document.getElementById("Depart_4").value=data.Depart_4;
				document.getElementById("Post_4").value=data.Post_4;
				$("input[type='radio'][name='Depth_4']").get((data.Depth_4-1)).checked=true;
				document.getElementById("Depart_5").value=data.Depart_5;
				document.getElementById("Post_5").value=data.Post_5;
				$("input[type='radio'][name='Depth_5']").get((data.Depth_5-1)).checked=true;*/
			}
		}
	});
	
}