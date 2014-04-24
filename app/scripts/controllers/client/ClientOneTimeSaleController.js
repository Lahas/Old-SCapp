(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ClientOneTimeSaleController: function(scope, webStorage,routeParams , location, resourceFactory,dateFilter) {
		  
			  scope.clientId=routeParams.id;
			  scope.formData = {};
			  var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;
			  
	          scope.data={};
	          
	          scope.maxDate = new Date();
	          
	        resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: routeParams.id}, function(data) {
	            
	        	scope.itemDatas = data.itemDatas;
	            scope.discountMasterDatas = data.discountMasterDatas;
	            scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	            scope.onetimesales=data;
	            scope.date= {};
	            scope.date.saleDate = new Date();
	            
	        });
	        
	        scope.itemData=function(itemId){
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
	        		
	        		scope.formData=data;
	        		scope.formData.itemId=itemId;
	        		scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		
		        });	
	        }
	        
	        scope.itemDataQuantity=function(quantity,itemId){
	        	this.data.unitPrice=this.formData.unitPrice;
	        	this.data.locale="en";
	        	this.data.quantity=quantity;
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},this.data, function(data) {
	        		
	        		scope.formData=data;
	        		scope.formData.quantity=quantity;
	        		scope.formData.itemId=itemId;
	        		 scope.formData.discountId = scope.discountMasterDatas[0].discountMasterId;
		        });	
	        }
	        
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "Sale" });
	           };
	        scope.submit = function() {  
	        	 this.formData.locale = "en";
	             this.formData.dateFormat = "dd MMMM yyyy";
	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	             this.formData.saleDate=actDate;
	             delete this.formData.discountMasterDatas;   
	             delete this.formData.warranty;
	             delete this.formData.itemDatas;
	             delete this.formData.units;
	             delete this.formData.itemCode;
	             delete this.formData.id;
	            resourceFactory.oneTimeSaleResource.save({clientId:routeParams.id},this.formData,function(data){
	            	 location.path('/viewclient/' + routeParams.id);
	          });
	            webStorage.add("callingTab", {someString: "Sale" });
	        };
	    }
	  });
	  mifosX.ng.application.controller('ClientOneTimeSaleController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','dateFilter', mifosX.controllers.ClientOneTimeSaleController]).run(function($log) {
        $log.info("ClientOneTimeSaleController initialized");
    });
}(mifosX.controllers || {}));
