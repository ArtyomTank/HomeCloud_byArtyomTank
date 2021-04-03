$('#submit').bind('click', function(e){
		e.preventDefault();
		$("#result").html("")
		for(i=0; i<$('.filedata').length; i++){
			let file = $('.filedata')[i].files[0];
			let data = new FormData();
			data.append('filedata', file);
			$.ajax({
				url: '/upload',
				method: 'POST',
				async: false,
				processData: false ,
				contentType: false,
				data: data,
				success:function(res){
					$("#result").append(res+"<br/>");
				}
			});
		}
		
	});
	
	$('#add-file').bind('click', function(e){
		$('#file-list>div').append('<input class="filedata" name="filedata" type="file" />')
	});