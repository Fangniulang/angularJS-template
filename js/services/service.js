var cntrolService = angular.module("controlService", []);
	cntrolService.service('getControlService',function($cookies,$http){
		// 获取入口扫掌纹页面url参数service
		this.getUrlId = function(url) { 
		  	var theRequest = new Object();
				if (url.indexOf("?") != -1) {   
				    var str = url.substr(1);   
				    strs = str.split("?");   
				    for(var i = 0; i < strs.length; i ++) {   
				        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
				    }   
			    }   
			    var array=[];
			    for(var item in theRequest){
			        array.push(theRequest[item]);
			    }
		  	return array; 
		},
		this.getUrlList=function(url,childname){
			var name,value; 
		   	var num=url.indexOf("?") 
		   	url=url.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
		   	var arr=url.split("&"); //各个参数放到数组里
		   	for(var i=0;i < arr.length;i++){ 
			    num=arr[i].indexOf("="); 
			    if(num>0){ 
				    name=arr[i].substring(0,num);
				    value=arr[i].substr(num+1);
				    if(name==childname){
				    	return value;
				    }
				} 
		    } 
		},
		this.numMul=function(arg1,arg2){    //两个浮点数相乘保持精度
			var m=0,s1=arg1.toString(),s2=arg2.toString();  
		    try{m+=s1.split(".")[1].length}catch(e){}  
		    try{m+=s2.split(".")[1].length}catch(e){}
		    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m); 
		},
		this.numDiv=function(arg1,arg2){        //两个数相除
			var t1=0,t2=0,r1,r2;  
		    try{t1=arg1.toString().split(".")[1].length}catch(e){};  
		    try{t2=arg2.toString().split(".")[1].length}catch(e){};  
		    with(Math){  
		        r1=Number(arg1.toString().replace(".",""));  
		        r2=Number(arg2.toString().replace(".",""));  
		        return (r1/r2)*pow(10,t2-t1);  
		    }  
		},
		this.numAdd=function(arg1,arg2){     //两个数相加
			var r1,r2,m;  
		    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0};  
		    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0};  
		    m=Math.pow(10,Math.max(r1,r2));  
		    return (arg1*m+arg2*m)/m;  
		},
		this.uniqueArray=function(arr){    //数组去重
			var result = [], isRepeated;
			for (var i = 0, len = arr.length; i < len; i++) {
				isRepeated = false;
				for (var j = 0, len = result.length; j < len; j++) {
					if (arr[i] == result[j]) {  
					   isRepeated = true;
					   break;
					}
				}
				if (!isRepeated) {
				  result.push(arr[i]);
				}
			}
			return result;
		},
		this.numAsCurrency=function(s){   //数字转货币格式
			if(/[^0-9\.]/.test(s)) return s;
	        s=s.replace(/^(\d*)$/,"$1.");
	        s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	        s=s.replace(".",",");
	        var re=/(\d)(\d{3},)/;
	        while(re.test(s))
                s=s.replace(re,"$1,$2");
	        	s=s.replace(/,(\d\d)$/,".$1");
	        return "￥" + s.replace(/^\./,"0.");    
		},
		this.currencyAsNum=function(p){   //货币转数字
			var p=p.substring(p.indexOf("￥")+1,p.length);
			p=parseFloat(p.split(",").join(""));
			return p;
		},
		//获取分页列表
		this.getPageList=function(current, length, displayLength){
			var indexes = [];  
		   	var start = Math.round(current - displayLength / 2);  
		   	var end = Math.round(current + displayLength / 2);  
		    if (start <= 1) {  
		        start = 1;  
		        end = start + displayLength - 1;  
		       if (end >= length - 1) {  
		           end = length - 1;  
		        }  
		    }  
		    if (end >= length) {  
		       end = length;  
		        start = end - displayLength + 1;  
		       if (start <= 1) {  
		           start = 1;  
		        }  
		    }  
		    for (var i = start; i <= end; i++) {  
		        indexes.push({num:i});  
		    }  
		    return indexes;
		},
		//base64解码
		this.base64decode=function(str){
			var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);  
			var c1, c2, c3, c4;  
		    var i, len, out;  
		    len = str.length;  
		    i = 0;  
		    out = "";  
		    while (i < len) {  
		        /* c1 */  
		        do {  
		            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
		        }  
		        while (i < len && c1 == -1);  
		        if (c1 == -1)   
		            break;  
		        /* c2 */  
		        do {  
		            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
		        }  
		        while (i < len && c2 == -1);  
		        if (c2 == -1)   
		            break;  
		        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
		        /* c3 */  
		        do {  
		            c3 = str.charCodeAt(i++) & 0xff;  
		            if (c3 == 61)   
		                return out;  
		            c3 = base64DecodeChars[c3];  
		        }  
		        while (i < len && c3 == -1);  
		        if (c3 == -1)   
		            break;  
		        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
		        /* c4 */  
		        do {  
		            c4 = str.charCodeAt(i++) & 0xff;  
		            if (c4 == 61)   
		                return out;  
		            c4 = base64DecodeChars[c4];  
		        }  
		        while (i < len && c4 == -1);  
		        if (c4 == -1)   
		            break;  
		        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
		    }  
		    return out; 
		},
		// 把utf8转为utf16
		this.utf16to8=function(str) { 
			var out, i, len, c;
	        var char2, char3;
	        out = "";
	        len = str.length;
	        i = 0;
	        while(i < len) {
	            c = str.charCodeAt(i++);
	            switch(c >> 4)
	            {
	                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
	                // 0xxxxxxx
	                out += str.charAt(i-1);
	                break;
	                case 12: case 13:
	                // 110x xxxx 10xx xxxx
	                char2 = str.charCodeAt(i++);
	                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
	                break;
	                case 14:
	                // 1110 xxxx 10xx xxxx 10xx xxxx
	                    char2 = str.charCodeAt(i++);
	                    char3 = str.charCodeAt(i++);
	                    out += String.fromCharCode(((c & 0x0F) << 12) |
	                        ((char2 & 0x3F) << 6) |
	                        ((char3 & 0x3F) << 0));
	                    break;
	            }
	        }
	        return out;
		}
	});