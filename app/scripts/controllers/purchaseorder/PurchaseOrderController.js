(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  PurchaseOrderController: function(scope,location, resourceFactory,routeParams,dateFilter) {
       
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
        	
        	resourceFactory.retrivePurchaseOrder.get({provPoId: provPoId},function(data){
        		
        		scope.purchaseOrderData = data.purchaseOrderData;
        		scope.disbursmentStatusData = data.disbursmentStatusData;
        		var rAmount = scope.provPurchaseOrderData[index].royaltyAmount;
        		scope.nexPurchaseOrderId = data.nexPurchaseOrderId;
        		
        		
        		if(data.purchaseOrderData.length < 1 ){
            		console.log("working");
            		scope.purchaseOrderData.push({
            			purchaseOrderNo : scope.getPurchaseOrder(scope.provPurchaseOrderData[scope.parentIndex].purchaseOrderNumber),
            			activityMonth : scope.provPurchaseOrderData[scope.parentIndex].activityMonth,
            			purchasrOrderDate : dateFilter(new Date(),'dd MMMM yyyy'),
            			royaltyAmount : scope.purchaseOrderPostData.royaltyAmount,
            		//	status : scope.purchaseOrderPostData.status=1
            			status : scope.disbursmentStatusData[0].id
            		});
            	}else{        		
	        		for(var i=0; i<scope.purchaseOrderData.length; i++){
	        			scope.purchaseOrderData[i].purchasrOrderDate = dateFilter(new Date(data.purchaseOrderData[i].purchasrOrderDate),'dd MMMM yyyy');
	        			scope.purchaseOrderData[i].outStandingAmount = (rAmount - scope.purchaseOrderData[i].royaltyAmount).toFixed(2);
	        			console.log("scope.purchaseOrderData[i].outStandingAmount: "+scope.purchaseOrderData[i].outStandingAmount);
	        			rAmount = scope.purchaseOrderData[i].outStandingAmount;
	        			console.log("rAmount: "+rAmount);
	        		}
	        		scope.purchaseOrderData.push({
            			purchaseOrderNo : scope.getPurchaseOrder(scope.provPurchaseOrderData[scope.parentIndex].purchaseOrderNumber),
            			activityMonth : scope.provPurchaseOrderData[scope.parentIndex].activityMonth,
            			purchasrOrderDate : dateFilter(new Date(),'dd MMMM yyyy'),
            			royaltyAmount : scope.purchaseOrderPostData.royaltyAmount,
            			status : scope.disbursmentStatusData[0].id
            		});
            	}
            	
            	
            	
            });
        	
        };
        
        scope.addRow = function(index){
        	var purchaseOrderSingleData = {};
        	purchaseOrderSingleData.purchaseOrderNo = scope.purchaseOrderData[index].purchaseOrderNo;
        	purchaseOrderSingleData.activityMonth = scope.purchaseOrderData[index].activityMonth;
        	purchaseOrderSingleData.purchasrOrderDate = dateFilter(new Date(scope.purchaseOrderData[index].purchasrOrderDate),'dd MMMM yyyy');
        	purchaseOrderSingleData.royaltyAmount = parseFloat(scope.purchaseOrderData[index].royaltyAmount).toFixed(2);
        	purchaseOrderSingleData.outStandingAmount = parseFloat(scope.purchaseOrderData[index].outStandingAmount).toFixed(2);
        	purchaseOrderSingleData.status = scope.purchaseOrderData[index].status;
        	purchaseOrderSingleData.provisionalPoId = scope.provPoId;
        	purchaseOrderSingleData.nexPurchaseOrderId = scope.nexPurchaseOrderId;
        	purchaseOrderSingleData.provPurchaseOrderNo = scope.provPurchaseOrderNo;
        	purchaseOrderSingleData.locale = "en";
        	purchaseOrderSingleData.dateFormat = 'dd MMMM yyyy';
        	
        	
        	resourceFactory.retrivePurchaseOrderId.save(purchaseOrderSingleData,function(data){
        		scope.nexPurchaseOrderId = parseInt(data.resourceId);
        		/*console.log(index);
        		scope.purchaseOrderData[index].outStandingAmount = data.transactionId.toFixed(2);*/
        		/*scope.purchaseOrderData.push({
        			purchaseOrderNo : scope.getPurchaseOrder(scope.provPurchaseOrderData[scope.parentIndex].purchaseOrderNumber),
        			activityMonth : scope.provPurchaseOrderData[scope.parentIndex].activityMonth,
        			purchasrOrderDate : dateFilter(new Date(),'dd MMMM yyyy'),
        			royaltyAmount : scope.purchaseOrderPostData.royaltyAmount,
        			outStandingAmount: scope.purchaseOrderPostData.outStandingAmount,
        			status : scope.purchaseOrderPostData.status=1
        		}); */
        		 
        		scope.refreshDetials(scope.provPoId,scope.parentIndex);
        	});
        	
        	    	
        };
        
        scope.refreshDetials = function(provPoId,index){
        	scope.parentIndex = index;
        	scope.provPoId = provPoId;
        	scope.provPurchaseOrderNo = scope.provPurchaseOrderData[index].purchaseOrderNumber;
        	
        	resourceFactory.refreshPurchaseOrder.get({provPoId: provPoId},function(data){
        		
        		scope.purchaseOrderData = data.purchaseOrderData;
        		var rAmount = scope.provPurchaseOrderData[index].royaltyAmount;
        		
        		
        		
        		if(data.purchaseOrderData.length < 1 ){
            		console.log("working");
            		scope.purchaseOrderData.push({
            			purchaseOrderNo : scope.getPurchaseOrder(scope.provPurchaseOrderData[scope.parentIndex].purchaseOrderNumber),
            			activityMonth : scope.provPurchaseOrderData[scope.parentIndex].activityMonth,
            			purchasrOrderDate : dateFilter(new Date(),'dd MMMM yyyy'),
            			royaltyAmount : scope.purchaseOrderPostData.royaltyAmount,
            			//status : scope.purchaseOrderPostData.status=1
            			status : scope.disbursmentStatusData[0].id
           		});
            	}else{        		
	        		for(var i=0; i<scope.purchaseOrderData.length; i++){
	        			scope.purchaseOrderData[i].purchasrOrderDate = dateFilter(new Date(data.purchaseOrderData[i].purchasrOrderDate),'dd MMMM yyyy');
	        			scope.purchaseOrderData[i].outStandingAmount = (rAmount - scope.purchaseOrderData[i].royaltyAmount).toFixed(2);
	        			console.log("scope.purchaseOrderData[i].outStandingAmount: "+scope.purchaseOrderData[i].outStandingAmount);
	        			rAmount = scope.purchaseOrderData[i].outStandingAmount;
	        			console.log("rAmount: "+rAmount);
	        		}
	        		scope.purchaseOrderData.push({
            			purchaseOrderNo : scope.getPurchaseOrder(scope.provPurchaseOrderData[scope.parentIndex].purchaseOrderNumber),
            			activityMonth : scope.provPurchaseOrderData[scope.parentIndex].activityMonth,
            			purchasrOrderDate : dateFilter(new Date(),'dd MMMM yyyy'),
            			royaltyAmount : scope.purchaseOrderPostData.royaltyAmount,
            			//status : scope.purchaseOrderPostData.status=1
            			status : scope.disbursmentStatusData[0].id
            		});
            	}
            	
            	
            	
            });
        	
        };
        
        scope.getPurchaseOrder = function(purchaseOrderNumber){
        
			var d1 = purchaseOrderNumber.split("/");
			d1[1]='PO';
			d1[4]=scope.nexPurchaseOrderId;
			return d1.toString().split(',').join('/');
        };
        
        scope.removeRow = function(index){
        	if(scope.purchaseOrderData.length<2)
        		return ;
        	scope.purchaseOrderData.splice(index,1);
        };
        
        
        
        scope.calculate = function(){
        	console.log("calculate is called ..!");
        };
        
       
        scope.submit = function(){
        	scope.purchaseOrderData;
        	scope.formData.poData = new Array();
        	
        	if(scope.purchaseOrderData.length > 0){
        		for(var i in scope.purchaseOrderData){
        			scope.formData.poData.push({
        				purchaseOrderNo : scope.purchaseOrderData[i].purchaseOrderNo,
            			activityMonth : scope.purchaseOrderData[i].activityMonth,
            			purchasrOrderDate : scope.purchaseOrderData[i].purchasrOrderDate,
            			royaltyAmount : scope.purchaseOrderData[i].royaltyAmount,
            			status : scope.purchaseOrderData[i].status
        			});
        		}
        	}
        	scope.formData.parentId  = scope.provPoId;        	//var d1 = JSON.stringify(scope.purchaseOrderData);
        	resourceFactory.savePurchaseOrder.save(this.formData,function(data){
        		
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
