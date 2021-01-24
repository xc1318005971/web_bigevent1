$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间'
            }
        }
    })
    initUserInfo();
    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        console.log(1);
        // 阻止表单的默认重置行为
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo();
            }
        })
    })

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                form.val('formUserInfo', res.data)
                    // $('#login-name').val(res.data.username)
                    // $('#nickname').val(res.data.nickname)
                    // $('#email').val(res.data.email)
                    // $('#hidden').val(res.data.id)
            }
        })
    }
})