(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  CreateProvisionalPoController: function(scope,location, resourceFactory,routeParams,dateFilter,$notification) {
		  
		  scope.partnerId = routeParams.id;
		  scope.formData={};
		  scope.formData.invoiceTo;
		  scope.formData.deliverTo;
		  scope.activity = {};
		  scope.purchaseOrderDate = {};
		  scope.partnerAddressDetail = {};
		  scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/Business/Month/Sequence";
		  scope.purchaseOrderDate.date= new Date();
		  scope.activity.date = new Date();
		  
		  scope.months=[{id:1,mon:"Jan"},{id:2,mon:"Feb"},{id:3,mon:"Mar"},{id:4,mon:"Apr"},
	            		  {id:5,mon:"May"},{id:6,mon:"Jun"},{id:7,mon:"Jul"},{id:8,mon:"Aug"},{id:9,mon:"Sep"},
	            		  {id:10,mon:"Oct"},{id:11,mon:"Nov"},{id:12,mon:"Dec"}];
		  
		  
		  
		  resourceFactory.getProPurchaseOrderTemplate.get(function(data){
			  scope.addressData = data.purchaseOrderData;
			  scope.partnerData = data.partnerNames;
			  scope.currencyCodesData = data.currencyCodes;
		  });
		  
		  //scope.getPartnerAddressDetails = function(){
	    	   resourceFactory.getPartnerAddressDetails.get({partnerId:scope.partnerId},function(data){
	    		   scope.partnerAddressDetail.partnerAddressDetails = data;
	    		   scope.perticularsData = data.perticulars;
	    		   //console.log(data);
	    	   });
	       //};

	       scope.getDeliverToDetails = function(){  
	    	   resourceFactory.getProPurchaseOrderAddressDetails.get({purchaseOrderId:scope.formData.deliverTo},function(data){
	    		   scope.deliverToData = data[0];
	    	   });
	       };
	       
	       scope.getInvoiceToDetails = function(){
	    	   
	    	   resourceFactory.getProPurchaseOrderAddressDetails.get({purchaseOrderId:scope.formData.invoiceTo},function(data){
	    		   scope.invoiceToData = data[0];
	    	   });
	       };
	       
	       
	       scope.getRoyaltyAmount = function(){
	    	   resourceFactory.getRoyaltyAmountDetails.get({partnerAddress:scope.partnerId,month:dateFilter(scope.month.date,"MMM yyyy"),perticulars:scope.formData.perticulars},function(data){
	    		   
	    		   scope.formData.royaltyAmount = data.royaltyAmount;
	    		   scope.royaltyAmountsData = data.royaltyAmountData;
	    		   scope.formData.currencyCode = data.currencyCode;
	    		   scope.formData.purchaseOrderNumber = data.nextPurchaseOrderTableId;
	    		   scope.formData.businessLine = data.businessLineData[0];
	    		   scope.formData.activityMonthInNumericData = getMonthInNumeric(data.activityMonthInNumericData[0].toString());
	    		   scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/"+scope.formData.businessLine+"/"+scope.formData.activityMonthInNumericData+"/"+scope.formData.purchaseOrderNumber+"";
	    		   scope.formData.purchaseOrderNumber = scope.partnerAddressDetail.purchaseOrderNumber;
	    		   
	    	   },function(errorData){
	    		   
	    		   scope.royaltyAmountsData = undefined;
	    		   scope.formData.currencyCode = undefined;
	    		   scope.formData.royaltyAmount = undefined;
	    		   scope.formData.purchaseOrderNumber = undefined;
	    		   scope.formData.businessLine = undefined;
	    		   scope.formData.activityMonthInNumericData = undefined;
	    		   scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/Business/Month/Sequence";
	    		   
	    	   });
	       };
	       
	       var getMonthInNumeric = function(acm){
	    	   console.log("this is : "+acm);
	    	   var res = acm.split(" ");
	    	   for (var i in scope.months){
	    		   if(scope.months[i].mon == res[0]){
	    			   var monthStr = (scope.months[i].id>9?scope.months[i].id:0+""+scope.months[i].id).toString();
	    			   console.log(monthStr);
	    			   return monthStr+""+res[1].slice(-2);
	    		   }
	    	   }
	       };

	       
	       
	       scope.submitProPurchaseOrder = function(){
	    	   scope.formData.clientId = scope.royaltyAmountsData[0].clientId;
	    	   scope.formData.purchaseOrderDate = dateFilter(scope.purchaseOrderDate.date,"dd MMMM yyyy");
	    	   scope.formData.month = dateFilter(scope.month.date,"MMM yyyy");
	    	   scope.formData.locale = "en";
	    	   scope.formData.dateFormat = "dd MMMM yyyy";
	    	   scope.formData.partnerAddress = scope.partnerId;
	    	   resourceFactory.createProPurchaseOrder.save(scope.formData,function(data){
	    		   $notification.success("Successfully Saved","Purchase Order","User data");
	    		   scope.royaltyAmountsData = undefined;
	    		   scope.formData.currencyCode = undefined;
	    		   scope.formData.royaltyAmount = undefined;
	    		   scope.formData.purchaseOrderNumber = undefined;
	    		   scope.formData.businessLine = undefined;
	    		   scope.formData.activityMonthInNumericData = undefined;
	    		   scope.partnerAddressDetail.purchaseOrderNumber = "IGL/PROVPO/Business/Month/Sequence";
	    	   },function(errorData){
	    		   
	    	   });
	       };
		  
	  }
  
  });
  mifosX.ng.application.controller('CreateProvisionalPoController', ['$scope','$location', 'ResourceFactory','$routeParams','dateFilter','$notification', mifosX.controllers.CreateProvisionalPoController]).run(function($log) {
    $log.info("CreateProvisionalPoController initialized");
  });
}(mifosX.controllers || {}));
