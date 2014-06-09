(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateCurrencyRateController: function(scope, resourceFactory, location,dateFilter) {
       
		  scope.currencyCodesData = [];
		  scope.start={};
		  scope.end={};
		  scope.formData = {};
		 // scope.start.date=new Date();	
		 // scope.end.date=new Date();
		  scope.date={};
        resourceFactory.currencyRateTemplateResource.get(function(data) {
        	scope.currencyCodesData = data.currencyCodes;
        	  
            
        });
        
        scope.submit = function() {   
        	this.formData.locale = "en";
            this.formData.dateFormat = "dd MMMM yyyy";
            var startDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');
            var endDate = dateFilter( scope.date.endDate,'dd MMMM yyyy');       
           this.formData.startDate=startDate;
           this.formData.endDate=endDate;
            resourceFactory.currencyRateResource.save(this.formData,function(data){
            location.path('/currencyrate');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateCurrencyRateController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateCurrencyRateController]).run(function($log) {
    $log.info("CreateCurrencyRateController initialized");
  });
}(mifosX.controllers || {}));
