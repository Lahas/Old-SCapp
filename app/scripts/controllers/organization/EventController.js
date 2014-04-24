(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventController: function(scope, resourceFactory) {
        scope.eventss = [];
        resourceFactory.eventResource.get(function(data) {      	
            scope.events= data;         
        });
    }
  });
  mifosX.ng.application.controller('EventController', ['$scope', 'ResourceFactory', mifosX.controllers.EventController]).run(function($log) {
    $log.info("EventController initialized");
  });
}(mifosX.controllers || {}));