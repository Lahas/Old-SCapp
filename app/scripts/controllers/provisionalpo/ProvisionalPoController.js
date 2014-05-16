(function(module) {
  mifosX.controllers = _.extend(module, {
	  
	  ProvisionalPoController: function(scope,location, resourceFactory,routeParams,dateFilter) {
		  
		  scope.partnerId = routeParams.id;
		  resourceFactory.retriveProvisionalPo.get({partnerId:routeParams.id},function(data){
			  scope.provPoData = data;
			  //console.log("This is data: "+scope.provPoData[0].id);
		  });
		  
		  scope.routeTo = function(provPoId){
			  location.path('editprovisionalpo/'+provPoId);
		  };
		  
	  }
  
  });
  mifosX.ng.application.controller('ProvisionalPoController', ['$scope','$location', 'ResourceFactory','$routeParams','dateFilter', mifosX.controllers.ProvisionalPoController]).run(function($log) {
    $log.info("ProvisionalPoController initialized");
  });
}(mifosX.controllers || {}));
