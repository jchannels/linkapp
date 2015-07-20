'use strict';

describe('Directive: kaptorsColumn', function () {

  // load the directive's module
  beforeEach(module('linkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<kaptors-column></kaptors-column>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the kaptorsColumn directive');
  }));
});
