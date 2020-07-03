'use strict'

angular.module('Routing', ['ui.router'])
    .provider('router', function ($stateProvider) {

        var urlCollection;

        this.$get = function ($http, $state) {
            return {
                setUpRoutes: function () {
                	console.log(12)
                    $http.get(urlCollection).success(function (collection) {
                        for (var routeName in collection) {
                            if (!$state.get(routeName)) {
                                $stateProvider.state(routeName, {
                                	url: collection[routeName].url,
                                	templateUrl: collection[routeName].templateUrl,
                                	resolve: {
                                		load: ['$ocLazyLoad',function($ocLazyLoad) {
                                			return $ocLazyLoad.load([,
                                				collection[routeName].css,
                                				collection[routeName].js
                                			])
                                		}]
                                	}
                                });
                            }
                        }
                    });
                }
            }
        };
        console.log(this.$get())
        this.setCollectionUrl = function (url) {
            urlCollection = url;
        }
    })

    .run(function (router) {
        router.setUpRoutes();
    });
