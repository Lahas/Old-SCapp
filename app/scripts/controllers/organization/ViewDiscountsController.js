(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewDiscountsController: function(scope, routeParams , route, location, resourceFactory, http) {
		 // alert("hh");
        scope.discounting = [];              
        resourceFactory.discountsResource.getDiscountDetails({discountId: routeParams.id,template: 'true'} , function(data) {
        	//alert('discountController,' +data);
            scope.discounting = data;                                                
        });
        scope.deletemessage = function (){
            resourceFactory.discountResource.delete({discountId: routeParams.id} , {} , function(data) {
                  location.path('/discounts');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewDiscountsController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewDiscountsController]).run(function($log) {
    $log.info("ViewDiscountsController initialized");
  });
}(mifosX.controllers || {}));