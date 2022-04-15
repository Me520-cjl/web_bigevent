$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //layer.open()的索引
    var indexEdit = null;
    initArticleList();
    //向服务器获取文章信息

    var p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function(res) {
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('#tbody').html(htmlStr);
            }
        })
    }

    // 通过代理的方式给edit_form绑定编辑事件,修改文章分类的窗口
    $('tbody').on('click', '#edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类 ',
            content: $('#dialog-edit').html(),
        });
        //给文章添加id
        var id = $(this).attr('data-id');
        //发起获取对应分类的请求
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('edit_form', res.data);
            }
        })

    })

    //此处更新事件失败，可能是接口的问题
    // 通过代理的方式给edit_form绑定submit事件
    $('body').on('submit', '#edit_form', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    //console.log($(this).serialize());
                    if (res.status !== 0) {
                        return layer.msg('更新分类数据失败！');
                    }
                    initArticleList();
                    layer.msg('更新分类数据成功！');
                    layer.close(indexEdit); //此时你只需要把获得的index，轻轻地赋予layer.close即可
                }
            })
        })
        //通过代理的方式绑定删除事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        //询问提示框
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                data: $(this).serialize(),
                success: function(res) {
                    //console.log($(this).serialize());
                    if (res.status !== 0) {
                        console.log(res);
                        return layer.msg('删除分类数据失败！');
                    }
                    initArticleList();
                    layer.msg('删除分类数据成功！');
                }
            })
            layer.close(index);
        });
    })

})