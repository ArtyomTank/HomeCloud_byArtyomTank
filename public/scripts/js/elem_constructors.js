<<<<<<< HEAD
//need JQuery

class FileItemControll{
	constructor(file, path, actionControllButtons){
		this._file = file;
		this._path = path;
		
		this._name = file.name;;
		
		this._actionControllButtons = actionControllButtons;
		
		this._isDirectory = file.mime? false : true;
	}
	
	get name(){
		return this._name;
	}
	
	get isDirectory(){
		return this._isDirectory;
	}
	
	getElement(){
		let fileItem = $('<div></div>');
		fileItem.attr('class', 'fileitem');
		fileItem.attr('path',this._path);
		fileItem.attr('file',this._file.name);
		fileItem.attr('tabindex',-1);
		
		let preview = $('<div></div>');
		preview.attr('class','preview')
		
		let con;
		if (!this._isDirectory){
			let src = 'download/' + this._path + this._name;
			if(this._file.mime.includes('image/')){
				con = $('<img/>');
				con.addClass('image-content');
				con.addClass('all-content');
				con.attr('src', src)
			}
			else if(this._file.mime.includes('video/')){
				con = $('<video></video>');
				con.addClass('video-content');
				con.addClass('all-content');
				con.attr('src', src);
				con.attr('controls','')
			}
		}
		else{
			con = $('<img src="icons/folder1" />');
			con.addClass('image-content');
		}
		let wrap = $('<div></div>');
		wrap.addClass('content-wrap');
		wrap.append(con);
		preview.append(wrap);
		
		fileItem.append(preview);
		for (let actionControllButton of this._actionControllButtons)
			fileItem.append(actionControllButton.getElement());
		return fileItem;
	}
	
}


//ControllButton & ControllButton Events

class ActionButtonControll{
	constructor(text, classname, event, href=''){
		this._but = $('<button></button>');
		//this._but.attr('href',href);
		this._but.attr('class', classname);
		this._but.addClass('controll-button');
		this._but.append(text);
		this._but.click(event);
	}
	
	set href(value){
		_but.attr('href', value);
	}
	get href(){
		return _but.attr('href');
	}
	getElement(){
		return this._but;
	}
}

function RenameBut_Click(e){
	let elem = $(e.target.parent());
	let path = elem.attr('path');
	let url = 'controll/' + elem.attr('file') + '/rename';
	$.get(url, {'newname':prompt(`Введите новое название для ${url.split('/')[2]}`), 'dir':path}, function(data){
			ReloadContent();
			alert(data);
		});
}

function ViewBut_Click(e){
	let elem = $(e.target).parent();
	$.get(elem.attr('file'),function(data){
			
		});
}

function DelBut_Click(e){
	let elem = $(e.target).parent();
	let path = elem.attr('path');
	let url ='controll/' + elem.attr('file') + '/delete';
	if (!confirm(`Вы действительно желаете удалить ${elem.attr('file')}?`)) 
		return;
	$.get(url, {'dir':path}, function(data){
			ReloadContent();
			alert(data);
		});
}

function DownloadBut_Click(e){
	let elem = $(e.target).parent();
	let url = 'download/' + elem.attr('path') + elem.attr('file');
	
	let link = document.createElement('a');
	link.setAttribute('download','');
	link.setAttribute('href', url);
    link.click();
=======
//need JQuery

class FileItemControll{
	constructor(file, path, actionControllButtons){
		this._file = file;
		this._path = path;
		
		this._name = file.name;;
		
		this._actionControllButtons = actionControllButtons;
		
		this._isDirectory = file.mime? false : true;
	}
	
	get name(){
		return this._name;
	}
	
	get isDirectory(){
		return this._isDirectory;
	}
	
	getElement(){
		let fileItem = $('<div></div>');
		fileItem.attr('class', 'fileitem');
		fileItem.attr('path',this._path);
		fileItem.attr('file',this._file.name);
		fileItem.attr('tabindex',-1);
		
		let preview = $('<div></div>');
		preview.attr('class','preview')
		
		let con;
		if (!this._isDirectory){
			let src = 'download/' + this._path + this._name;
			if(this._file.mime.includes('image/')){
				con = $('<img/>');
				con.addClass('image-content');
				con.addClass('all-content');
				con.attr('src', src)
			}
			else if(this._file.mime.includes('video/')){
				con = $('<video></video>');
				con.addClass('video-content');
				con.addClass('all-content');
				con.attr('src', src);
				con.attr('controls','')
			}
		}
		else{
			con = $('<img src="icons/folder1" />');
			con.addClass('image-content');
		}
		let wrap = $('<div></div>');
		wrap.addClass('content-wrap');
		wrap.append(con);
		preview.append(wrap);
		
		fileItem.append(preview);
		for (let actionControllButton of this._actionControllButtons)
			fileItem.append(actionControllButton.getElement());
		return fileItem;
	}
	
}


//ControllButton & ControllButton Events

class ActionButtonControll{
	constructor(text, classname, event, href=''){
		this._but = $('<button></button>');
		//this._but.attr('href',href);
		this._but.attr('class', classname);
		this._but.addClass('controll-button');
		this._but.append(text);
		this._but.click(event);
	}
	
	set href(value){
		_but.attr('href', value);
	}
	get href(){
		return _but.attr('href');
	}
	getElement(){
		return this._but;
	}
}

function RenameBut_Click(e){
	let elem = $(e.target.parent());
	let path = elem.attr('path');
	let url = 'controll/' + elem.attr('file') + '/rename';
	$.get(url, {'newname':prompt(`Введите новое название для ${url.split('/')[2]}`), 'dir':path}, function(data){
			ReloadContent();
			alert(data);
		});
}

function ViewBut_Click(e){
	let elem = $(e.target).parent();
	$.get(elem.attr('file'),function(data){
			
		});
}

function DelBut_Click(e){
	let elem = $(e.target).parent();
	let path = elem.attr('path');
	let url ='controll/' + elem.attr('file') + '/delete';
	if (!confirm(`Вы действительно желаете удалить ${elem.attr('file')}?`)) 
		return;
	$.get(url, {'dir':path}, function(data){
			ReloadContent();
			alert(data);
		});
}

function DownloadBut_Click(e){
	let elem = $(e.target).parent();
	let url = 'download/' + elem.attr('path') + elem.attr('file');
	
	let link = document.createElement('a');
	link.setAttribute('download','');
	link.setAttribute('href', url);
    link.click();
>>>>>>> 9747d1f14c9529e22b516ab58682abe61441bd1e
}