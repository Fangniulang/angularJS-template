var statisticalApp=angular.module('statisticalApp',
    ['ngCookies','ui.router','oc.lazyLoad','controlService','controlDirective','controlFilter','headerCtrl','managementlCtrl']);//管理系统

statisticalApp.run(['$rootScope','$http','$cookies','$state',function($rootScope,$http,$cookies,$state){
        // $rootScope.Url='http://192.168.0.16:8061/';
        //$rootScope.Url='http://192.168.0.199:8041/';
        $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
            // if(toState.url=='/main'){
            //
            // }
        });
        $rootScope.GetQueryString=function(name){
                var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
                var r = window.location.href.substr(1).match(reg);
                if(r!==null)return  unescape(r[2]); return null;
        };
        $rootScope.Ajax=function(type,url,headers,params,data,cache,callBack,errCallBack){
                var header=headers===''?{'token':$cookies.get('developerTokens'),'Content-Type':'application/json'}:headers;
                var developerToken=$cookies.get('developerTokens') || '';
                if(url.indexOf('index/login')<0){
                    url = url + '?token='+developerToken;
                }
                $http({
                    method:type,
                    url:url,
                    headers:header,
                    params:params,
                    data:data,
                    cache:cache
                }).success(function(data,state,headers,config){
                    callBack(data,state,headers,config);
                    if(data.code===200||data.code===201){
                        return
                    }
                    if(data.code===401){
                        common.promptFuns(2,'请求失败',$rootScope.Error_code((data.code).toString()),function(){
                            $state.go('login')
                        });
                    }else{
                        common.promptFun(2,'请求失败',$rootScope.Error_code((data.code).toString()));
                    }
                }).error(function(e){
                    if(errCallBack){
                         errCallBack(e);
                    }
                });
        };
        //$rootScope.$watch('$viewContentLoaded',function(event){
        //    $rootScope.Window();
        //});
        //错误码
        $rootScope.errorCode={
            1000:"字典Key不存在",
            200:"请求成功",
            400:"参数错误",
            500:"服务器繁忙,请稍后再试!",
            201:"查询数据为空",
            401:"token验证失败，请重新登陆",
            1001:'记录已存在',
            1100:'账号不存',
            1102:'输入密码错误',
            6000:'该员工没有与楼盘的关联记录',
            6004:'员工电话号码已存在,不能添加'
        };
        $rootScope.Error_code=function(code){
            var errorMsg='';
            for(var key in $rootScope.errorCode){
                if(key===code){
                    errorMsg=$rootScope.errorCode[key];
                }
            }
            return errorMsg;
        };
        //删除弹出框
        $rootScope.delCommoms=function(tittle,callFun){
            $('.delBox').show();
            $('.delBox h2').html(tittle);
            $rootScope.QX=function(){
                $('.delBox').hide();
            };
            $rootScope.QD=function(){
                $('.delBox').hide();
                callFun();
            }
        };
}]);
statisticalApp.config([ '$httpProvider',function($httpProvider){
        $httpProvider.interceptors.push('httpInterceptor');
}]);
statisticalApp.factory('httpInterceptor',['$q','$injector','$cookies',function($q, $injector,$cookies){
        var httpInterceptor={
                // 'request': function(config){
                //     config.headers = config.headers || {};
                //     if($cookies.get('token')){
                //         config.headers.token=$cookies.get('token');
                //     }
                //     return config;
                // },
                'responseError':function(response){
                    if(response.status===401){
                        common.promptFuns(2,response.data.msg,'',function(){
                            $state.go('login')
                        });
                    }else{
                        common.promptFun(2,'服务器错误('+ response.status+')','');
                    }
                    console.log(JSON.stringify(response));
                    return $q.reject(response);
                }
        };
        return httpInterceptor;
}]);


