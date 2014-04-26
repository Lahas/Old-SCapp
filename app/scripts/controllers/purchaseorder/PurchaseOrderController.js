(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  PurchaseOrderController: function(scope,location, resourceFactory,route) {
       
        
       
      }
  
  });
  mifosX.ng.application.controller('PurchaseOrderController', ['$scope','$location', 'ResourceFactory','$route', mifosX.controllers.PurchaseOrderController]).run(function($log) {
    $log.info("PurchaseOrderController initialized");
  });
}(mifosX.controllers || {}));
