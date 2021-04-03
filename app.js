const express = require('express');
const config = require('config');
const hbs = require('hbs');
const multer = require('multer');
const fs = require('fs');

const app = express();
const jsonParser = express.json();

const PORT = config.get('port') || 5001;
const ServerCloudFiles = config.get('filesPath') || 'C:\\HomeCloudUserFiles';

app.set("view engine","hbs");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

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


//middlewares
app.get("/",function (req, res){
	res.render("index.hbs");
})

app.get("/view-uploaded",jsonParser,function(req,res,next){
	console.log(req.query);
	if(!req.query) return res.sendStatus(400);
	
	fs.readdir(ServerCloudFiles, function(err, items) {
		/*console.log(items);

		for (var i=0; i<items.length; i++) {
			console.log(items[i]);
		}*/
		res.json(items);
	});
	//res.json(req.query);
})

app.get("/download/:file",function (req, res){
	let filePath = ServerCloudFiles + '\\' + req.params["file"];
	if (fs.existsSync(filePath)) {
		res.sendFile(filePath);
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

app.get("*", function(req,res){
	res.render("err404.hbs");
})

//listen
 app.listen(PORT, ()=>{
	console.log(`Домашнее Облако запущено на порте ${PORT}`);
	console.log(`Файлы находятся в ${ServerCloudFiles}`)
});

