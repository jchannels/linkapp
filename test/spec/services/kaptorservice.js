'use strict';

describe('Service: kaptorService', function () {

  // load the service's module
  beforeEach(module('linkApp'));

  // instantiate service
  var kaptorService;
  beforeEach(inject(function (_kaptorService_) {
    kaptorService = _kaptorService_;
  }));

  it('should do something', function () {
    expect(!!kaptorService).toBe(true);
  });

});
