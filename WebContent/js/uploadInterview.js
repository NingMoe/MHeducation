/**
 * 
 */
function startUpload()
{
	$('#msg').show();
	var filePath = $('#file1').val();
	alert(filePath);
	$
	.ajax({
		url : "admin/uploadInterview.do",
		type : "get",
		data : {"filePath" :filePath},
		dataType : "json",
		async: true,
		success : function(data) {
               if(data.message=="success")
               {
            	   
               }
            }
		});
}