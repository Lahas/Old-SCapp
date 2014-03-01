(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServicesController: function(scope, resourceFactory) {
        
        scope.services = [];
        resourceFactory.serviceResource.getAllServices(function(data){
            scope.services = data;
        });
     }
  });
  mifosX.ng.application.controller('ServicesController', ['$scope', 'ResourceFactory', mifosX.controllers.ServicesController]).run(function($log) {
    $log.info("ServicesController initialized");
  });
}(mifosX.controllers || {}));
