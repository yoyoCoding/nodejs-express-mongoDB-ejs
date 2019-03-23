$(function(){
	$('#myModal').on('show.bs.modal', function(e){
		var $this = $(this),
			$title = $this.find('.modal-title'),
			$sure_btn = $this.find('.sure-btn');
		$title.text('我是新标题');
	})

	$('#myModal').on('click', '.sure-btn', function(){
		var form = new FormData($('#myForm')[0]);

		$.ajax({
			url: '/addProduct',
			type: 'post',
			data: form,
			processData: false,
			contentType: false,
			success: function(res){
				if(res.code == 200) {
					alert('添加成功')
					window.location.reload();
				} else {
					console.log(res.msg);
				}
			}
		})
	})
	
})