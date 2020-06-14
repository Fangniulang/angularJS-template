// table page
var managementlCtrl=angular.module("managementlCtrl",[]);
managementlCtrl.controller('tableCtrl',function($scope,$http,$interval,$cookies,$location,$window,$state,$stateParams,$rootScope){
    var tableColumns = [
        {field: 'time', title: '时间', sortable: true},
        {field: 'user', title: '用户', sortable: true},
        {field: 'userName', title: '用户名', sortable: true}
    ]
    $scope.list =[
    	{'time':'2020-06-14', 'user':'Tom1', 'userName':'yangjing1'},
    	{'time':'2020-06-15', 'user':'Tom2', 'userName':'yangjing2'},
    	{'time':'2020-06-16', 'user':'Tom3', 'userName':'yangjing3'},
    	{'time':'2020-06-17', 'user':'Tom4', 'userName':'yangjing4'},
    	{'time':'2020-06-18', 'user':'Tom5', 'userName':'yangjing5'}
    ];
    $("#realTime_Table").bootstrapTable({
        search: true,
        pagination: false,
        pageSize: 15,
        pageList: [5, 10, 15, 20],
        showColumns: true,
        showRefresh: false,
        showToggle: true,
        locale: "zh-CN",
        striped: true,
        columns: tableColumns,
        data: $scope.list
    });
   
});
