// table page
var managementlCtrl=angular.module("managementlCtrl",[]);
managementlCtrl.controller('tableCtrl',function($scope,$http,$interval,$cookies,$location,$window,$state,$stateParams,$rootScope){
    $scope.list =[
    	{'time':'2020-06-14', 'user':'Tom', 'userName':'yangjing'},
    	{'time':'2020-06-14', 'user':'Tom', 'userName':'yangjing'},
    	{'time':'2020-06-14', 'user':'Tom', 'userName':'yangjing'},
    	{'time':'2020-06-14', 'user':'Tom', 'userName':'yangjing'},
    	{time:'2020-06-14', 'user':'Tom1', 'userName':'yangjing'}
    ]
   
});
