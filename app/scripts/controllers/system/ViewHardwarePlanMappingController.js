(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewHardwarePlanMappingController: function(scope, routeParams , route, location, resourceFactory, http) {
		 // alert("hh");
        scope.hardwareplans = [];              
        resourceFactory.hardwareMappingResource.getDetails({hardwaremapId: routeParams.id,template: 'true'} , function(data) {
        	//alert('view' +data);
            scope.hardwareplans = data;                                                
        });
    }
  });
  mifosX.ng.application.controller('ViewHardwarePlanMappingController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewHardwarePlanMappingController]).run(function($log) {
    $log.info("ViewHardwarePlanMappingController initialized");
  });
}(mifosX.controllers || {}));