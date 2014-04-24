(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPlanController: function(scope, routeParams , location,resourceFactory ) {
        scope.plan = [];
        resourceFactory.planResource.get({planId: routeParams.id} , function(data) {
            scope.plan = data;
           
        });
        
        scope.deleteplan=function(){
        	
        resourceFactory.planResource.delete({'planId':routeParams.id},{},function(data){
            location.path('/plans');
        });
        }
    }
  });
  mifosX.ng.application.controller('ViewPlanController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewPlanController]).run(function($log) {
    $log.info("ViewPlanController initialized");
  });
}(mifosX.controllers || {}));
