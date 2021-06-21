//need JQuery
//ControllButton & ControllButton Events
function ConstructorControllButtonHref(text, href, classname, event, jsondata = {}){
	let _but = $('<button></button>');
	_but.attr('href',href);
	_but.attr('class', classname);
	_but.append(text);
	_but.click(event);
	_but.attr('jsondata',JSON.stringify(jsondata));
	return _but;
}

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

function DownloadBut_Click(e){
	let elem = $(e.target);
	let url = elem.attr('href');
	//let filename = (JSON.parse(elem.attr('jsondata'))).filename;
	
	let link = document.createElement('a');
	link.setAttribute('download','');
	link.setAttribute('href', url);
    link.click();
	console.log(link);
	/*
	$.ajax({
            url: url,
            dataType: 'binary',
            xhrFields: {
                'responseType': 'blob'
            },
            success: function(data, status, xhr) {
                let link = document.createElement('a');
                //let filename = 'o';
                if(xhr.getResponseHeader('Content-Disposition')){//имя файла
                    filename = xhr.getResponseHeader('Content-Disposition');
                    filename=filename.match(/filename="(.*?)"/)[1];
                    filename=decodeURIComponent(escape(filename));
                } 
                link.href = URL.createObjectURL(data);
                link.download = filename;
                link.click();
            }
        });
	*/
}