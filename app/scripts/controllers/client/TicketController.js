(function(module) {
  mifosX.controllers = _.extend(module, {
	  TicketController: function(scope, resourceFactory,routeParams) {
	        scope.tickets = [];
	        resourceFactory.ticketResource.getAll({clientId: routeParams.id},function(data) {	        
	            scope.tickets = data;
	            scope.clientId= routeParams.id;	  
	        });
	    }
  });
  mifosX.ng.application.controller('TicketController', ['$scope', 'ResourceFactory', '$routeParams' , mifosX.controllers.TicketController]).run(function($log) {
    $log.info("TicketController initialized");
  });
}(mifosX.controllers || {}));