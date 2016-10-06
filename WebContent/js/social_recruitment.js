$(document).ready(function () {
	eventbind();
});

function eventbind(){
	//活动
	$(".job_list .job_box").click(
		function () {
			if($(this).find(".hide").is(":hidden")){
				$(".job_list .job_box .hide").slideUp("slow");
            	$(this).find(".hide").slideDown("slow");
			}else{
				$(this).find(".hide").slideUp("slow");
			}   
         }
    );
}