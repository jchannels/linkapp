'use strict';

describe('Controller: KaptorCtrl', function () {

  // load the controller's module
  beforeEach(module('linkApp'));

  var KaptorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KaptorCtrl = $controller('KaptorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(KaptorCtrl.awesomeThings.length).toBe(3);
  });
});
