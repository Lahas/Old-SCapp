(function(module) {
  mifosX.controllers = _.extend(module, {
	  VoucherpinController: function(scope, resourceFactory) {
        scope.voucherpins = [];
        resourceFactory.voucherpinResource.getAllEmployees(function(data) {
            scope.voucherpins = data;
        }); 
    }
  });
  mifosX.ng.application.controller('VoucherpinController', ['$scope', 'ResourceFactory', mifosX.controllers.VoucherpinController]).run(function($log) {
    $log.info("VoucherpinController initialized");
  });
}(mifosX.controllers || {}));
