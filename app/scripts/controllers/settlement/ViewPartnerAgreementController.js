(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewPartnerAgreementController: function(scope,routeParams, resourceFactory, location,dateFilter,validator,http,webStorage,$modal) {
			 
			  scope.partnerTypeDatas = [];
			  scope.mediaCategoryDatas = [];
			  scope.agreementTypeDatas = [];
			  scope.agreementCategoryDatas = [];
			  scope.royaltyTypeDatas = [];
			  scope.settlementSourceDatas = [];
			  scope.partnerAgreementDatas = [];
			  scope.formData = {};
			  scope.formData.startDate = new Date();
			  scope.formData.endDate = new Date();
			  scope.minDate=new Date();
			  scope.resouresId=routeParams.id;
			  
			  scope.royaltySequenceDatas=[{id:0, value:"Default"},{id:1, value:"Specific"} ];
			  scope.statusDatas=[{id:1, value:"Active"},{id:0, value:"Deactive"} ];
		
	      resourceFactory.viewpartnerAgreementResource.getAll({documentId: routeParams.id} ,function(data) {
			          
	    	  scope.agreementType=data.agreementDetails.agreementType;
			  scope.agreementCategory=data.agreementDetails.agreementCategory;
			  scope.royaltyType=data.agreementDetails.royaltyType;
			  scope.settlementSource=data.agreementDetails.settlementSource;
			  scope.partnerType=data.agreementDetails.partnerType;
			  scope.partnerName=data.agreementDetails.partnerName;
			  scope.startDate=dateFilter(new Date(data.agreementDetails.startDate),'dd MMMM yyyy');
			  scope.endDate=dateFilter(new Date(data.agreementDetails.endDate),'dd MMMM yyyy');
			  scope.partnerAccountId = data.agreementDetails.partnerAccountId;
			  scope.mgAmount = data.agreementDetails.mgAmount;
			  scope.fileName = data.agreementDetails.fileName;
			  
			  scope.mediaCategoryDatas = data.mediaCategoryDetails;
			  
			  for( var i in scope.mediaCategoryDatas){
					for( var j in scope.statusDatas){
						if(scope.mediaCategoryDatas[i].status == scope.statusDatas[j].id){
							scope.sd=scope.statusDatas[j].value;
							scope.mediaCategoryDatas[i].statuss=scope.sd;
						}
					}
				}
			  
			  for( var i in scope.mediaCategoryDatas){
					for( var j in scope.royaltySequenceDatas){
						if(scope.mediaCategoryDatas[i].royaltySequence == scope.royaltySequenceDatas[j].id){
							scope.rs=scope.royaltySequenceDatas[j].value;
							scope.mediaCategoryDatas[i].royaltySequences=scope.rs;
						}
					}
				}
	    	  
	       });		
	      
	      
	      /*scope.downloadFile = function (){ 
	    	  console.log("download");
        	  window.open('https://localhost:9554/obsplatform/api/v1/mediasettlements/'+routeParams.id+'/print?tenantIdentifier=default');
      	  };*/
			
		  scope.tabStatus = function(){
	        	
	    	   webStorage.add("currentTab", {tab: "agreement" });
	      };
  
	      scope.routeTo = function(id){
              location.path('editPartnerAgreement/'+ id);
               
         };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('ViewPartnerAgreementController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$modal', mifosX.controllers.ViewPartnerAgreementController]).run(function($log) {
	    $log.info("ViewPartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));
