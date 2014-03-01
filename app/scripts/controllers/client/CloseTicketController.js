(function(module) {
  mifosX.controllers = _.extend(module, {
	  CloseTicketController: function(scope, routeParams , location,resourceFactory ) {		
            scope.statusTypes=[];
            scope.formData={};
        resourceFactory.ticketResourceTemplate.get(function(data) {       	 	
        	scope.statusTypes = data.statusType;				
        	scope.clientId=routeParams.clientId;
			scope.ticketId=routeParams.id;               
        });

        scope.submit = function() { 
            resourceFactory.closeTicketResource.update({'id': routeParams.id},this.formData,function(data){
                location.path('/tickets/'+routeParams.clientId);
             });
        };
    
    }
  });
  mifosX.ng.application.controller('CloseTicketController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.CloseTicketController]).run(function($log) {
    $log.info("CloseTicketController initialized");
  });
}(mifosX.controllers || {}));