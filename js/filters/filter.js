var controlFilter = angular.module("controlFilter", []);
controlFilter.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];
      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });

      return output;
   };
});
controlFilter.filter('strtime', function() {
   return function(time) {
     var time = time.substring(10,16);
      return time;
   };
});
/*数字格式化*/
controlFilter.filter("num",function($sce){
    return function(input){
        function ToString(time){
            if(time.toString().length==1){
                return '0'+time;
            }else{
                return time;
            }
            $sce.$apply();
        }
        return ToString(input);
    }
});
/*时间序列化*/
controlFilter.filter("StimeFormate",function($sce){
    return function(input){
        return new Date(parseInt(input)).format("yyyy-MM-dd hh:mm:ss");
    }
});
/*列表倒计时格式化*/
controlFilter.filter("countdownFilter",function($sce){
    return function(input,sta){
        function ToString(time){
            if(time.toString().length==1){
                return '0'+time;
            }else{
                return time;
            }
            $sco.$apply();
        }
        if(isNaN(input)){
            input=0;
        }
        if(sta=="h"){
            var h=parseInt(Math.abs((input/3600)%24));
            return ToString(h);
        }else if(sta=="m"){
            var m=parseInt(Math.abs((input/60)%60));
            return ToString(m);
        }else{
            var s=parseInt(Math.abs(input%60));
            return ToString(s);
        }
    }
});

/*数据限制条件*/
controlFilter.filter("limitToData",function($sce){
    return function(input){
        return input.slice(16);
    }
});
