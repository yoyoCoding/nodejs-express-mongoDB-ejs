$(function(){
	$('#myModal').on('show.bs.modal', function(e){
		var $this = $(this),
			$title = $this.find('.modal-title'),
			$sure_btn = $this.find('.sure-btn');
		$title.text('我是新标题');
	})

	$('#myModal').on('click', '.sure-btn', function(){
		// $('#myModal').modal('hide');
		/*var $modal = $(this).parents('#myModal'),
			$title = $modal.find('.pd-name'),
			$price = $modal.find('.pd-price'),
			$fee = $modal.find('.pd-fee'),
			$des = $modal.find('.pd-des');
		var data = {
			title: $title.val(),
			price: $price.val(),
			fee: $fee.val(),
			pic: ''
		}

		$.ajax({
			url: '/addProduct',
			type: 'post',
			data: data,
			dataType: 'json',
			success: function(res){
				if(res.code == 200) {
					alert('添加成功')
					window.location.reload();
				} else {
					console.log(res.msg);
				}
			}
		})*/
		$('#myForm').submit()
	})
})