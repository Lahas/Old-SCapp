(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewRegionController: function(scope, routeParams , location,resourceFactory ) {		
        scope.region = [];
        resourceFactory.regionResource.get({regionId: routeParams.id} , function(data) {
            scope.region = data;          
           
        });

        scope.deleteRegion = function (){
            resourceFactory.regionResource.delete({regionId: routeParams.id} , {} , function(data) {
                  location.path('/regions');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewRegionController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewRegionController]).run(function($log) {
    $log.info("ViewRegionController initialized");
  });
}(mifosX.controllers || {}));