let pageData = {'page':1, 'length':50, 'dir':""}; //dir = "mn/gg/" or "nm/" or "" e.t.c.
let oldDir = new Array("");

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
				
				let delBut = ConstructorControllButtonHref(
						'❌Удалить',
						'/controll/' + data.files[i] + '/' + 'delete',
						'delete-button',
						DelBut_Click
					);
				
				let viewBut = ConstructorControllButtonHref(
						'👁Смотреть',
						'/controll/' + data.files[i] + '/' + 'view',
						'view-button',
						ViewBut_Click
					);
				
				
				let renameBut = ConstructorControllButtonHref(
						'💬Переименовать',
						'/controll/' + data.files[i] + '/' + 'rename',
						'rename-button',
						RenameBut_Click
					);
				
				/* let a = $('<a download></a>');
				a.attr('href',src);
				a.append(data.files[i]);
				a.click(ReloadContent); */
				
				let src = '/download/'+pageData.dir+data.files[i];
				let a = ConstructorControllButtonHref(
						data.files[i],
						'/download/'+pageData.dir+data.files[i],
						'download-button',
						DownloadBut_Click,
						{'filename': data.files[i]}
					);
				
				//tdName.append(`<img width="16px" src="icons/file1.ico"/>`);
				tdName.append(`<img width="16px" src="${src}"/>`);
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
				
				tdName.append('<img width="16px" src="/icons/folder1.ico"/>');
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