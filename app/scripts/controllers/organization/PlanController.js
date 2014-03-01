(function(module) {
  mifosX.controllers = _.extend(module, {
	  PlanController: function(scope, resourceFactory) {
        scope.plans = [];
        resourceFactory.planResource.getAllPlans(function(data) {
            scope.plans= data;
        });
    }
  });
  mifosX.ng.application.controller('PlanController', ['$scope', 'ResourceFactory', mifosX.controllers.PlanController]).run(function($log) {
    $log.info("PlanController initialized");
  });
}(mifosX.controllers || {}));
