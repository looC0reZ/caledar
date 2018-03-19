'use strict';

const PROJECT_NAME = process.argv[2];
if(PROJECT_NAME){
	let fs = require('fs');
	let path = require('path');
	let zip = new require('node-zip')();

	zip.file('.htaccess', fs.readFileSync('./.htaccess'));
	zip.file('index.html', fs.readFileSync('./index.html'));
	zip.file('favicon.ico', fs.readFileSync('./favicon.ico'));
	zip.file('errordocument.php', fs.readFileSync('./errordocument.php'));
	zip.file('getxmldata.php', fs.readFileSync('./getxmldata.php'));

	//zip.file(PROJECT_NAME + '.css', fs.readFileSync('./dist/' + PROJECT_NAME + '.css'));
	zip.file(PROJECT_NAME + '.js', fs.readFileSync('./dist/' + PROJECT_NAME + '.js'));
	zip.file(PROJECT_NAME + '.map', fs.readFileSync('./dist/' + PROJECT_NAME + '.map'));
	let addFolderRecursive = (path, zipPath) =>{
		if(fs.existsSync(path)){
			fs.readdirSync(path).forEach(function(file, index){
				let curPath = path + '/' + file;
				let curZipPath = zipPath + '/' + file;
				if(fs.lstatSync(curPath).isDirectory()){
					addFolderRecursive(curPath);
				}else{
					zip.file(curZipPath, fs.readFileSync(curPath));
				}
			});
		}
	};
	addFolderRecursive('./dist/images', 'images');
	let zipData = zip.generate({base64: false, compression: 'DEFLATE'});
	fs.writeFile('./dist/' + PROJECT_NAME + '.zip', zipData, 'binary', (err) =>{
		if(!err){
			let deleteFolderRecursive = (path) =>{
				if(fs.existsSync(path)){
					fs.readdirSync(path).forEach(function(file, index){
						let curPath = path + '/' + file;
						if(fs.lstatSync(curPath).isDirectory()){ // recurse
							deleteFolderRecursive(curPath);
						}else{ // delete file
							fs.unlinkSync(curPath);
						}
					});
					fs.rmdirSync(path);
				}
			};
			deleteFolderRecursive('./dist/images');
			//fs.unlinkSync('./dist/' + PROJECT_NAME + '.css');
			fs.unlinkSync('./dist/' + PROJECT_NAME + '.js');
			fs.unlinkSync('./dist/' + PROJECT_NAME + '.map');
		}
	});
}