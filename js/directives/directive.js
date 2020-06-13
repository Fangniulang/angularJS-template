var controlDirective = angular.module("controlDirective", []);
//省市区下拉
controlDirective.directive('addressselect', function($rootScope,$http,$timeout,$interval,$cookies,getControlService) {
    return {
        restrict: 'AE',
        scope:{province:'=',id:'=',check:'='},
        template: '<div><div class="address-select-box marl30" ng-class="{noselectbor:provinceShow}">'
                        +'<div class="address-value">'
                            +'<span ng-bind="province.provinceValue" ng-click="isShowAddress(0)">四川省</span>'
                            +'<em ng-click="isShowAddress(0)" class="address-em" ng-class={addressem:provinceShow}></em>'
                        +'</div>'
                        +'<div class="address-option-value" ng-show="provinceShow">'
                            +'<span class="address-value-span" proval="{{provinces.name}}" ng-click="proClick(provinces.name,provinces.id,0)" ng-class="{procor:provinces.name==proval}" ng-repeat="provinces in proList" ng-bind="provinces.name"></span>'
                        +'</div>'
                    +'</div>'
                    +'<div class="address-select-box" ng-class="{noselectbor:cityShow}">'
                        +'<div class="address-value">'
                            +'<span ng-bind="province.cityValue" ng-click="isShowAddress(1)">成都市</span>'
                            +'<em ng-click="isShowAddress(1)" class="address-em" ng-class={addressem:cityShow}></em>'
                        +'</div>'
                        +'<div class="address-option-value" ng-show="cityShow">'
                            +'<span class="address-value-span" ng-click="cityClick(citys.name,citys.id,0)" ng-class="{procor:citys.id==cityid}" ng-repeat="citys in cityList" ng-bind="citys.name">成都市</span>'
                        +'</div>'
                    +'</div>'
                    +'<div class="address-select-box" ng-class="{noselectbor:areaShow}" style="margin-right: 0">'
                        +'<div class="address-value">'
                            +'<span ng-bind="province.areaValue" ng-click="isShowAddress(2)">高新区</span>'
                            +'<em ng-click="isShowAddress(2)" class="address-em" ng-class={addressem:areaShow}></em>'
                        +'</div>'
                        +'<div class="address-option-value" ng-show="areaShow">'
                            +'<span class="address-value-span" ng-click="areaClick($index,areas.id)" ng-class="{procor:areas.id==areaid}" ng-repeat="areas in areaList" ng-bind="areas.name">高新区</span>'
                        +'</div>'
                    +'</div></div>',
        replace: true,
        transclude:true,
        link: function(scope, element, attrs) {
        	scope.province.provinceValue=(scope.province.provinceValue!="请选择") ? scope.province.provinceValue : "请选择";
        	scope.province.cityValue=(scope.province.cityValue!="请选择") ? scope.province.cityValue : "请选择";
        	scope.province.areaValue=(scope.province.areaValue!="请选择") ? scope.province.areaValue : "请选择";
        	//获取省
        	scope.getProvinceList=function(){
                $rootScope.Ajax('GET',$rootScope.Url+'sys/getProvince','',{countryId:1},'',false,
                    function(data,state,headers,config){
                        if(data.code==200){
                            scope.proList=data.data;  //获取省集合
                            
                        }
                });
        	};
        	scope.getProvinceList();
        	//点击省获取市
        	scope.proClick=function(val,code,n){
        		scope.proval=val;		//改变span颜色
        		scope.province.provinceValue=val;  //显示选中的省的值
                scope.province.provinceID=code;  //显示选中的省的id
        		scope.provinceShow=false;  //关闭省下拉
                if(n==0){
                    scope.province.cityValue="请选择";
                    scope.province.areaValue="请选择";
                }
                if(!scope.id){
                    scope.province.cityValue="请选择";
                    scope.province.areaValue="请选择";
                }
        		scope.areaList="";
        		//根据省code获取所有市的信息
                $rootScope.Ajax('GET',$rootScope.Url+'sys/getCity','',{provinceId:code},'',false,
                    function(data,state,headers,config){
                        if(data.code==200){
                            scope.cityList=data.data;  //获取市集合
                        }
                });
                if(!scope.check){
                    $rootScope.Mapss(val)
                }
        	};
            if(scope.id){
                var Interval=setInterval(function(){
                    if(scope.province.provinceID!=''){
                        scope.proClick(scope.province.provinceValue,scope.province.provinceID);
                        clearInterval(Interval)
                    }
                },500)
            }
        	//点击市获取区的信息
        	scope.cityClick=function(name,cityid,n){
        		scope.cityid=cityid;   //改变市span颜色
        		scope.province.cityValue=name;  //显示选中的市的值
                scope.province.cityID=cityid;   //显示选中的市的值
        		scope.cityShow=false;  //关闭市下拉
                if(n==0){
                    scope.province.areaValue="请选择";
                }
                if(!scope.id){
                    scope.province.areaValue="请选择";
                }
        		//根据市code获取所有区的信息
                $rootScope.Ajax('GET',$rootScope.Url+'sys/getDistrict','',{cityId:scope.province.cityID},'',false,
                    function(data,state,headers,config){
                        if(data.code==200){
                            scope.areaList=data.data;  //获取市集合
                        }
                });
                if(!scope.check){
                    $rootScope.Mapss(name)
                }
        	};
            if(scope.id){
                var Intervals=setInterval(function(){
                    if(scope.province.cityID!=''){
                        scope.cityClick(scope.province.cityValue,scope.province.cityID);
                        scope.areaid=scope.province.districtID;
                        clearInterval(Intervals)
                    }
                },500)
            }
        	scope.areaClick=function(idx,areaid){
        		scope.areaid=areaid;
        		scope.province.areaValue=scope.areaList[idx].name;  //显示选中的市的值
                scope.province.districtID=areaid;  //显示选中的市的值
        		scope.areaShow=false;  //关闭市下拉
        	};
        	//省市区的显示与否
            scope.isShowAddress=function(idx){
            	if(idx==0){
            		scope.provinceShow=!scope.provinceShow;
            	}else if(idx==1){
            		scope.cityShow=!scope.cityShow;
            	}else if(idx==2){
            		scope.areaShow=!scope.areaShow;
            	}
		    }
        }
    }
});
//分页
controlDirective.directive('contropage', function($http,$cookies,getControlService) {
    return {
        restrict: 'EA',
        template: '<div class="paging-box">' +
            '<ul class="pagination" ng-show="conf.totalItems > 0 && conf.totalItems>conf.itemsPerPage">' +
            '<li ng-class="{disabled: conf.currentPage == 1}" ng-click="prevPage()"><span class="pre-page leftem"></span></li>' +
            '<li ng-repeat="item in pageList track by $index">' +
            '<span class="page-num" ng-class="{checked: item == conf.currentPage, separate: item == \'...\'}" ' +
            'ng-click="changeCurrentPage(item)">{{ item }}</span>' +
            '</li>' +
            '<li ng-class="{disabled: conf.currentPage == conf.numberOfPages}" ng-click="nextPage()"><span class="next-page rightem"></span></li>' +
            '<li><a class="page-span">跳转到：</a></li>'+
            '<li><input value="" class="page-input" ng-model="jumpPageNum" ng-keyup="jumpPageKeyUp($event)" /></li>'+
            '<li><a class="page-num" ng-click="jumpToPage()">GO</a></li>'+
            '</ul>' +
            '<div class="no-items" ng-show="conf.totalItems <= 0">暂无数据</div>' +
            '</div>'
            ,
        replace: true,
        scope: {
            conf: '='
        },
        link: function(scope, element, attrs) {
            
            var conf = scope.conf;

            // 默认分页长度
            var defaultPagesLength = 9;

            // 默认分页选项可调整每页显示的条数
            var defaultPerPageOptions = [10, 15, 20, 30, 50];

            // 默认每页的个数
            var defaultPerPage = 15;

            // 获取分页长度
            if(conf.pagesLength) {
                // 判断一下分页长度
                conf.pagesLength = parseInt(conf.pagesLength, 10);

                if(!conf.pagesLength) {
                    conf.pagesLength = defaultPagesLength;
                }

                // 分页长度必须为奇数，如果传偶数时，自动处理
                if(conf.pagesLength % 2 === 0) {
                    conf.pagesLength += 1;
                }

            } else {
                conf.pagesLength = defaultPagesLength
            }

            // 分页选项可调整每页显示的条数
            if(!conf.perPageOptions){
                conf.perPageOptions = defaultPagesLength;
            }

            // pageList数组
            function getPagination(newValue, oldValue) {
                
                // conf.currentPage
                if(conf.currentPage) {
                    conf.currentPage = parseInt(scope.conf.currentPage, 10);
                }

                if(!conf.currentPage) {
                    conf.currentPage = 1;
                }

                // conf.totalItems
                if(conf.totalItems) {
                    conf.totalItems = parseInt(conf.totalItems, 10);
                }

                // conf.totalItems
                if(!conf.totalItems) {
                    conf.totalItems = 0;
                    return;
                }
                
                // conf.itemsPerPage 
                if(conf.itemsPerPage) {
                    conf.itemsPerPage = parseInt(conf.itemsPerPage, 10);
                }
                if(!conf.itemsPerPage) {
                    conf.itemsPerPage = defaultPerPage;
                }

                // numberOfPages
                conf.numberOfPages = Math.ceil(conf.totalItems/conf.itemsPerPage);

                // 如果分页总数>0，并且当前页大于分页总数
                if(scope.conf.numberOfPages > 0 && scope.conf.currentPage > scope.conf.numberOfPages){
                    scope.conf.currentPage = scope.conf.numberOfPages;
                }

                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                var perPageOptionsLength = scope.conf.perPageOptions.length;

                // 定义状态
                var perPageOptionsStatus;
                for(var i = 0; i < perPageOptionsLength; i++){
                    if(conf.perPageOptions[i] == conf.itemsPerPage){
                        perPageOptionsStatus = true;
                    }
                }
                // 如果itemsPerPage在不在perPageOptions数组中，就把itemsPerPage加入这个数组中
                if(!perPageOptionsStatus){
                    conf.perPageOptions.push(conf.itemsPerPage);
                }

                // 对选项进行sort
                conf.perPageOptions.sort(function(a, b) {return a - b});
                

                // 页码相关
                scope.pageList = [];
                if(conf.numberOfPages <= conf.pagesLength){
                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                    for(i =1; i <= conf.numberOfPages; i++){
                        scope.pageList.push(i);
                    }
                }else{
                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                    // 计算中心偏移量
                    var offset = (conf.pagesLength - 1) / 2;
                    if(conf.currentPage <= offset){
                        // 左边没有...
                        for(i = 1; i <= offset + 1; i++){
                            scope.pageList.push(i);
                        }
                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }else if(conf.currentPage > conf.numberOfPages - offset){
                        scope.pageList.push(1);
                        scope.pageList.push('...');
                        for(i = offset + 1; i >= 1; i--){
                            scope.pageList.push(conf.numberOfPages - i);
                        }
                        scope.pageList.push(conf.numberOfPages);
                    }else{
                        // 最后一种情况，两边都有...
                        scope.pageList.push(1);
                        scope.pageList.push('...');

                        for(i = Math.ceil(offset / 2) ; i >= 1; i--){
                            scope.pageList.push(conf.currentPage - i);
                        }
                        scope.pageList.push(conf.currentPage);
                        for(i = 1; i <= offset / 2; i++){
                            scope.pageList.push(conf.currentPage + i);
                        }

                        scope.pageList.push('...');
                        scope.pageList.push(conf.numberOfPages);
                    }
                }

                scope.$parent.conf = conf;
            }

            // prevPage
            scope.prevPage = function() {
                if(conf.currentPage > 1){
                    conf.currentPage -= 1;
                }
                getPagination();
            };

            // nextPage
            scope.nextPage = function() {
                if(conf.currentPage < conf.numberOfPages){
                    conf.currentPage += 1;
                }
                getPagination();
            };

            // 变更当前页
            scope.changeCurrentPage = function(item) {
                if(item == '...'){
                    return;
                }else{
                    conf.currentPage = item;
                    getPagination();
                    // conf.onChange()函数
                    if(conf.onChange) {    
                        conf.onChange(item);
                    }
                }
            };

            // 修改每页展示的条数
            scope.changeItemsPerPage = function() {

                // 一发展示条数变更，当前页将重置为1
                conf.currentPage = 1;

                getPagination();
                // conf.onChange()函数
                if(conf.onChange) {    
                    conf.onChange();
                }
            };

            // 跳转页
            scope.jumpToPage = function() {
                //if(scope.jumpPageNum==0){
                //    scope.jumpPageNum=1
                //}
                num = scope.jumpPageNum;

                console.log(scope.jumpPageNum);
                if(num.match(/\d+/)) {
                    num = parseInt(num, 10);
                
                    if(num && num != conf.currentPage) {
                        if(num > conf.numberOfPages) {
                            num = conf.numberOfPages;
                        }

                        // 跳转
                        conf.currentPage = num;
                        getPagination();
                        // conf.onChange()函数
                        if(conf.onChange) {    
                            conf.onChange();
                        }
                        scope.jumpPageNum = '';
                    }
                }
                
            };

            scope.jumpPageKeyUp = function(e){
                var keycode = window.event ? e.keyCode :e.which;
                if(keycode == 13) {
                    scope.jumpToPage();
                }
            };

            scope.$watch('conf.totalItems', function(value, oldValue) {
                
                // 在无值或值相等的时候，去执行onChange事件
                if(!value || value == oldValue) {
                    
                    if(conf.onChange) {    
                        conf.onChange();
                    }
                }
                getPagination();
            });
            scope.$watch('jumpPageNum', function(value, oldValue) {
                if(value){
                    var reg=/[^0-9]/g;
                    if(reg.test(value)||value==0){
                        scope.jumpPageNum=''
                    }
                }
                //console.log(scope.jumpPageNum+"--"+oldValue)
            })
        }
    };
});
//面包屑导航
controlDirective.directive('navigation', function($http,$cookies,$state,getControlService) {
    return {
        restrict:'EA',
        template:'<div class="nav_box clearfix">'+
        '      <ul class="clearfix">'+
        '        <li >'+
        '           <span class="nav_span" ui-sref="piechart.main">首页</span>'+
        '        </li>'+
        '        <li ng-class="{yes_nav_li:val.claShow}" ng-repeat="val in navlist track by $index">'+
        '          <span class="nav_span"  ng-class="{yes_nav_span:val.claShow}" ng-bind="val.tittle" ng-click="HERF($index,val.path,val.parameter)"></span>'+
        '          <em class="nav_close_em " ng-class="{yes_nav_close_em:val.claShow}"></em>'+
        '        </li>'+
        '      </ul>'+
        '    </div>',
        replace:true,
        scope:{
            navlist: '='
        },
        link:function(scope,element,attrs){
            scope.navlist[scope.navlist.length-1].claShow=true;
            scope.HERF=function(a,toform,parameter){
                scope.navlist[scope.navlist.length-1].claShow=false;
                scope.navlist[a].claShow=true;
                if(parameter){
                    $state.go(toform,parameter);
                }else {
                    $state.go(toform);
                }

            }
        },
        controller:function($scope){

        }
    };
});
//数字选择器
controlDirective.directive('numberbox', function($http,$cookies,getControlService,$stateParams) {
    return {
        restrict: 'EA',
        template: '<div class="times_d clearfix"><input type="text" maxlength="2" ng-model="time.times" ng-blur="blurnum($event)" onkeyup="this.value=this.value.replace(/[^0-9]/g,&#39;&#39;);">' +
        '<em ng-click="up()" ng-class={em_look:checks}></em><i ng-click="down()" ng-class={i_look:checks}></i><p ng-show="checks"></p></div>',
        replace: true,
        scope:{
            time: '='
        },
        link: function(scope, element, attrs){
        },
        controller: function($scope){
            //ng-class={"colorTimes":className==true}
             $scope.checks=$stateParams.look==1?true:false;
             $scope.Tostring=function(num){
                 if(num.toString().length==1){
                     return '0'+num;
                 }else{
                     return num;
                 }
                 $scope.$apply();
             };
             var ty=$scope.time.type;
             //增加
             $scope.up=function(){
                 $scope.time.times=$scope.Tostring((parseInt($scope.time.times)+1));
                 if(ty=='h'){
                     if($scope.time.times>24){
                         $scope.time.times=24;
                     }
                 }else if(ty=='m'){
                     if($scope.time.times>59){
                         $scope.time.times=59;
                     }
                 }
             };
             //减少
             $scope.down=function(){
                 $scope.time.times=$scope.Tostring((parseInt($scope.time.times)-1));
                 if($scope.time.times<0){
                     $scope.time.times='00';
                 }
             };
             //失去焦点
             $scope.blurnum=function(event){
                 var obj=$(event.target);
                 if(!(common.isValidateNumber(obj.val()))){
                     $scope.time.times='00';
                     obj.val('00');
                     common.promptFun(2,'请输入正整数');
                     return
                 }
                 if($scope.time.times==''||$scope.time.times==null||$scope.time.times==undefined){
                     $scope.time.times='00'
                 }else if(($scope.time.times).toString().length<2){
                     $scope.time.times='0'+$scope.time.times;
                 }
                 if(ty=='h'){
                     var H=$scope.time.times;
                     if(Number(H)>24){
                         common.promptFun(2,'小时不超过24');
                         $scope.time.times=24
                     }
                 }else if(ty=='m'){
                     var M=$scope.time.times;
                     if(Number(M)>59){
                         common.promptFun(2,'分钟不超过59');
                         $scope.time.times=59
                     }
                 }
             };
             $scope.$watch('numbers',function(newval,oldval){
                 if(ty=='h'){
                     if(newval>24){
                         $scope.time.times=24;
                     }
                 }else if(ty=='m'){
                     if($scope.time.times>59){
                         $scope.time.times=59;
                     }
                 }
             })
        }
    };
});
//下拉框选择器
controlDirective.directive('selectbox', function($http,$cookies,getControlService) {
    return {
        restrict: 'EA',
        template: '<div class="check_c"> '+
        '<div class="m-staffselec" ng-click="hidebox=!hidebox;">'+
        '<a href="javascript:void(0)" ng-bind="name"></a><em class="u-select"></em> ' +
        '<div class="u-hide" ng-show="hidebox"> ' +
        '<p ng-repeat="val in data" ng-bind="val.name" ng-click="checked(val)"></p> ' +
        '</div></div></div>',
        replace: true,
        scope:{
            data: '=',//代表列表数据
            name:'=',//初始化选中数据
            num:'=' //选中的id
        },
        link: function(scope, element, attrs){},
        controller: function($scope){
            $scope.hidebox=false;
            $scope.checked=function(obj){
                $scope.num=obj.id;
                $scope.name=obj.name;
            };
            $scope.$watch('names',function(newval,oldval){
              console.log('aa')
            })
        }
    };
});
//删除大区或行政区域
controlDirective.directive('delbox', function($http,$cookies,getControlService) {
    return {
        restrict: 'EA',
        template: ' <div class="del_box" ng-show="check">' +
        ' <div class="del_content">' +
        ' <img src="../images/common_img/error_p.png" alt="" /> ' +
        '<h2>您确定要删除此个大区设置</h2> <div class="del_btn_A"> ' +
        '<a href="javascript:void(0)" ng-click="check=false;">取消</a> ' +
        '<a href="javascript:void(0)" class="color_A" ng-click="delOparea()">确定</a> </div> </div> </div>',
        replace: true,
        scope:{
            check:'=' //弹出框显示与隐藏
        },
        link: function(scope, element,attrs){},
        controller: function($scope){
            //删除大区设置或行政区域
            $scope.delOparea=function(){
                $scope.check=false;
            };
        }
    };
});
//成功错误提示框
controlDirective.directive('promptbox', function($http,$cookies,getControlService) {
    return {
        restrict: 'EA',
        template: '<div class="common_box"  ng-show="prompt"> <div class="common_content"> ' +
        '<img ng-src={{"../images/common_img/"+Src+".png"}} alt="" /> <h2>{{text}}</h2>' +
        ' </div> </div>',
        replace: true,
        scope:{
            text: '=',//代表标题
            prompt:'=',//弹出框显示与隐藏
            tbs:'=' //1:代表成功 2:代表失败
        },
        link: function(scope, element, attrs){},
        controller: function($rootScope,$scope,$interval){
            $scope.$watch('tbs',function(newval,oldval){
                if(newval){
                    $scope.Src=$scope.tbs==1?'sucic':'erroric';
                }
            });
            $scope.$watch('prompt',function(newval,oldval){
                if(newval){
                    $interval(function(){
                        $scope.prompt=false;
                    },3000);
                }
            })
        }
    };
});
