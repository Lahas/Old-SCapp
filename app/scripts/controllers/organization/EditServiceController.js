(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditServiceController: function(scope, routeParams, location, resourceFactory) {
    	 scope.services = [];
         scope.statuses = [];
        resourceFactory.serviceResource.get({serviceId: routeParams.id, template: 'true'} , function(data) {
        	  scope.services= data.serviceTypes;
              scope.statuses= data.status;
              scope.serviceId = data.id;
              scope.formData = {
        			serviceCode : data.serviceCode,
          			serviceDescription : data.serviceDescription,
          			status : data.serviceStatus,
          			serviceType : data.serviceType,
          			isOptional : data.isOptional,
          			};
              if(data.isOptional=="Y"){
    				scope.formData.isOptional=true;
    			}
        });
        
        scope.submit = function() {
             resourceFactory.serviceResource.update({'serviceId': routeParams.id},this.formData,function(data){
             location.path('/viewservice/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditServiceController', ['$scope', '$routeParams',  '$location', 'ResourceFactory', mifosX.controllers.EditServiceController]).run(function($log) {
    $log.info("EditServiceController initialized");
  });
}(mifosX.controllers || {}));