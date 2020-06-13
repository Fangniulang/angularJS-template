
var common={
    /*只能输入正整数*/
    isValidateNumber:function(value){
        return /^\d+$/.test(value);
    },
    /*判断是否为空*/
    isEmpty:function(value){
        return /^\s*$/.test(value);
    },
    /*判断是否为Email*/
    isEmail:function(value){
        return /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/.test(value);
    },
    /*判断是否为手机号码*/
    isPhone:function(value){
        return /^1[3|4|5|7|8][0-9]\d{8}$/.test(value);
        //return /^(1[38][0-9]|14[57]|15[012356789]|17[0678])[0-9]{8}$/.test(value);
    },
    /*判断是否为固定电话*/
    isTel:function(value){
        return /(^0\d{2,3}\-\d{7,8}$)/.test(value);
    },
    /*判断是否为数字*/
    isNumber:function(value){
        return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    },
    /*判断是否为整形*/
    isDigits:function(value){
        return /^\d+$/.test(value);
    },
    /*判断用户名是否正确,只能是字母数字下划线，并且以字母开头(5-16位)*/
    checkUserName:function(value){
        return /^[a-zA-Z]\w{4,15}$/.test(value);
    },
    //邮政编码校验 或者 手机验证码校验
    isPostCode:function(value){
        return /^\d{6}$/.test(value);
    },
    //setCookie设置Cookie
    setCookie:function(name,value,time){
        var exp = new Date();
        exp.setDate(exp.getDate()+time);
        document.cookie = name+'='+value+';expires='+exp;
        //setCookie("userName","王",11);
        //console.log(document.cookie);
    },
    //getCookie得到Cookie
    getCookie:function(name){
        var cookieName=encodeURIComponent(name)+"=";
        var cookieStart=document.cookie.indexOf(cookieName);
        var cookieValue=null;
        if(cookieStart>-1){
            var cookieEnd=document.cookie.indexOf(';',cookieStart);
            if(cookieEnd==-1){
                cookieEnd=document.cookie.length;
            }
            cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
        }
        return cookieValue;
    },
    //removeCookie删除Cookie
    removeCookie:function(name){
        setCookie(name,1,-1)
    },
    /*
     * localStorage操作
     * setStore存储localStorage
     * getStore获取localStorage
     * removeStore删除localStorage
     */
    setStore:function(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    getStore:function(name){
        if (!name) return;
        return window.localStorage.getItem(name);
    },
    removeStore:function(name){
        if (!name) return;
        window.localStorage.removeItem(name);
    },
    //公共弹窗方法
    promptFuns:function(n,text,val,callBack){
        var common_box=$('.common_box1');
        common_box.show();
        if(n===1){
            common_box.find('img').attr('src','../image/common/suc.png')
        }else if(n===2){
            common_box.find('img').attr('src','../image/common/error.png')
        }else if(n===3){
            common_box.find('img').attr('src','../image/common/jingao.png')
        }
        common_box.find('h1').text(text);
        common_box.find('p').text(val);
        common_box.find('span').on('click',function(){
            if(callBack){
                callBack();
            }
            common_box.hide();
        });
    },
    //公共弹窗方法
    promptFun:function(n,text,val){
        var common_box=$('.common_box2');
        common_box.show();
        if(n===1){
            common_box.find('img').attr('src','../image/common/suc.png')
        }else if(n===2){
            common_box.find('img').attr('src','../image/common/error.png')
        }else if(n===3){
            common_box.find('img').attr('src','../image/common/jingao.png')
        }
        common_box.find('h1').text(text);
        common_box.find('p').text(val);
        common_box.find('span').on('click',function(){
            common_box.hide();
        });
    },

    //公共图片放大
    bgimgFun:function(src){
        var common_box_imgs=$('.common_box_imgs');
        common_box_imgs.show();
        common_box_imgs.find('img').attr('src',src);
        common_box_imgs.find('img').on('click',function(){
            common_box_imgs.hide();
        })
    },
    strLen:function(str){
        var len = 0;
        for (var i=0; i<str.length; i++){
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                len+=2;
            }
        }
        return len;
    },
    //下拉框
    dropDown:function(ev){
        ev.stopPropagation();
        $('.sect_div').removeAttr('data');
        var This=$(ev.target).parent();
        This.find('i').toggleClass("active_i");
        This.find('.sect_div').toggle().attr('data','0');
        var obj=$(".sect_div[data!=0]");
        obj.hide().parent().find('i').removeClass('active_i');
    },
    switch_code:function(str,event){
        var This=$(event.target);
        This.parent().find('p').removeClass('active_li');
        This.addClass('active_li');
        This.parent().parent().find('input').val(str);
        This.parent().parent().find('i').removeClass('active_i');
        This.parent().hide();
    },
    //侧边栏样式
    Piechart:function(n){
        var obj=$('.subnav .li_div ul li');
        obj.removeClass('active_li');
        obj.eq(n).addClass('active_li');
    }
};
/*时间格式化*/
Date.prototype.format=function(format){
    var date={
        "M+":this.getMonth()+1,
        "d+":this.getDate(),
        "h+":this.getHours(),
        "m+":this.getMinutes(),
        "s+":this.getSeconds(),
        "q+":Math.floor((this.getMonth()+3)/3),
        "S+":this.getMilliseconds()
    };
    if(/(y+)/i.test(format)){
        format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length));
    }
    for(var k in date){
        if(new RegExp("("+k+")").test(format)){
            format=format.replace(RegExp.$1,RegExp.$1.length==1?date[k]:("00"+date[k]).substr((""+date[k]).length));
        }
    }
    return format;
};
//数组去重
Array.prototype.unique3=function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};
$(function(){

});

