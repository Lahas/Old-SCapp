(function(module) {
  mifosX.controllers = _.extend(module, {
CreateServiceController: function(scope, resourceFactory, location) {
	  scope.services = [];
      scope.statuses = [];
        resourceFactory.serviceTemplateResource.get(function(data) {
        	 scope.services= data.serviceTypes;
        	 scope.statuses= data.status;
             scope.formData = {   };
        });
        
        scope.submit = function() {   
          resourceFactory.serviceResource.save(this.formData,function(data){
            location.path('/viewservice/' + data.resourceId);
          });
        };
    }
  });
 mifosX.ng.application.controller('CreateServiceController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateServiceController]).run(function($log) {
    $log.info("CreateServiceController initialized");
  });
}(mifosX.controllers || {}));
