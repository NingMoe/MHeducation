 function ajaxFileUpload() {
            $.ajaxFileUpload
            (
                {
                    url: 'admin/uploadJobConfim.do', //用于文件上传的服务器端请求地址
                    secureuri: false, //是否需要安全协议，一般设置为false
                    fileElementId: 'file1', //文件上传域的ID
                    dataType: 'json', //返回值类型 一般设置为json
                    success: function (data, status)  //服务器成功响应处理函数
                    {
                       if(data.message=="success"){
                    	   alert("导入数据成功");
                       }else if(data.message=="HeadNoMatch"){
                    	   alert("表格第一行不匹配");
                       }else if(data.message=="FileNoMatch"){
                    	   alert("文件不匹配");
                       }else{
                    	   alert("未知错误");
                       }
                    },
                    error: function (data, status, e)//服务器响应失败处理函数
                    {
                        alert(e);
                    }
                }
            )
            return false;
        }
	$(function() { 

		//批量增加
		$("#batchData").click(function() { 
			if($("#file1").val()==""){
				alert("请选择上传文件!");
				return false;
			}
//			var form = document.getElementById("import_Form");
//			   form.submit();
			 ajaxFileUpload();
			
		});
		

		$("#file").change(function() {
			 var objtype=$("#file1").val().substring($("#file1").val().lastIndexOf(".")).toLowerCase();
			 if(objtype!=".xlsx"&&objtype!=".xls"){
				 alert("请选择.xlsx或者.xls文件");
				 $("#file1").val("");
				 return false;
			 }
		});
		$("button#downloadTemplates").click(function() { 
			
			var form=$("<form>");//定义一个form表单
			form.attr("style","display:none");
			form.attr("target","");
			form.attr("method","post");
			form.attr("action","admin/exportJobConfim.do");
			$("body").append(form);//将表单放置在web中
			
			form.submit();//表单提交 
			form.remove();
			});  

		
	});
	


