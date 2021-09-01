const express = require('express');
const config = require('config');
const hbs = require('hbs');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
var mime = require("mime");

const app = express();
const jsonParser = express.json();

const PORT = config.get('port') || 5000;
const ServerCloudFiles = config.get('filesPath') || 'C:\\HomeCloudUserFiles';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ServerCloudFiles)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });

if (!fs.existsSync(ServerCloudFiles)) {
    try {
      fs.mkdirSync(ServerCloudFiles, { recursive: true })
    } catch (error) {
        console.error(error)
    }
}



app.set("view engine","hbs");
app.use(express.static(path.join(__dirname, "/public")));

hbs.registerPartials(path.join(__dirname, "/views/partials"));

//middlewares
app.get("/",function (req, res){
	res.render("index.hbs");
})

app.get("/view-uploaded",function(req,res){
	//console.log(req.query);
	if(!req.query) return res.sendStatus(400);
	
	let files = new Array();
	/* files.name = new Array();
	files.mime = new Array();
	files.stats = new Array(); */
	
	let dirs = new Array();
	
	let path_v = path.join(ServerCloudFiles, req.query.dir, '/');

	fs.readdir(path_v, function(err, items) {
		for (var i=0; i<items.length; i++) {
			let pathF = path_v + items[i];
			//console.log(pathF);
			if(fs.statSync(pathF).isDirectory()){
				let o = {
					'name':items[i],
					'stats':fs.statSync(pathF)
				};
				dirs.push(o);
			}
			else{
				let o = {
					'name':items[i],
					'stats':fs.statSync(pathF),
					'mime':mime.getType(pathF)
				};
				files.push(o);
			}
		}
		let sendJson = {
				'files':files, 
				'dirs':dirs
			};
		//fs.writeFileSync('log/log.json', JSON.stringify(sendJson), function(err){console.log(err)});
		res.json(sendJson);
	});
})

app.get("/download/*",function (req, res){
	let filePath = ServerCloudFiles + '\\' + req.params[0];
	//console.log(req.params);
	if (fs.existsSync(filePath)) {
		res.sendFile(filePath);
	} else {
		res.status(404);
	}

})

app.get("/controll/:file/:action",function(req,res){
	let filePath = ServerCloudFiles + '\\' + req.query.dir + req.params["file"];
	
	try{
		if (fs.existsSync(filePath)){
			//delete
			if(req.params['action'] == 'delete'){
				if (fs.statSync(filePath).isDirectory())
					fs.rmdir(filePath, (err) => {//delete dir
						if (err) {
							console.error(err); // если возникла ошибка  
							res.send('Ошибка! Возможно папка не пуста. Для удаления папки удалите все файлы внутри');
						}
						else{
							console.log(`${req.params["file"]} был удалён`);
							res.send(`${req.params["file"]} был удалён`);
						}
					});
				else 
					fs.unlink(filePath, (err) => {//delete file
						if (err) {
							console.error(err); // если возникла ошибка
							res.send(err);
						}
						else{
							console.log(`${req.params["file"]} был удалён`);
							res.send(`${req.params["file"]} был удалён`);
						}
					});
			}
			//rename
			if(req.params['action'] == 'rename'){
				if (!req.query.newname)
					return res.send(`Ошибка при переименовывании файла`)
				let newname = ServerCloudFiles + '\\' + req.query.newname;
				fs.rename(filePath, newname, (err) => {
						if (err) throw err;// если возникла ошибка    
						console.log(`${req.params["file"]} переименован в ${req.query.newname}`);
						res.send(`${req.params["file"]} переименован в ${req.query.newname}`);
					});
			}
			return;
		}
	} 
	catch (err){
		console.error(err);
	}
})

app.post("/upload", upload.single("filedata"), function (req, res, next) {
   
    let filedata = req.file;
 
    //console.log(filedata);
    if(!filedata)
        res.send(`Ошибка при загрузке файла`);
    else
        res.send(`${filedata.filename} загружен`);
})

app.use("*", function(req,res){
	res.render("err404.hbs");
})

//listen
 app.listen(PORT, ()=>{
	console.log('\n>>>>>>>>>>>>');
	console.log(`Домашнее Облако запущено на порте ${PORT}`);
	console.log(`Файлы находятся в ${ServerCloudFiles}`)
});


