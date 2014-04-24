(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewGrnController: function(scope, routeParams , resourceFactory ,location) {
			  scope.grn = [];
	        resourceFactory.grnSingleTemplateResource.get({grnId: routeParams.id} , function(data) {
	        	scope.grn = data;
	        });
	        
	        	scope.deleteItem = function(){
	            resourceFactory.itemResource.delete({itemId: routeParams.id},{},function(data){
	                location.path('/inventory');

	        });
	        }
	    }
	  });
	  mifosX.ng.application.controller('ViewGrnController', ['$scope', '$routeParams','ResourceFactory', '$location',mifosX.controllers.ViewGrnController]).run(function($log) {
	    $log.info("ViewGrnController initialized");
	  });
	}(mifosX.controllers || {}));
