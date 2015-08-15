'use strict';

/**
 * @ngdoc overview
 * @name linkApp
 * @description
 * # linkApp
 *
 * Main module of the application.
 */
angular
  .module('linkApp', ['ngRoute','ngStorage','config','angular-jwt'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
      })
      .when('/board', {
        templateUrl: 'views/board.html',
        controller: 'BoardCtrl',
        controllerAs: 'board'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


angular.module('linkApp').config( function ($httpProvider,jwtInterceptorProvider) {   
        $httpProvider.defaults.useXDomain = true;
     
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	$httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    
        jwtInterceptorProvider.tokenGetter = [function() {
        
        return localStorage.getItem('ngStorage-token');
      }];

      $httpProvider.interceptors.push('jwtInterceptor');
    
    });





