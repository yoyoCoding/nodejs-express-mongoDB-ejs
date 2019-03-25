$(function(){
	$('#btn').on('click', function(){
		var username = $('#username').val()
		var pswd = $('#pswd').val()
		submit({
			username: username,
			pswd: pswd
		})
	})

	var submit = function(data) {
		$.ajax({
			url: '/admin/login/doLogin',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function(res){
				if(res.code == 200) {
					alert('登录成功')
					window.location.href = '/admin/product'
				} else {
					console.log(res.msg)
				}
			}
		})
	}
})