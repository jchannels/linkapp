'use strict';

/**
 * @ngdoc function
 * @name linkApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the linkApp
 */
angular.module('linkApp')
   .controller('LoginCtrl',  [ '$scope','$http','$location','$localStorage','ENV', function($scope,$http,$location,$localStorage, ENV){

	$scope.loginData = {'username':'', 'password':''};
	$scope.mensaje = '';
	
	$scope.keypress = function($event){
		if ($event.keyCode === 13){
			$scope.gogo();
        }
	};
		
	$scope.gogo = function(){
	
		$http.post( ENV.apiEndpoint + "/index.php/authentication/", $scope.loginData).
			success(function(res) {
				if(res.authentification === "true"){
				
					$localStorage.username = $scope.loginData.username;
					$location.path("/board");
				}
				else{
					$scope.mensaje = res.authentification;
                }
			});
	};
	
	$scope.cancelLogin = function(){
		$scope.loginData = {'username':'', 'password':''};
		$location.path("/");
	};
}]); 
   