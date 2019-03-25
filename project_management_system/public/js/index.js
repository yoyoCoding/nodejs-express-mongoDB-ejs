$(function(){
	var state = 0; // 操作状态: 1新增 2编辑
	var id = ''; // 编辑/删除商品的id

	$('#add-btn').on('click', function(){
		state = 1;
		$('#myModal').modal('show');
	})

	$('.product-list').on('click', '.edit-btn', function(){
		id = $(this).data('id');
		console.log('id:' + id);
		state = 2;
		$('#myModal').modal('show');
	})

	$('.product-list').on('click', '.del-btn', function () {
		var params = {
			url: '/delProduct',
			method: 'post',
			data: {
				id: $(this).data('id')
			}
		};
		submitFn(params, function (res) {
			if(res.code == 200) {
				alert('删除成功')
				window.location.reload();
			} else {
				console.log(res)
			}
		});
	})


	$('#myModal').on('show.bs.modal', function(e){
		var $this = $(this),
			$title = $this.find('.modal-title'),
			$name = $this.find('.pd-name'),
			$pic = $this.find('.pd-pic'),
			$price = $this.find('.pd-price'),
			$fee = $this.find('.pd-fee'),
			$pic_item = $this.find('.pic-item'),
			$sure_btn = $this.find('.sure-btn');
		$title.text('我是新标题');
		if(state == 1){
			$this.find('input').val('');
			$pic_item.show();
		} else {
			$pic_item.hide();
			fufillFields();
		}

		function fufillFields(){
			var params = {
				url: '/checkProduct',
				method: 'get',
				data: {
					id: id
				}
			};
			submitFn(params, function(res){
				if(res.data) {
					$name.val(res.data.title);
					$price.val(res.data.price);
					$fee.val(res.data.fee);
				} else {
					$this.find('input').val('');
				}
			});
		}

	})

	$('#myModal').on('click', '.sure-btn', function(){
		if(state == 1) {
			var form = new FormData($('#myForm')[0]);
			$.ajax({
				url: '/addProduct',
				type: 'post',
				data: form,
				processData: false,
				contentType: false,
				success: function (res) {
					if (res.code == 200) {
						alert('添加成功');
						window.location.reload();
					} else {
						console.log(res.msg);
					}
				}
			})
		} else {
			var params = {
				url: '/editProduct',
				method: 'post',
				data: {
					id: id,
					title: $('.pd-name').val(),
					price: $('.pd-price').val(),
					fee: $('.pd-fee').val()
				}
			};
			submitFn(params, function(res){
				if(res.code == 200){
					alert('修改成功');
					window.location.reload();
				} else {
					console.log(res.msg);
				}
			})
		}
		
	})

	var submitFn = function(params, callback){
		$.ajax({
			url: params.url,
			type: params.method,
			data: params.data,
			dataType: 'json',
			success: function (res) {
				callback(res);
			}
		})
	}
	
})