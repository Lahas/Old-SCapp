(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewServiceMappingController: function(scope, routeParams , resourceFactory ) {
        scope.sm = [];
        scope.id=[];
        resourceFactory.serviceMappingResource.get({serviceMappingId: routeParams.id} , function(data) {
            scope.sm = data;
            scope.id =  routeParams.id;
        });
    }
  });
  mifosX.ng.application.controller('ViewServiceMappingController', ['$scope', '$routeParams','ResourceFactory', mifosX.controllers.ViewServiceMappingController]).run(function($log) {
    $log.info("ViewServiceMappingController initialized");
  });
}(mifosX.controllers || {}));
