var managementlCtrl=angular.module("managementlCtrl",[]);
managementlCtrl.controller('loginCtrl',function($scope,$http,$interval,$cookies,$location,$window,$state,$stateParams,$rootScope){
    $scope.text={
        name: '11111111',
        password:'123456'
    };
    //输入框提示标记
   
    // 获得焦点事件
    $scope.focuscolor=function(num){
        switch (num){
            case 1:
                $scope.name_success=false;
                $scope.name_error=false;
                break;
            case 2:
                $scope.pwd_success=false;
                $scope.pwd_error=false;
                break;
        }
    };
    // 失去焦点事件
    $scope.blurcolor=function(num){
        switch (num){
            case 1:
                if($scope.text.name===''|| $scope.text.name===undefined || $scope.text.name===null){
                    $scope.name_success=false;
                    $scope.name_error=true;
                }else{
                    $scope.name_success=true;
                    $scope.name_error=false;
                }
                break;
            case 2:
                if($scope.text.password===''|| $scope.text.password===undefined || $scope.text.password===null){
                    $scope.pwd_success=false;
                    $scope.pwd_error=true;
                }else {
                    $scope.pwd_success=true;
                    $scope.pwd_error=false;
                }
                break;
        }
    };
    // 登录按钮
    $scope.login=function(){
        if($scope.text.name===''|| $scope.text.name===undefined || $scope.text.name===null){
            common.promptFuns(2,'请填写用户名');
            return;
        }else if($scope.text.password===''|| $scope.text.password===undefined || $scope.text.password===null){
            common.promptFuns(2,'请填写密码');
            return;
        }
        var password = md5($scope.text.password);
        var loginlist={
            account:$scope.text.name,   	//用户名
            password:password    //密码
        };
        $rootScope.Ajax('post',$rootScope.Url+'public/index/login','','',loginlist,false,
            function(data,state,headers,config){
                if(data.code=="200"){
                    var times=1000*60*60*6; //6小时缓存
                    $cookies.put("developerData",JSON.stringify(data.data),{expires:new Date(new Date().getTime()+times)});
                    $cookies.put("developerTokens",data.data.token,{expires:new Date(new Date().getTime()+times)});
                    $state.go('main')
                    
                }else{
                    if(data.code===2001){
                        $scope.name_success=false;
                        $scope.name_error=true;
                    }else if(data.code===2003){
                        $scope.pwd_success=false;
                        $scope.pwd_error=true;
                    }
                    // common.promptFuns(2,$scope.Error_code(data.code),'');
                }
            });
    };
    //回车事件
    $(document).on('keyup',function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode===13){
            $scope.login();
        }
    });

    //登录界面显示
    $scope.loginBtnShow=true;
    $scope.findPasswordBtnShoe=false;
    $scope.resetPasswordShow=false;

});
