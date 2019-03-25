$(function(){
	$('#logout').on('click', function(){
		$.ajax({
			url: '/admin/login/logout',
			type: 'post',
			data: {},
			dataType: 'json',
			success: function(res){
				if(res.code == 200) {
					alert(res.msg)
					window.location.href = '/admin/login'
				} else {
					alert(res.msg)
				}
			}
		})
	})
})