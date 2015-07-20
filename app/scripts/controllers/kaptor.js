'use strict';

/**
 * @ngdoc function
 * @name linkApp.controller:KaptorCtrl
 * @description
 * # KaptorCtrl
 * Controller of the linkApp
 */
angular.module('linkApp')
  .controller('KaptorCtrl',  [ '$scope','$http','$localStorage', function($scope,$http,$localStorage){

	$scope.collapsed = false;
	
	$scope.keypress = function($event){
		if ($event.keyCode == 13)
			$scope.confirmEdition($scope.kaptor);
	};
	
	$scope.$on('collapse-all', function(event, args) {
		$scope.kaptor.collapsed  = true;
	});
	
	$scope.$on('uncollapse-all', function(event, args) {
		$scope.kaptor.collapsed  = false;
	});
	
	$scope.collapse =function(){
		if($scope.kaptor.collapsed)
			$scope.kaptor.collapsed  = false;
		else
			$scope.kaptor.collapsed  = true;
	}

	$scope.oldTitle = '';
	
	$scope.editKaptor =function(kaptor){
		$scope.oldTitle = kaptor.title;
		kaptor.mode = 'edit';
	}
	
	$scope.cancelEdition =function(kaptor){
		kaptor.title = $scope.oldTitle;
		kaptor.mode = 'view';
	}
	
	$scope.confirmEdition =function(kaptor){
		kaptor.mode = 'view';
		$http.put('http://localhost/linkaptor/api/index.php/kaptors/' + kaptor.id,kaptor);
	}
	
	$scope.deleteKaptor = function(kaptor) {
		if(!confirm("Do you want to delete the kaptor?"))
			return;
	
		$http.delete("http://localhost/linkaptor/api/index.php/kaptors/" + kaptor.id)
			.success(function(){
				$scope.onDeleteKaptor();
			});
	};
	
	
	$scope.addingLink = false;
	$scope.newLink = {'url':'','title':''};
	
	$scope.addLink = function(kaptor) {
	
		var link = {"title":$scope.newLink.title, "url":$scope.newLink.url};
		if(typeof link.url === "undefined")
			link.url= '';
		
		$http.post("http://localhost/linkaptor/api/index.php/kaptors/" + kaptor.id + "/links", link)
			.success(function(response) {
				kaptor.links.push(response);
			});
		
		$scope.newLink = {"title":'', "url":''};
	};
	
	$scope.addNewEmptyLink = function(kaptor) {
	
		if($scope.addingLink )
		
			$scope.addingLink = false;		
		else
			$scope.addingLink = true;		
	};	
	
	$scope.deleteLink = function(kaptor,link,index) {
		
		if(!confirm("Do you want to delete the link " ))
			return;
		
		$http.delete("http://localhost/linkaptor/api/index.php/links/" + link.id )
		.success(function(response) {
			kaptor.links.splice(index,1);
		});
		kaptor.mode = 'edit';	
	};	
	
	$scope.editLink = function(kaptor,link) {
		
		kaptor.mode = 'edit-link';	
		$scope.previousLinkTitle = link.title;	
		$scope.previousURLTitle = link.url;					
		$scope.newLink = link;		
	};	
	
	$scope.cancelEditLink= function(kaptor,link) {
		kaptor.mode = 'edit';	
		link.title = $scope.previousLinkTitle ;	
		link.url = $scope.previousURLTitle;		
		$scope.newLink = {};
	};	

	$scope.confirmEditLink= function(kaptor,link) {
		
		$http.put("http://localhost/linkaptor/api/index.php/links/" + link.id, link)
		.success(function(response) {
		
		});
		$scope.newLink = {};
		kaptor.mode = 'edit';	
	};	
		

	$scope.cancelNewLink = function() {
		$scope.addingLink = false;	
		$scope.newLink = {};
	};	

	$scope.subscribe = function(kaptor){
		var subscription ={'username':$localStorage.username, 'kaptorId': kaptor.id};
		
		$http.post('http://localhost/linkaptor/api/index.php/users/'+$localStorage.username+'/subscriptions',subscription)
				.success(function(response) {
					kaptor.title = kaptor.title + ' Added';
				});
	}	
	
	$scope.unsubscribe = function(kaptor){
		
		$http.delete('http://localhost/linkaptor/api/index.php/subscriptions/' + kaptor.subscription_id)
				.success(function(response) {
					$scope.onDeleteKaptor();
				});
	}	
	
	$scope.isOwner = function(kaptor){
		return $localStorage.username == kaptor.username;	
	}
	
	$scope.refresh = function(kaptor){
		$http.get("http://localhost/linkaptor/api/index.php/kaptors/" + kaptor.id)
			.success(function(res) {
				$scope.lookForChange(kaptor.links,res.links);
				kaptor.links = res.links;
			});
	}
	
	$scope.lookForChange = function(oldLinks, refreshedLinks){
		
		angular.forEach(refreshedLinks, function(link) {
				
				if( $scope.isNewLink(link,oldLinks))
					link.isNew = true;
			});
	}
	
	$scope.isNewLink = function(link, oldLinks){
	
		 for (var i = 0; i < oldLinks.length; i++) {
			if (oldLinks[i].id === link.id) {
				return false;
			}
		}
		return true;
	}
}]);