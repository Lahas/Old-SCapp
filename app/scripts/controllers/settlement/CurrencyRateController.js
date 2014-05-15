(function(module) {
  mifosX.controllers = _.extend(module, {
	  CurrencyRateController: function(scope, resourceFactory,location) {
        scope.currencyData = [];
        resourceFactory.currencyRateResource.getAllcurrency(function(data) {
            scope.currencyData = data.channelPartnerData;
        });
        
        scope.routeTo=function(id){
        	location.path('/editcurrencyrate/'+id);
        };
        
    }
  });
  mifosX.ng.application.controller('CurrencyRateController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.CurrencyRateController]).run(function($log) {
    $log.info("CurrencyRateController initialized");
  });
}(mifosX.controllers || {}));