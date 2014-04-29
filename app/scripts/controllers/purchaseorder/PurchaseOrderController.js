(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  PurchaseOrderController: function(scope,location, resourceFactory,routeParams,dateFilter) {
       
		scope.resourceId = routeParams.id;  
		scope.purchaseOrderPostData = {};
		scope.purchaseOrderData = new Array();
		
		
        resourceFactory.createPurchaseOrder.get({partnerId: routeParams.id},function(data){
        	scope.provPurchaseOrderData = data;
        });
        
        
        scope.getPoDetails = function(provPoId,index){
        	console.log(index);
        	
        	resourceFactory.retrivePurchaseOrder.get({provPoId: provPoId},function(data){
        		
        		scope.purchaseOrderData = data.purchaseOrderData;
        		var rAmount = scope.provPurchaseOrderData[index].royaltyAmount;
        		var outStandingTemp = 0;
        		for(var i=0; i<scope.purchaseOrderData.length; i++){
        			scope.purchaseOrderData[i].purchasrOrderDate = dateFilter(new Date(data.purchaseOrderData[i].purchasrOrderDate),'dd MMMM yyyy');
        			scope.purchaseOrderData[i].outStandingAmount = (rAmount - scope.purchaseOrderData[i].royaltyAmount)-outStandingTemp;
        			outStandingTemp = scope.purchaseOrderData[i].outStandingAmount;
        		}
            	scope.nexPurchaseOrderId = data.nexPurchaseOrderId;
            	
            	if(data.purchaseOrderData.length < 1 ){
            		console.log("working");
            		scope.purchaseOrderData.push({
            			purchaseOrderNo : scope.purchaseOrderPostData.purchaseOrderNo,
            			activityMonth : scope.purchaseOrderPostData.activityMonth,
            			purchasrOrderDate : dateFilter(scope.purchaseOrderPostData.purchasrOrderDate,'dd MMMM yyyy'),
            			royaltyAmount : scope.purchaseOrderPostData.royaltyAmount,
            			status : scope.purchaseOrderPostData.status
            		});
            	}
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
  mifosX.ng.application.controller('PurchaseOrderController', ['$scope','$location', 'ResourceFactory','$routeParams','dateFilter', mifosX.controllers.PurchaseOrderController]).run(function($log) {
    $log.info("PurchaseOrderController initialized");
  });
}(mifosX.controllers || {}));
