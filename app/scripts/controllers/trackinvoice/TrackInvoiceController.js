(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  TrackInvoiceController: function(scope,location, resourceFactory,routeParams,dateFilter,element) {
       
		scope.resourceId = routeParams.id;  
		scope.purchaseOrderPostData = {};
		scope.purchaseOrderData = new Array();
		scope.stopFlag = false;
		scope.parentIndex = undefined;
		scope.formData = {};
		
        resourceFactory.createPurchaseOrder.get({partnerId: routeParams.id},function(data){
        	scope.provPurchaseOrderData = data;
        });
        
        
        scope.getPoDetails = function(provPoId,index){
        	scope.parentIndex = index;
        	scope.provPoId = provPoId;
        	scope.provPurchaseOrderNo = scope.provPurchaseOrderData[index].purchaseOrderNumber;
        	
        	resourceFactory.retrivePurchaseOrderTrackInvoice.get({provPoId: provPoId},function(data){
        		
        		for(p in data.purchaseOrderData){
        			if(data.purchaseOrderData[p].invoiceDate != undefined)
        				data.purchaseOrderData[p].invoiceDate = dateFilter(new Date(data.purchaseOrderData[p].invoiceDate),'dd MMMM yyyy');
        		}
        		
        		scope.purchaseOrderData = data.purchaseOrderData;
        		
        		
        		
            });
        	
        };
               
        
        
       
        scope.update = function(purchaseOrderId,index){
        	
        	
        	scope.formData.purchaseOrderId = scope.purchaseOrderData[index].id;
        	scope.formData.invoiceNumber = scope.purchaseOrderData[index].invoiceNumber;
        	scope.formData.invoiceDate = dateFilter(new Date(scope.purchaseOrderData[index].invoiceDate),'dd MMMM yyyy');
        	scope.formData.dateFormat = 'dd MMMM yyyy';
        	scope.formData.locale = 'en';
        	resourceFactory.retrivePurchaseOrderTrackInvoice.update(scope.formData,function(data){
        		$('.invoiceNumber'+purchaseOrderId).attr('disabled', 'disabled');
        	},function(errorData){
        		console.log("failure");
        	});
        	
        	
        
        };
        
       
      }
  
  });
  mifosX.ng.application.controller('TrackInvoiceController', ['$scope','$location', 'ResourceFactory','$routeParams','dateFilter', mifosX.controllers.TrackInvoiceController]).run(function($log) {
    $log.info("TrackInvoiceController initialized");
  });
}(mifosX.controllers || {}));
