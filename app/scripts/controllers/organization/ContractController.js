(function(module) {
  mifosX.controllers = _.extend(module, {
	  ContractController: function(scope, resourceFactory) {
        scope.employees = [];
        resourceFactory.contractResource.getAllContracts(function(data) {
            scope.employees = data;
        });
    }
  });
  mifosX.ng.application.controller('ContractController', ['$scope', 'ResourceFactory', mifosX.controllers.ContractController]).run(function($log) {
    $log.info("ContractController initialized");
  });
}(mifosX.controllers || {}));
