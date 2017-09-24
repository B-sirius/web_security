'ues strict';
var url = 'http://localhost:8001';

(() => {
    // 相关dom元素
    var $input = $('#input1');
    var $postBtn = $('#post1');
    var $renderPlace = $('#render1');
    var $getBtn = $('#get1');

    // 按钮监听
    $postBtn.on('click', () => {
        // 取得数据
        var data = $input.val();

        // 发出post请求
        $.ajax({
            type: 'post',
            dataType: 'text',
            data: data,
            url: url + '/xss_1_post',
            crossDomain: true,
            success: (response) => {
                alert(response);
            }
        });
    });

    $getBtn.on('click', () => {
        // 发出post请求
        $.ajax({
            type: 'get',
            dataType: 'text',
            url: url + '/xss_1_get',
            crossDomain: true,
            success: (response) => {
                $renderPlace.html(response);
            }
        });
    });
})();

