let pageData = {'page':1, 'length':50, 'dir':""}; //dir = "mn/gg/" or "nm/" or "" e.t.c.
let oldDir = new Array("");
	
function RenameBut_Click(e){
	let elem = $(e.target);
	let url = elem.attr('href');
	$.get(url, {'newname':prompt(`Введите новое название для ${url.split('/')[2]}`), 'dir':pageData.dir}, function(data){
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
	$.get(url, pageData, function(data){
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
			
			for(let i in data.dir){
				let tr = $('<tr></tr>');
				let tdName = $('<td></td>');
				let tdControll = $('<td></td>');
				let tdDate = $('<td></td>');
				let a = $('<a></a>')
				
				let delBut = $('<button></button>');
				delBut.attr('href','/controll/' + data.dir[i] + '/' + 'delete');
				delBut.attr('class', 'delete-button');
				delBut.append('❌Удалить');
				delBut.click(DelBut_Click);
				
				let renameBut = $('<button></button>');
				renameBut.attr('href','/controll/' + data.dir[i] + '/' + 'rename');
				renameBut.attr('class', 'rename-button');
				renameBut.append('💬Переименовать');
				renameBut.click(RenameBut_Click);
				
				//a.attr('href','/download/'+data.dir[i]);
				a.append(data.dir[i] + '\\');
				a.click(function(e){
						pageData.dir = pageData.dir + data.dir[i] + '\\';
						oldDir.push(pageData.dir);
					});
				a.click(ReloadContent);
				
				tdName.append(a);
				tdName.attr('class', 'col-name');
				
				tdControll.append(delBut).append(" ").append(renameBut);
				tdControll.attr('class', 'col-controll');
				
				tdDate.append("");
				tdDate.attr('class', 'col-data');
				
				tr.append(tdName).append(tdControll).append(tdDate);
				
				$('#table-view').append(tr);
			}
			$('#pathDir').html('<b>Путь: \\' + pageData.dir + '</b>');
		});
}

$(document).ready(function() {
	//init
	
	
	$('button#reload').click(ReloadContent);
	$('button#back-dir').click(function(e){
			if (oldDir.length > 1) oldDir.pop(oldDir.length - 1);
			pageData.dir = oldDir[oldDir.length - 1];
			ReloadContent();
		});
	
	
	//first load
	ReloadContent();
});