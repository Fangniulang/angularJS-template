statisticalApp.config(["$stateProvider","$urlRouterProvider",'routerProvider',function ($stateProvider, $urlRouterProvider,routerProvider) {
    // $urlRouterProvider.otherwise("/piechart/chart");
    $urlRouterProvider.when("", "/login");
    $stateProvider
        .state("login", {   // 登录
            url: "/login",
            templateUrl: "login.html",
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/login.css',
                        '../js/login.js'
                    ])
                }]
            }
        })
        
        /*******************手机客户端侧边导航*************************/
        .state("piechart", {   //侧边导航
            url: "/piechart",
            templateUrl: "./piechart.html",
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('../css/piechart.css')
                }]
            }
        })
        .state("piechart.table", { //主页
            url: "/table",
            templateUrl: "./controllers/table.html",
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/table.css',
                        '../js/controllers/table.js'
                    ])
                }]
            }
        })

        .state("piechart.permission_set", { //权限设置
            url: "/permission_set",
            templateUrl: "./system/permission_set.html",
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/system/permission_set.css',
                        '../js/controllers/system/permission_set.js'
                    ])
                }]
            }
        })
        .state("piechart.add_permission", { //添加岗位权限
            url: "/add_permission",
            templateUrl: "./system/add_permission.html",
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/system/add_permission.css',
                        '../js/controllers/system/add_permission.js'
                    ])
                }]
            }
        })
        .state("piechart.other_set", { //其他权限
            url: "/other_set",
            templateUrl: "./system/other_set.html",
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        '../css/system/other_set.css',
                        '../js/controllers/system/other_set.js'
                    ])
                }]
            }
        })

    routerProvider.setCollectionUrl('../js/routeCollection.json');
    console.log($stateProvider)




}]);
