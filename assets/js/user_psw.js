$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            samepsw: function(value) {
                if (value === $('[name=oldPsw]').val()) {
                    return '新旧密码不能相同！';
                }
            },
            renewpsw: function(value) {
                if (value !== $('[name=newPsw]').val()) {
                    return '两次密码不一致';
                }
            }
        })
        //$('').attr('value', 'Me520');
        //重置功能
    $('#btnReset').click(function(e) {
        e.preventDefault();
        $('.layui-form')[0].reset();
    })

    //监听表单的提交事件
    $('.layui-form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepsw',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！');
                }
                layer.msg('更新密码成功！');
                //调用父页面的方法重新渲染头像
                $('.layui-form')[0].reset();
            }
        })
    })

})