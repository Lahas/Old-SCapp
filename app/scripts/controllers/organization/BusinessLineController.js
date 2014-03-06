(function(module) {
  mifosX.controllers = _.extend(module, {
	  BusinessLineController: function(scope, resourceFactory,location) {
        scope.eventss = [];
        resourceFactory.businessLineResource.get(function(data) {      	
            scope.events= data;         
        });
        scope.routeTo = function(id){
            location.path('/editbusinessline/'+id);
        };
    }
  });
  mifosX.ng.application.controller('BusinessLineController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.BusinessLineController]).run(function($log) {
    $log.info("BusinessLineController initialized");
  });
}(mifosX.controllers || {}));