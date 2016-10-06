$(document).ready(function(){

});
var str = '';

function ajaxFileUpload(){ 
	$("#msg1").hide();
	$("#msg").show();
	$.ajaxFileUpload({
		url:'../handle/upload_interview.handle.php',
		secureuri:false,
		fileElementId:'file1',
		dataType: 'json',
		success: function(data){
			console.log(data);
			// if(data.result=='error'){
			// 	alert(data.details);
			// }
		},
		error:function(data){
			if(data.responseText){
				$temp = eval("(" + data.responseText + ")");
				console.log($temp['result']);

				if($temp['result'] == 'success'){
					alert("更新"+$temp['update'] + "个数据,新增" + $temp['add'] + "个数据。");
				}else if($temp['result'] == 'error'){
					alert($temp['details']);
					window.location = '../pages/admin/manage_interview.php'
				}
			}else{

			}
			$("#msg").hide();
			$("#msg1").show();
			// alert(data.responseText.details);
		}
	});
	return false;
}