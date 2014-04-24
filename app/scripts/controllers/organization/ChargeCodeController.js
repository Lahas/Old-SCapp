(function(module) {
  mifosX.controllers = _.extend(module, {
    ChargeCodeController: function(scope, resourceFactory) {
        scope.chargecodes = [];
        resourceFactory.chargecodeResource.getAllChargeCode(function(data) {
            scope.chargecodes = data;
        });
    }
  });
  mifosX.ng.application.controller('ChargeCodeController', ['$scope', 'ResourceFactory', mifosX.controllers.ChargeCodeController]).run(function($log) {
    $log.info("ChargeCodeController initialized");
  });
}(mifosX.controllers || {}));
