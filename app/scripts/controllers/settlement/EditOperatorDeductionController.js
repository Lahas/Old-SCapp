(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditOperatorDeductionController: function(scope, resourceFactory, location,dateFilter,routeParams) {
		  
		  scope.id = routeParams.id; 
		  
		  scope.sequence = 1;
		  scope.formData = {};
		  resourceFactory.editOperatorDeductionResource.get({id:routeParams.id},function(data) {
			  
			  scope.deductionCodes = data.deductionCodes;
			  scope.formData.deductionValue = data.deductionCodeValues.deductionValue;
			  scope.formData.deductionCode = data.deductionCodeValues.deductionCode;
			  scope.formData.clientId = data.deductionCodeValues.clientId;
		  });
		  

		  
		  scope.submit = function(){
			  			  
			  scope.formData.locale = 'en';
			   
			  resourceFactory.editOperatorDeductionResource.update({id:routeParams.id},scope.formData,function(data){
				  location.path("/viewclient/"+scope.formData.clientId);
			  });
		  };
		  
		  
		  
		 
	  }
  });
  mifosX.ng.application.controller('EditOperatorDeductionController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams', mifosX.controllers.EditOperatorDeductionController]).run(function($log) {
    $log.info("EditOperatorDeductionController initialized");
  });
}(mifosX.controllers || {}));
