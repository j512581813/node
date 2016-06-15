var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.1905.com/';
//开始抓取
/*request.get({
	url : url
}, function(err, response, body){
	if(!err && response.statusCode == 200){
		console.log(body);//返回请求页面的HTML
	}else{
		console.log('抓取失败');
	}
});*/
request(url,function(error,response,body){
	if(!error &&response.statusCode){
		//console.log(body);
		getData(body);
	}
})
function getData(data){
	var $ = cheerio.load(data); //cheerio解析data数据
	//console.log($);
	var imagePic = $('.single-news img').toArray();
	
	//console.log(imagePic);
	var len = imagePic.length;
	//console.log(len);
	for(var i =0;i<len;i++){
		var imgSrc = imagePic[i].attribs.src;
		//console.log(imgSrc);
		var filename = parseUrlForFileName(imgSrc);
		downloadImg(imgSrc,filename,function(){
			console.log(filename+'done');
		})
	}
}
function parseUrlForFileName(ads){
	console.log(ads);
	var filename = path.basename(ads);
	
	return filename;
}
var downloadImg = function(uri,filename,callback){
	request.head(uri,function(err,res,body){
		if(err){
			console.log('err:'+err);
			return false;
		}
		console.log('res:'+res);
	})
	request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);
}