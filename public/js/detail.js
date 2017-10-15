// 处理删除电影数据的逻辑
$(function () {
    $('.comment').click(function (e) {
        var target = $(this);
        var toId = target.data('tid');
        var commentId = target.data('cid');

        $('<input>').attr({
            type: 'hidden',
            name: 'comment[tid]',
            value: toId
        }).appendTo('#commentForm')
        
        $('<input>').attr({
            type: 'hidden',
            name: 'comment[cid]',
            value: commentId
        }).appendTo('#commentForm')
    });
    $('#commentForm').ajaxForm(function(data){

    })
});