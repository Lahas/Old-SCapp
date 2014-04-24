(function(module) {
  mifosX.controllers = _.extend(module, {
	  CurrencyRateController: function(scope, resourceFactory) {
        scope.currencyData = [];
        resourceFactory.currencyRateResource.getAllcurrency(function(data) {
            scope.currencyData = data.channelPartnerData;
        });
    }
  });
  mifosX.ng.application.controller('CurrencyRateController', ['$scope', 'ResourceFactory', mifosX.controllers.CurrencyRateController]).run(function($log) {
    $log.info("CurrencyRateController initialized");
  });
}(mifosX.controllers || {}));