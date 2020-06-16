var managementlCtrl=angular.module("managementlCtrl",[]);
managementlCtrl.controller('managementlCtrl',function($scope,$http,$cookies,$location,$state,$stateParams,$rootScope,getControlService) {
    $scope.StopPropagation=function(){
        var obj=$('.sect_div');
        obj.hide();
        obj.parent().find('i').removeClass('active_i');
    };
    $scope.routerList = [
    	{name: 'piechart.table'}
    ];
    
});
