(function(module) {
  mifosX.controllers = _.extend(module, {
	  RegionController: function(scope, resourceFactory) {
        scope.regions = [];
        resourceFactory.regionResource.getRegion(function(data) {
            scope.regions = data;
        }); 
    }
  });
  mifosX.ng.application.controller('RegionController', ['$scope', 'ResourceFactory', mifosX.controllers.RegionController]).run(function($log) {
    $log.info("RegionController initialized");
  });
}(mifosX.controllers || {}));
