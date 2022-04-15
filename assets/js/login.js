$(function() {
    //注册登录切换
    $('#reg_but').click(function() {
        $('.register').show();
        $('.login').hide();
    })
    $('#login_but').click(function() {
        $('.register').hide();
        $('.login').show();
    })

    // 表单格式验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.register [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    });

    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            //阻止默认的提交行为
            e.preventDefault();
            $.post('/api/reguser', {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            }, function(res) {
                if (res.status != 0) {
                    //return console.log(res.message);
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                $('#login_but').click();
            })
        })
        // 监听注册表单的提交事件
        // 监听注册表单的提交事件
        // $('#form_reg').on('submit', function(e) {
        //     //layer.msg('注册成功，请登录！');
        //     // 1. 阻止默认的提交行为
        //     e.preventDefault()
        //         // 2. 发起Ajax的POST请求
        //     var data = {
        //         username: $('#form_reg [name=username]').val(),
        //         password: $('#form_reg [name=password]').val()
        //     }
        //     $.post('/api/reguser', data, function(res) {
        //         if (res.status !== 0) {
        //             layer.msg('注册shibai，请登录！')
        //             return layer.msg(res.message)
        //         }
        //         layer.msg('注册成功，请登录！')
        //             // 模拟人的点击行为
        //         $('#link_login').click()
        //     })
        // })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
            //阻止默认的提交行为
            e.preventDefault();
            // $.post('/api/login', {
            //         username: $('#form_login [name=username]').val(),
            //         password: $('#form_login [name=password]').val()
            //     }, function(res) {
            //         if (res.status != 0) {
            //             //return console.log(res.message);
            //             layer.msg('登录失败！');
            //         }
            //         layer.msg('登录成功');
            //         // $('#login_but').click();
            //     })
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status != 0) {
                        //console.log(res.token);
                        return layer.msg('登录失败！');
                    }
                    layer.msg('登录成功!');
                    //将token值存到localStorage中
                    //console.log(res.token);
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }
            })
        })
        // $('#form_login').submit(function(e) {
        //     // 阻止默认提交行为
        //     e.preventDefault()
        //     $.ajax({
        //         url: '/api/login',
        //         method: 'POST',
        //         // 快速获取表单中的数据
        //         data: $(this).serialize(),
        //         success: function(res) {
        //             if (res.status !== 0) {
        //                 return layer.msg('登录失败！')
        //             }
        //             layer.msg('登录成功！')
        //                 // 将登录成功得到的 token 字符串，保存到 localStorage 中
        //             localStorage.setItem('token', res.token)
        //                 // 跳转到后台主页
        //             location.href = '/index.html'
        //         }
        //     })
        // })



    //底部
})