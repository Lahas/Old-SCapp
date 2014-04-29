(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  PurchaseOrderController: function(scope,location, resourceFactory,routeParams) {
       
        resourceFactory.createPurchaseOrder.get({partnerId: routeParams.id},function(data){
        	scope.provPurchaseOrderData = data;
        });
        
        
        scope.getPoDetails = function(provPoId){
        	
        	resourceFactory.retrivePurchaseOrder.get({provPoId: provPoId},function(data){
            	scope.provPurchaseOrderData = data;
            });
        	
        };
        
        
			/*
			* var data = "IGL/PROVPO/MOB/0314/15";
			var d1 = data.split("/");
			d1[4]=100;
			d1[1]='PO'
			console.log(d1);
			console.log(d1[1]);
			* */
       
      }
  
  });
  mifosX.ng.application.controller('PurchaseOrderController', ['$scope','$location', 'ResourceFactory','$routeParams', mifosX.controllers.PurchaseOrderController]).run(function($log) {
    $log.info("PurchaseOrderController initialized");
  });
}(mifosX.controllers || {}));
