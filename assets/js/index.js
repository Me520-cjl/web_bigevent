var layer = layui.layer;
$(function() {
    //获取用户信息
    getUserInfo();

    //退出功能
    $('#btnlogout').click(function() {
        //eg1
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清空本地的token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    });
})


//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        mothod: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //layui.layer.msg('获取用户信息成功');
            //console.log(res);
            renderAvatar(res.data);
        },
    })
}

function renderAvatar(user) {
    //console.log(user);
    var name = user.nickname || user.username
        //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需求渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }
    //渲染文字头像
    else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}