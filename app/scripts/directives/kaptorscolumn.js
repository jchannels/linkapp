'use strict';

/**
 * @ngdoc directive
 * @name linkApp.directive:kaptorsColumn
 * @description
 * # kaptorsColumn
 */
angular.module('linkApp')
  .directive('kaptorsColumn', function () {
      return {
        restrict: 'A',
        templateUrl: 'views/kaptors_column.html',
        scope: {
          kaptors: '=',
          onDeleteKaptor: '&',
        } 
      }
});