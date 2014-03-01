(function(module) {
  mifosX.controllers = _.extend(module, {
    EditContractController: function(scope, routeParams, resourceFactory, location) {
        scope.formData = {};
    	scope.allowedperiods={};

        resourceFactory.contractResource.get({subscriptionId: routeParams.id, template: 'true'} , function(data) {
        	 scope.allowedperiods= data.allowedperiods;
          scope.formData =
          {
        		  subscriptionPeriod:data.subscription_period,
        		  subscriptionType:data.subscription_type,
        		  units:data.units
        		
          };
        });
        
        scope.submit = function() {
           
            resourceFactory.contractResource.update({'subscriptionId': routeParams.id},this.formData,function(data){
             location.path('/viewContract/' + data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('EditContractController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditContractController]).run(function($log) {
    $log.info("EditContractController initialized");
  });
}(mifosX.controllers || {}));
