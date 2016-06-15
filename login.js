var http=require("http");  
var querystring=require("querystring");  
  
var contents=querystring.stringify({  
    CookieDate:0,  
    username:"admin",  
	token:'2ffbda07',  
    password:"fdqwe12a"  
});  
  
var options={  
    host:"theme.3gtest.gionee.com/",  
    //path:"/user/ajax_login.json",  
    method:"post",  
    headers:{  
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",  
        "Content-Length":contents.length,         
        "Accept":"application/json, text/javascript, */*; q=0.01",  
      
        "Accept-Language":"zh-cn",  
        "Cache-Control":"no-cache",  
        "Connection":"Keep-Alive",    
		"Host":"theme.3gtest.gionee.com",
        "Referer":"http://theme.3gtest.gionee.com/Admin/login/index",  
        "User-Agent":"Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; BOIE9;ZHCN)",  
        "X-Requested-With":"XMLHttpRequest"  
    }  
};  
  
var req=http.request(options,function(res){  
    res.setEncoding("utf8");  
    res.on("data",function(data){  
        console.log(data);  
    });  
});  
  
  
req.write(contents);  
req.end();