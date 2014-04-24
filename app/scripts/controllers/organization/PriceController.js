(function(module) {
  mifosX.controllers = _.extend(module, {
	  PriceController: function(scope,routeParams, resourceFactory) {
        scope.prices = [];
        scope.planId=routeParams.id;
        resourceFactory.priceResource.get({planId: routeParams.id, template: 'true'} , function(data) {
            scope.prices= data.serviceData;
        });
    }
  });
  mifosX.ng.application.controller('PriceController', ['$scope', '$routeParams','ResourceFactory', mifosX.controllers.PriceController]).run(function($log) {
    $log.info("PriceController initialized");
  });
}(mifosX.controllers || {}));
