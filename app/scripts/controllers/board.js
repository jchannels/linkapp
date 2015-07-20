'use strict';

/**
 * @ngdoc function
 * @name linkApp.controller:BoardCtrl
 * @description
 * # BoardCtrl
 * Controller of the linkApp
 */
angular.module('linkApp')
  .controller('BoardCtrl',  [ '$scope','$interval','$http','$rootScope','$location','$localStorage', function($scope,$interval,$http, $rootScope,$location,$localStorage){

	$scope.addNewKaptor = function() {
	
		$scope.newKaptor = {"title":"", "isNew":"true", "links":[] };
		$http.post('http://localhost/linkaptor/api/index.php/users/'+$localStorage.username+'/kaptors',$scope.newKaptor )
			.success(function(response) {
				var k = response;
				k.mode = 'edit';
				$scope.arrengeKaptor(k);
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
			$http.get("http://localhost/linkaptor/api/index.php/users/"+$localStorage.username+"/kaptors")
				.success(function(response) {
					$scope.initData();
					
					angular.forEach(response.kaptors, function(k) {
						k.mode = 'view';
						$scope.arrengeKaptor(k);
					});
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
		$http.get("http://localhost/linkaptor/api/index.php/kaptors?search=" + $scope.searchWord)
			.success(function(res) {
				$scope.initData();
					angular.forEach(res.kaptors, function(k) {
						k.mode = 'search';
						k.collapsed = true;
						$scope.arrengeKaptor(k);
					});
			});
	};
	
	$scope.cancelSearch=function(){
		$scope.startup();	
		$scope.searchWord = '';		
		$scope.searching = false;
	};
	
	$scope.arrengeKaptor = function(kaptor){
	
		if($scope.nextColumn ===4) {
			$scope.nextColumn = 0;
        }
		$scope.kaptors[$scope.nextColumn].push(kaptor);
		$scope.nextColumn++;
	};
	
	$scope.startup();
}]);