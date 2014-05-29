(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditOperatorDeductionController: function(scope, resourceFactory, location,dateFilter,routeParams,webStorage) {
		  
		  scope.id = routeParams.id; 
		  
		  scope.sequence = 1;
		  scope.formData = {};
		  resourceFactory.editOperatorDeductionResource.get({id:routeParams.id},function(data) {
			  scope.deductionData = data;
			  scope.deductionCodes = data.deductionCodes;
			  scope.formData.id=data.deductionCodeValues.id;
			  scope.formData.deductionValue = data.deductionCodeValues.deductionValue;
			  scope.formData.deductionCode = data.deductionCodeValues.deductionCode;
			  scope.formData.clientId = data.deductionCodeValues.clientId;
		  });
		  
		  scope.tabStatus=function(){
			  webStorage.add("callingTab", {someString: "operator" });
		  };
		  

		  
		  scope.submit = function(){
			  			  
			  scope.formData.locale = 'en';
			  resourceFactory.editOperatorDeductionResource.update({id:routeParams.id},scope.formData,function(data){
				  location.path('/viewclient/'+scope.formData.clientId);
				  webStorage.add("callingTab", {someString: "operator" });
			  });
			   
		  }; 
		  scope.deleteDeduction = function (codeId) {
          	resourceFactory.deleteOperatorDeductionResource.delete({codeId: codeId} , {} , function(data) {
          		 location.path('/viewclient/'+scope.formData.clientId);
				  webStorage.add("callingTab", {someString: "operator" });
                //scope.deductionData.splice(index,1);
              });
            };
        
	  }
  });
  mifosX.ng.application.controller('EditOperatorDeductionController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams','webStorage', mifosX.controllers.EditOperatorDeductionController]).run(function($log) {
    $log.info("EditOperatorDeductionController initialized");
  });
}(mifosX.controllers || {}));
