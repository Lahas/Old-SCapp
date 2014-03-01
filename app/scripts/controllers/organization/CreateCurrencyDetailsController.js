(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateCurrencyDetailsController: function(scope, resourceFactory, location) {
	        scope.countryDatas = [];
	        scope.currencydatas = [];
	        scope.currencystatus = [];
	        
	        resourceFactory.currencyTemplateResource.get(function(data) {
	            scope.countryDatas = data.countryData;
	            scope.currencydatas = data.currencydata.currencyOptions;
	            scope.currencystatus = data.currencystatus;
	            scope.formData = {
	            		
	            };
	        });
	        
	        scope.submit = function() {  
	            resourceFactory.currencyResource.save(this.formData,function(data){
	            	location.path('/currencydetails');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateCurrencyDetailsController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateCurrencyDetailsController]).run(function($log) {
	    $log.info("CreateCurrencyDetailsController initialized");
	  });
	}(mifosX.controllers || {}));

