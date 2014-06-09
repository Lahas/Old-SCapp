(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditCurrencyRateController: function(scope, resourceFactory, location, routeParams,dateFilter,$modal) {
		  scope.currencyCodesData = [];
          scope.start = {};
          scope.end= {};
        resourceFactory.currencyRateResource.get({id : routeParams.id}, function(data) {
            scope.currencyCodesData = data.currencyCodes;
            scope.formData=data;
            var actDate = dateFilter(data.startDate,'dd MMMM yyyy');
            var actendDate = dateFilter(data.endDate,'dd MMMM yyyy');
            scope.start.startDate = new Date(actDate);
            scope.end.endDate = new Date(actendDate);
            
        });
        
		  
		  scope.cancel = function(){
	        	
			  location.path('/currencyrate');
	      };

		  
		  scope.deleteCurrency = function(){
	    	    $modal.open({
	    		  	templateUrl: 'approve.html',
	              	controller: Approve,
	              	resolve:{}
	          	});
		  };
		   var Approve= function($scope, $modalInstance){
		   $scope.approve = function () {
		
                resourceFactory.currencyRateResource.delete({id: routeParams.id} , {} , function(data) {
                     location.path('/currencyrate');
                     
                });
                $modalInstance.close('delete');
                        };
         $scope.cancel = function () {
             $modalInstance.dismiss('cancel');
         };
		   }  
        
        
        
        scope.submit = function() {
        	this.formData.locale = "en";
            this.formData.dateFormat = "dd MMMM yyyy";
            this.formData.startDate = dateFilter(scope.start.startDate,'dd MMMM yyyy');
            this.formData.endDate = dateFilter(scope.end.endDate,'dd MMMM yyyy');
           delete this.formData.id; 
           delete this.formData.currencyCodes;
          resourceFactory.currencyRateResource.update({id: routeParams.id}, this.formData,function(data){
            location.path('/currencyrate' );
          });
        };
    }
  });
  mifosX.ng.application.controller('EditCurrencyRateController', ['$scope', 'ResourceFactory', '$location', '$routeParams','dateFilter','$modal', mifosX.controllers.EditCurrencyRateController]).run(function($log) {
    $log.info("EditCurrencyRateController initialized");
  });
}(mifosX.controllers || {}));
