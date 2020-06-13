var headerCtrl=angular.module("headerCtrl",[]);
headerCtrl.controller('headerCtrl',function($rootScope,$scope,$cookies,$location,$state,$http,getControlService){
    //header头部下拉框
    $scope.headerShow=false;
    //获取名字
    $scope.developerData=$cookies.get("developerData");
    if($scope.developerData){
        var data=angular.fromJson($scope.developerData);
        $scope.loginName=data.loginName;
    }else{
        $scope.loginName='';
    }
    //退出
    $scope.exitLogin=function(){
        $rootScope.Ajax('post',$rootScope.Url+'sys/logout','','','',false,
            function(data,state,headers,config){
                if(data.code==200){
                    //$cookies.remove("username");
                    //$cookies.remove("password");
                    $cookies.remove("developerData");
                    $cookies.remove("developerData");
                    common.promptFuns(1,'退出成功','',function(){
                        // window.location.href="login.html";
                        $state.go('login');
                    });
                }
        })
    };
});
