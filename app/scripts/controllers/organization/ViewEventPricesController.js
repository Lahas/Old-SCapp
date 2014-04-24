(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventPricesController: function(scope, routeParams , location,resourceFactory ) {		
        scope.pricing = [];      
        resourceFactory.eventpriceResource.getprice({eventId: routeParams.id} , function(data) {        	   	
            scope.pricing = data; 
            scope.eventId=routeParams.id;
        });

        scope.deleteEvent = function (){
            resourceFactory.eventResource.delete({eventId: routeParams.id} , {} , function(data) {
                  location.path('/viewEvent/'+routeParams.id);
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewEventPricesController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewEventPricesController]).run(function($log) {
    $log.info("ViewPriceController initialized");
  });
}(mifosX.controllers || {}));