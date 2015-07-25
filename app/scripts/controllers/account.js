'use strict';

/**
 * @ngdoc function
 * @name linkApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the linkApp
 */
angular.module('linkApp')
  .controller('AccountCtrl', [ '$scope','$http','$location','$localStorage','ENV', function($scope,$http,$location,$localStorage,ENV){

	$scope.newUser = {'username':'', 'email':'', 'password':'', 'repassword':''};
	$scope.message = '';
	$scope.error = false;
	$scope.createAccount = function(isValid){
	
		if(!isValid)
		{
			$scope.message = 'There was an error.';
			$scope.error = true;
			return;
		}
	
		$http.post(ENV.apiEndpoint + "/index.php/users/", $scope.newUser)
			.success(function(res) {
				
				if(res.isValid == "true"){
					$localStorage.username = $scope.newUser.username;
					$location.path("/board");
				}
				else{
					$scope.message = res.errorMsg;
					$scope.error = true;
				}
			});
	}
}]);