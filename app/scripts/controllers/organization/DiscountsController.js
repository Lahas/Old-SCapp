(function(module) {
  mifosX.controllers = _.extend(module, {
	  DiscountsController: function(scope, resourceFactory) {
        scope.discounts = [];
        resourceFactory.discountsResource.getDiscount(function(data) {
            scope.discounts = data;
        });
    }
  });
  mifosX.ng.application.controller('DiscountsController', ['$scope', 'ResourceFactory', mifosX.controllers.DiscountsController]).run(function($log) {
    $log.info("DiscountsController initialized");
  });
}(mifosX.controllers || {}));
