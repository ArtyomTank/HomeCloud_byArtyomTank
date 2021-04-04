let pageData = {'page':1, 'length':50, 'dir':"/"};
	
function RenameBut_Click(e){
	let elem = $(e.target);
	let url = elem.attr('href');
	$.get(url, {'newname':prompt(`Введите новое название для ${url.split('/')[2]}`)}, function(data){
			ReloadContent();
			alert(data);
		});
}

function ViewBut_Click(e){
	let elem = $(e.target);
	$.get(elem.attr('href'),function(data){
			
		});
}

function DelBut_Click(e){
	let elem = $(e.target);
	let url = elem.attr('href');
	if (!confirm(`Вы действительно желаете удалить ${url.split('/')[2]}?`)) 
		return;
	$.get(url,function(data){
			ReloadContent();
			alert(data);
		});
}

function ReloadContent(){
	$('#table-view').html('<tr><th>Имя</th><th>Управление</th><th>Дата</th></tr>');
	$.get('/view-uploaded', pageData,
		function(data) {
			console.log(data);
			for(let i in data.files){
				let tr = $('<tr></tr>');
				let tdName = $('<td></td>');
				let tdControll = $('<td></td>');
				let tdDate = $('<td></td>');
				let a = $('<a download></a>')
				
				let delBut = $('<button></button>');
				delBut.attr('href','/controll/' + data.files[i] + '/' + 'delete');
				delBut.attr('class', 'delete-button');
				delBut.append('❌Удалить');
				delBut.click(DelBut_Click);
				
				let viewBut = $('<button></button>');
				viewBut.attr('href','/controll/' + data.files[i] + '/' + 'view');
				viewBut.attr('class', 'view-button');
				viewBut.append('👁Смотреть');
				viewBut.click(ViewBut_Click);
				
				let renameBut = $('<button></button>');
				renameBut.attr('href','/controll/' + data.files[i] + '/' + 'rename');
				renameBut.attr('class', 'rename-button');
				renameBut.append('💬Переименовать');
				renameBut.click(RenameBut_Click);
				
				a.attr('href','/download/'+data.files[i]);
				a.append(data.files[i]);
				a.click(ReloadContent);
				
				tdName.append(a);
				tdName.attr('class', 'col-name');
				
				tdControll.append(delBut).append(" ").append(viewBut).append(" ").append(renameBut);
				tdControll.attr('class', 'col-controll');
				
				tdDate.append("");
				tdDate.attr('class', 'col-data');
				
				tr.append(tdName).append(tdControll).append(tdDate);
				
				$('#table-view').append(tr);
			}
		});
}

$(document).ready(function() {
	//init
	
	
	$('button#reload').click(ReloadContent);
	
	//first load
	ReloadContent();
});