var page = 1;
var i = 5;
var $parent,$movie_list,$movie_content,
	$pageIndex,$pageCount;
var v_width, len, page_count;


$(function(){
	$(".highlight_tip span:first").addClass("current");
})

function findObj(obj){
    $parent = $(obj).parents("div.movie_show");//根据当前点击元素获取到父元素
	$movie_list = $parent.find("div.movie_list"); //寻找到“视频内容展示区域”
	$movie_content = $parent.find("div.movie_content"); //寻找到“视频内容展示区域”外围的DIV元素

	v_width = $movie_content.width();
	len = $movie_list.find("li").length;
	page_count = Math.ceil(len / i) ;   //只要不是整数，就往大的方向取最小的整数

	$pageIndex = $parent.find("div.highlight_tip span:first").text();
	$pageCount = $parent.find("div.highlight_tip span:last").text();
}

$("span.prev-btn").click(function(){
	 findObj(this);
	 if($pageIndex > 1){
	 	$pageIndex--;
	 	$parent.find("div.highlight_tip span:first").html($pageIndex);
	 }
	 else{
	 	$parent.find("div.highlight_tip span:first").html($pageCount);
	 }

	 if( !$movie_list.is(":animated") ){    //判断“视频内容展示区域”是否正在处于动画
	 	 if( page == 1 ){  //已经到第一个版面了,如果再向前，必须跳转到最后一个版面。
			$movie_list.animate({ left : '-='+v_width*(page_count-1) }, "slow");
			page = page_count;
		}else{
			$movie_list.animate({ left : '+='+v_width }, "slow");
			page--;
		}
		$parent.find("span").eq((page-1)).addClass("current").siblings().removeClass("current");
	}
});

$("span.next-btn").click(function(){
	findObj(this);
	if($pageIndex < $pageCount){
	 	$pageIndex++;
	 	$parent.find("div.highlight_tip span:first").html($pageIndex);
	 }
	 else{
	 	$parent.find("div.highlight_tip span:first").html(1);
	 }

	if(!$movie_list.is(":animated")){
		if(page == page_count){
		$movie_list.animate({left:'0px'},"slow");
		page = 1;
		}
		else{
			$movie_list.animate({left : '-='+v_width}, "slow");
			page++;
		}
		$parent.find("span").eq((page-1)).addClass("current").siblings().removeClass("current");
	}
	
});

var index = 0;
var $sliderWrapper = $(".slider-wrapper").eq(0);

$("a.btn-prev").click(function(){
	prev_slidePage();
})
$("a.btn-next").click(function(){
	next_slidePage()
})
function prev_slidePage(){
	index--;
	if(index < 0){
		index = 2;
	}
	//showCurrentDot();
	$(".dot").eq((index)).addClass("activate").siblings().removeClass("activate");
	var currentLeft = $sliderWrapper.css("left"),
		newLeft;
	if(currentLeft === "0px"){
		newLeft = -1290;
	}
	else{
		newLeft = parseInt(currentLeft)+645;
	}
	$sliderWrapper.css("left",newLeft + "px");
}
function next_slidePage(){
	index++;
	if(index > 2){
		index = 0;
	}
	//showCurrentDot();
	$(".dot").eq((index)).addClass("activate").siblings().removeClass("activate");
	var currentLeft = $sliderWrapper.css("left"),
		newLeft;
	console.log(currentLeft);
	if(currentLeft === "-2580px"){
		newLeft = -1290;
	}
	else{
		newLeft = parseInt(currentLeft)-645;
	}
	$sliderWrapper.css("left",newLeft + "px");
}
function showCurrentDot(){
	for(var i=0; i<dots.length; i++){
		dots[i]
	}
}