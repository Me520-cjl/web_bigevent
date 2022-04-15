$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').click(function() {
        // console.log('fasfsa');
        $('#file').trigger('click');
    })

    $('#file').change(function(e) {
        var fileist = e.target.files;
        if (fileist.length === 0) {
            return layer.msg('请选择照片！');
        }
        //拿到用户选择的照片，转换为路径
        var file = e.target.files[0];
        var newImgurl = URL.createObjectURL(file);
        //console.log(newImgurl);
        $image.cropper('destroy').attr('src', newImgurl).cropper(options);

    })
    $('#btnUpload').click(function() {
        var dataURL = $image.cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            //console.log(dataURL);

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL,
            },
            success: function(res) {
                //layer.msg('更换头像失败！');
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！');
                }
                //'更换头像成功！'
                layer.msg('更换头像成功！');
                //console.log(res);
                window.parent.getUserInfo();
            }
        })
    })
})