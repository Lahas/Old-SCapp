(function(module) {
	  mifosX.controllers = _.extend(module, {
		  AgreementController: function(scope,routeParams, resourceFactory, location,dateFilter,validator,http,webStorage) {
			  
			  scope.resouresId=routeParams.id;
			  scope.buttons = [];
			  scope.partner = [];
			  scope.partnerAgreements = [];
			  var partnerData=webStorage.get('partnerData');
			  scope.partnerName=partnerData.partnerName;
			  scope.partnerTypeName=partnerData.partnerTypeName;
			  
			  
			  scope.routeTo=function(id){
		    	   location.path('/viewpartneragreement/'+id);  
		       };
		       
		       
		       scope.downloadFile = function (id){ 
		        	  window.open('https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
		      	  };
		       
		       
		       
			  resourceFactory.partnerAgreementResource.getAllfiles({partnerId: routeParams.id},function(data){
				  
				  scope.partnerAgreements=data;
				 // console.log(scope.partnerAgreements);
			  });
			  
		  }
		
	  });
	  mifosX.ng.application.controller('AgreementController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage', mifosX.controllers.AgreementController]).run(function($log) {
	    $log.info("AgreementController initialized");
	  });
	}(mifosX.controllers || {}));