(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewPartnerAccountController: function(scope,routeParams, resourceFactory, location,dateFilter,validator,http,webStorage,$modal) {
			  
			  scope.resouresId=routeParams.id;
			  
			  resourceFactory.viewpartnerAccountResource.getAll({id: routeParams.id} ,function(data) {
					scope.partnerName=data.partnerName;
					scope.partnerTypeName=data.partnerTypeName;
					scope.contactNum=data.contactNum;
					scope.emailId=data.emailId;
					scope.externalId=data.externalId;
					scope.currencyName=data.currencyName;
					scope.royaltySequence=data.royaltySequence;
			  });
			  
		  }
	  });
	  mifosX.ng.application.controller('ViewPartnerAccountController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$modal', mifosX.controllers.ViewPartnerAccountController]).run(function($log) {
	    $log.info("ViewPartnerAccountController initialized");
	  });
	}(mifosX.controllers || {}));