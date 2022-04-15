$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在1~6个字符之间';
                }
            }
        })
        //$('').attr('value', 'Me520');
    initUserinfo();
    //获取用户信息
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                //console.log(res);
                //console.log('gaga');
                form.val('formUserinfo', res.data);
            }
        })
    }
    //重置功能
    $('#btnReset').click(function(e) {
        e.preventDefault();
        initUserinfo();
    })

    //监听表单的提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！');
                }
                layer.msg('更新用户信息成功！');
                //调用父页面的方法重新渲染头像
                window.parent.geiUserInfo();
                initUserinfo();
            }
        })
    })

})