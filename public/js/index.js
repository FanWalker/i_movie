var page = 1;
var i = 5;
var $parent,$movie_list,$movie_content,
	$pageIndex,$pageCount;
var v_width, len, page_count;

var $mov_sliderWrapper = $(".gaia-movie .slider-wrapper").eq(0),
	$tv_sliderWrapper = $(".gaia-tv .slider-wrapper").eq(0),
	$movie_dots = $(".gaia-movie .dot"),
	$tv_dots = $(".gaia-tv .dot"),
	$tv_index = 0, $mov_index = 0;

$(function(){
	$(".highlight_tip span:first").addClass("current");

	$(".gaia-movie a.btn-prev").click(function(){
		prev_slidePage($movie_dots, $mov_sliderWrapper);
	})
	$(".gaia-movie a.btn-next").click(function(){
		next_slidePage($movie_dots, $mov_sliderWrapper);
	})

	$(".gaia-tv a.btn-prev").click(function(){
		prev_slidePage($tv_dots, $tv_sliderWrapper);
	})
	$(".gaia-tv a.btn-next").click(function(){
		next_slidePage($tv_dots, $tv_sliderWrapper);
	})

	slideDote($movie_dots, $mov_sliderWrapper);
	slideDote($tv_dots, $tv_sliderWrapper);
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




function prev_slidePage(dots,sliderWrapper){
	if(dots.parent().hasClass("movie")){
		$mov_index--;
		if($mov_index < 0){
			$mov_index = 2;
		}
		dots.eq(($mov_index)).addClass("activate").siblings().removeClass("activate");
	}
	else{
		$tv_index--;
		if($tv_index < 0){
			$tv_index = 2;
		}
		dots.eq(($tv_index)).addClass("current").siblings().removeClass("current");
	}
	
	var currentLeft = sliderWrapper.css("left"),
		newLeft;
	if(currentLeft === "0px"){
		newLeft = -1290;
	}
	else{
		newLeft = parseInt(currentLeft)+645;
	}
	sliderWrapper.css("left",newLeft + "px");
}
function next_slidePage(dots,sliderWrapper){
	if(dots.parent().hasClass("movie")){
		$mov_index++;
		if($mov_index > 2){
			$mov_index = 0;
		}
		dots.eq(($mov_index)).addClass("activate").siblings().removeClass("activate");
	}
	else{
		$tv_index++;
		if($tv_index > 2){
			$tv_index = 0;
		}
		dots.eq(($tv_index)).addClass("current").siblings().removeClass("current");
	}
	var currentLeft = sliderWrapper.css("left"),
		newLeft;
	if(currentLeft === "-2580px"){
		newLeft = -1290;
	}
	else{
		newLeft = parseInt(currentLeft)-645;
	}
	sliderWrapper.css("left",newLeft + "px");
}
function slideDote(dots,sliderWrapper){
	for(var i=0; i< dots.length; i++){
		(function(i){
			dots.eq(i).bind("click",function(){
				if(dots.parent().hasClass("movie")){
					console.log("movie"+i);
					var current = sliderWrapper.css("left");
					var currentLeft = parseInt(current);
					var gap = $mov_index - i;  //(3-1)=2
					if($mov_index == 2 &&  currentLeft!==-1935){
						gap = gap - 3;
					}
					if($mov_index == 0 && currentLeft!==-645){
						gap = 3 + gap;
					}
					$mov_index = i; 
					dots.eq(($mov_index)).addClass("activate").siblings().removeClass("activate");
					sliderWrapper.css("left",currentLeft + gap*645 + "px");
				}
				else{
					console.log("tv"+i);
					var current = sliderWrapper.css("left");
					var currentLeft = parseInt(current);
					console.log(currentLeft);
					var gap = $tv_index - i;  //(3-1)=2
					if($tv_index == 2 &&  currentLeft!==-1935){
						gap = gap - 3;
					}
					if($tv_index == 0 && currentLeft!==-645){
						gap = 3 + gap;
					}
					$tv_index = i; 
					dots.eq(($tv_index)).addClass("current").siblings().removeClass("current");
					sliderWrapper.css("left",currentLeft + gap*645 + "px");
				}
				//var gap = index - i;  //(3-1)=2
				/*var current = sliderWrapper.css("left");
				var currentLeft = parseInt(current);
				xif(index == 2 &&  currentLeft!==-1935){
					gap = gap - 3;
				}
				if(index == 0 && currentLeft!==-645){
					gap = 3 + gap;
				}
				sliderWrapper.css("left",currentLeft + gap*645 + "px");
				index = i;   //设置当前点亮的小圆点为i
				dots.eq((index)).addClass("activate").siblings().removeClass("activate");*/
			}) 
		})(i)
	}
}

