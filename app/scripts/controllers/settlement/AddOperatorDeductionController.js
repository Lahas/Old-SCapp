(function(module) {
  mifosX.controllers = _.extend(module, {
	  AddOperatorDeductionController: function(scope, webStorage,resourceFactory, location,dateFilter,routeParams) {
		  
		  scope.clientId = routeParams.id; 
		  scope.dataFor2 = new Array();
		  scope.deductionData = new Array();
		  scope.operatorDeductionAttributes = {};
		  scope.counter = 0;
		  scope.formData = {};
		  resourceFactory.createOperatorDeductionResource.get(function(data) {
			  scope.formData.deductionCodes = data;
			  
			  for(var i in scope.formData.deductionCodes){
				  if(scope.formData.deductionCodes[i].deductionCode == 'WPC' || scope.formData.deductionCodes[i].deductionCode == 'ED'){
					  scope.counter += 1;
					  scope.deductionData.push({
							deductionCode : scope.operatorDeductionAttributes.deductionCode,
							deductionValue : scope.operatorDeductionAttributes.deductionValue,
							sequence : scope.operatorDeductionAttributes.sequence=scope.counter 
						});
						scope.operatorDeductionAttributes.deductionCode = undefined;
						scope.operatorDeductionAttributes.deductionValue = undefined;
						scope.operatorDeductionAttributes.sequence  = undefined;
				  }
				  /*console.log(scope.formData[i].deductionCode);*/
			  }
			  
			  if(scope.deductionData.length <=1){

				  scope.counter += 1;
				  scope.deductionData.push({
						deductionCode : scope.operatorDeductionAttributes.deductionCode,
						deductionValue : scope.operatorDeductionAttributes.deductionValue,
						sequence : scope.operatorDeductionAttributes.sequence=scope.counter 
					});
					scope.operatorDeductionAttributes.deductionCode = undefined;
					scope.operatorDeductionAttributes.deductionValue = undefined;
					scope.operatorDeductionAttributes.sequence  = undefined;
			  
			  }
			  
		  });
		  
		  
		  scope.addDeduction = function(){
			  if(scope.deductionData.length > scope.formData.deductionCodes.length-1){
				  return undefined;
			  }
	        	scope.counter = scope.counter+1;
	        	scope.deductionData.push({
												game : scope.operatorDeductionAttributes.deductionCode,
												gDate : scope.operatorDeductionAttributes.deductionValue,
												sequence : scope.operatorDeductionAttributes.sequence=scope.counter 
											});
	        	scope.operatorDeductionAttributes.deductionCode = undefined;
				scope.operatorDeductionAttributes.deductionValue = undefined;
	            scope.operatorDeductionAttributes.sequence  = undefined;
	        };
		  
	        scope.removeDeduction = function(index){
	        	if(scope.counter<2){
	        		scope.deductionData[0].sequence = 1;
	        		return undefined;
	        	}
	        		
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.deductionData.splice(index,1);	
	        };
		  
	        scope.tabStatus=function(){
				  webStorage.add("callingTab", {someString: "operator" });
			  };
			  
	        
	        
		  scope.submit = function(){
			  
			  scope.formData.deductionData = new Array();
			  if(scope.deductionData.length>0){
	        		for(var i in scope.deductionData){
	        			//console.log("i: "+i);
	        			scope.formData.deductionData.push({
							deductionCode : scope.deductionData[i].deductionCode,
							deductionValue : scope.deductionData[i].deductionValue,
							locale: 'en'
	        			});
	        		}
	        	}
			  scope.formData.clientId = scope.clientId;
			  scope.formData.locale = 'en';
			  console.log(scope.formData.deductionData);
			  resourceFactory.saveOperatorDeductionData.save(scope.formData,function(data){
				  location.path("/viewclient/"+data.resourceId);
				  webStorage.add("callingTab", {someString: "operator" });
			  });
		  };
		  
		  
		  
		 
	  }
  });
  mifosX.ng.application.controller('AddOperatorDeductionController', ['$scope', 'webStorage','ResourceFactory', '$location','dateFilter','$routeParams', mifosX.controllers.AddOperatorDeductionController]).run(function($log) {
    $log.info("AddOperatorDeductionController initialized");
  });
}(mifosX.controllers || {}));
