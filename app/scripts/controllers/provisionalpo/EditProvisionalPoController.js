(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  EditProvisionalPoController: function(scope,location, resourceFactory,routeParams) {
		  
		  
		  scope.formData = {};
		  
		  resourceFactory.editProvisionalPo.get({provisionaPoId: routeParams.id},function(data){
			  scope.provisionalId = data.id;
			  scope.disbursStatusData = data.disbursStatusData;
			  scope.formData.disburseStatus = data.status;
			  scope.partnerId = data.partnerId;
		  });
		 
		  
		  scope.submit = function(){
			  resourceFactory.editProvisionalPo.update({provisionaPoId: routeParams.id},scope.formData,function(data){
				  location.path('/provisionalpo/'+scope.partnerId);
			  });  
		  };
		  
	  }
  
  });
  mifosX.ng.application.controller('EditProvisionalPoController', ['$scope','$location', 'ResourceFactory','$routeParams',mifosX.controllers.EditProvisionalPoController]).run(function($log) {
    $log.info("EditProvisionalPoController initialized");
  });
}(mifosX.controllers || {}));
