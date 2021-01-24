$(function() {
    var $image = $('#image');
    var layer = layui.layer;
    //配置选项
    const options = {
            //纵横比
            aspectRatio: 1,
            //指定预览区域
            preview: 'img-preview'
        }
        //创键裁剪区域
    $image.cropper(options);
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })
    $('#file').on('change', function(e) {
        var filelist = e.target.files;
        if (filelist.length == 0) {
            return layer.msg('请选择图片');
        }
        var file = filelist[0];
        var imgUrl = URL.createObjectURL(file);
        $image
            .cropper('destroy') //销毁旧的裁剪区域
            .attr('src', imgUrl) //重新设置图片路径
            .cropper('options'); //重新初始化裁剪区域
    })
    $('.layui-btn-danger').on('click', function() {
        var dataURL = $image.cropper('getCroppedCanvas', {
                //创键一个Canvas画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更换头像失败')
                }
                layer.msg('更换头像成功')
                window.parent.getUserInfo();
            }
        })
    })
})