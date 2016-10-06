$(document).ready(function () {

	eventbind();
});

function eventbind(){
	//活动
	 $(".article_list .agenda_next .next_list").click(
	 	function(){
	 		$(".article_list .agenda_main .activity_list").animate({"left": -750},1000);
	 		$(".article_list .agenda_next .next_list").hide();
	 		$(".article_list .agenda_prev .prev_list").show();
	 	}
	 );
	 $(".article_list .agenda_prev .prev_list").click(
	 	function(){
	 		$(".article_list .agenda_main .activity_list").animate({"left": 0},1000);
	 		$(".article_list .agenda_next .next_list").show();
	 		$(".article_list .agenda_prev .prev_list").hide();
	 	}
	 );


	//手机端下拉框
	$("#phone_menu").click(
		function(){
			if($(".navBox_phone").is(":hidden")){
            	$(".navBox_phone").slideDown("slow");
			}else{
				$(".navBox_phone").slideUp("slow");
			} 
		}
	);
}