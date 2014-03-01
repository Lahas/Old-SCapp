(function(module) {
  mifosX.controllers = _.extend(module, {
	  ImportController: function(scope, resourceFactory) {
        scope.imports = [];
        resourceFactory.importResource.getAllimportfiles(function(data) {
            scope.imports= data;
        });
    }
  });
  mifosX.ng.application.controller('ImportController', ['$scope', 'ResourceFactory', mifosX.controllers.ImportController]).run(function($log) {
    $log.info("ImportController initialized");
  });
}(mifosX.controllers || {}));
