'use strict';

/**
 * @ngdoc function
 * @name linkApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the linkApp
 */
angular.module('linkApp')
  .controller('BoardCtrl',['$scope','$rootScope','$location','$localStorage','kaptorService',
              function($scope,$rootScope,$location,$localStorage, kaptorService){
      
	$scope.addNewKaptor = function() {
	
		$scope.newKaptor = {"title":"", "isNew":"true", "links":[] };
        
        kaptorService.addNewKaptor($scope.username,$scope.newKaptor)
                .then(function(res) {
                    $scope.initData();
            
                    angular.forEach(kaptorService.kaptors, function(k) {
                        $scope.arrengeKaptor(k);
                    }); 
                 },
                function(data) {
                    console.log('failed.')
        });
	
	};

	$scope.initData = function() {
	
		$scope.kaptors = [];
		$scope.kaptors[0] = [];
		$scope.kaptors[1] = [];
		$scope.kaptors[2] = [];
		$scope.kaptors[3] = [];
		
		$scope.nextColumn = 0;
	};

	$scope.startup = function() {
        $scope.username = $localStorage.username;

         kaptorService.getUserKaptor($scope.username)
            .then(function(kaptorsData) {

                $scope.initData();

                angular.forEach(kaptorService.kaptors, function(k) {
                    k.mode = 'view';
                    $scope.arrengeKaptor(k);
                }); 
            },
            function(data) {
                console.log('kaptors retrieval failed.')
            });
	};

	$scope.collapseUp = function(){
		$rootScope.$broadcast('collapse-all');
	};
	
	$scope.collapseDown = function(){
		$rootScope.$broadcast('uncollapse-all');
	};
	
	$scope.logout = function(){
		$scope.initData();
		$localStorage.username = "";
		$location.path("/");
	};
	
	$scope.searchWord = '';
	
    $scope.search =function(){
		$scope.searching = true;
        kaptorService.searchResult = [];
        
        kaptorService.searchKaptors($scope.searchWord)
            .then(function(kaptorsData) {

                $scope.initData();
                angular.forEach(kaptorService.searchResult, function(k) {
                        k.mode = 'search';
                        k.collapsed = true;
                        $scope.arrengeKaptor(k);
                    });
            },
            function(data) {
                console.log('kaptors retrieval failed.')
            });
        
	};
	
	$scope.cancelSearch=function(){
        
         $scope.initData();
		
         angular.forEach(kaptorService.kaptors, function(k) {
            $scope.arrengeKaptor(k);
        });

		$scope.searchWord = '';		
		$scope.searching = false;
	};
	
    $scope.orderKaptorList = function(){
    
        $scope.initData();
        angular.forEach(kaptorService.kaptors, function(k) {
                $scope.arrengeKaptor(k);
            });
    }            
                  
	$scope.arrengeKaptor = function(kaptor){
	
		if($scope.nextColumn ===4) {
			$scope.nextColumn = 0;
        }
		$scope.kaptors[$scope.nextColumn].push(kaptor);
		$scope.nextColumn++;
	};
	
                  
    // Inicial control
	$scope.startup();
}]);