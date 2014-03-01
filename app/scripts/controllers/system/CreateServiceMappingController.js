(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateServiceMappingController: function(scope, resourceFactory, location) {
        scope.serviceCodes = [];
        scope.statusDatas=[];
        resourceFactory.serviceMappingtemplateResource.getAllserviceMapping(function(data) {
           
        	scope.serviceCodes = data.serviceCodeData;
            scope.formData = data;
            scope.statusDatas=data.statusData;
          
        
        });
        
                
        scope.submit = function() {
        	delete this.formData.serviceCodeData;
        	delete this.formData.statusData;
        	//scope.formData.serviceId=scope.formData.id;
  	
            resourceFactory.serviceMappingResource.save(this.formData,function(data){
            location.path('/viewServiceMapping/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateServiceMappingController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateServiceMappingController]).run(function($log) {
    $log.info("CreateServiceMappingController initialized");
  });
}(mifosX.controllers || {}));
