(function(module) {
  mifosX.controllers = _.extend(module, {
	  CurrencyDetailsController: function(scope, resourceFactory) {
        scope.currencydetails = [];
        resourceFactory.currencyResource.getCurrency(function(data) {
            scope.currencydetails = data;
        }); 
    }
  });
  mifosX.ng.application.controller('CurrencyDetailsController', ['$scope', 'ResourceFactory', mifosX.controllers.CurrencyDetailsController]).run(function($log) {
    $log.info("CurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));
