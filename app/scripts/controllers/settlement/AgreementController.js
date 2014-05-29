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
			 // scope.status=partnerData.status;
			  
			  
			  scope.routeTo=function(id){
		    	   location.path('/viewpartneragreement/'+id);  
		       };
		       
		       
		       scope.downloadFile = function (id){ 
		        	  window.open('https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/'+id+'/print?tenantIdentifier=default');
		      	  };
		       
		       
		       
			  resourceFactory.partnerAgreementResource.getAllfiles({partnerId: routeParams.id},function(data){
				  
				  scope.partnerAgreements=data;
				  for(var i in  scope.partnerAgreements){
				  scope.agreementType=scope.partnerAgreements[i].agreementType;
				  scope.startDate=dateFilter(new Date(scope.partnerAgreements[i].startDate),'dd MMMM yyyy');
				  scope.endDate=dateFilter(new Date(scope.partnerAgreements[i].endDate),'dd MMMM yyyy');
				  var toDayDate = dateFilter(new Date(),'dd MMMM yyyy');
				
				  if( scope.agreementType=="Signed"){
					  if(new Date(scope.endDate) >=new Date(toDayDate)){
	          			scope.status ="Active";
	              	}else{
	              		scope.status ="delete";
	              	}
	          	}if(scope.agreementType=="Pending"){
	        		if(new Date(scope.endDate).getTime() === new Date(scope.startDate).getTime()){
	        			scope.status ="clientStatusType.pending";
	            	}else{
	            		scope.status ="delete";
	           	}           		
	        	}
				}if(scope.partnerAgreements.length==0){
					scope.status ="delete";
				}
			  
			  });
			  
		  }
		
	  });
	  mifosX.ng.application.controller('AgreementController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage', mifosX.controllers.AgreementController]).run(function($log) {
	    $log.info("AgreementController initialized");
	  });
	}(mifosX.controllers || {}));