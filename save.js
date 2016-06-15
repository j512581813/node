var request = require('request');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var url = "http://dig.chouti.com/";
request(url,function(error,response,body){
	if(!error&&response.statusCode ==200){
		//console.log(body);
		getData(body);
	}else{ 
		console.log("抓取数据失败！");
	}
});
function getData(data){
	var $ = cheerio.load(data);
	var arr = [];
	$('#content-list .part2').each(function(index,element){
		var $this = $(element);
		var data = {
          title: $this.attr('share-title'),
          href: $this.attr('href'),
          img: $this.attr('share-pic')
			
		};
		arr.push(data);
	})
	saveData(arr);
}
function saveData(data){
	var temp = JSON.stringify(data);
	fs.writeFile("bb.json",temp,function (err) {
     if (err) throw err ;
     console.log("File Saved !"); //文件被保存
	});
	fs.exists("bb.json",function(err){
		console.log(err)
	});
	fs.stat('bb.json', function(err, stat){
	 console.log(stat);
	});
	fs.rename('bb.json',"test.json",function(err){
		if(!err)console.log("rename success！");
	})
}
