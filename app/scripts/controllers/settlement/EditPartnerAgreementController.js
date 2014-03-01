(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditPartnerAgreementController: function(scope,routeParams, resourceFactory, location,dateFilter,validator,http,webStorage,$modal) {
		  
			  scope.partnerTypeDatas = [];
			  scope.mediaCategoryDatas = [];
			  scope.agreementTypeDatas = [];
			  scope.agreementCategoryDatas = [];
			  scope.royaltyTypeDatas = [];
			  scope.settlementSourceDatas = [];
			  scope.formData = {};
			  scope.minDate=new Date();
				
			  scope.royaltySequenceDatas=[{id:0, value:"Default"},{id:1, value:"Specific"} ];
			  
			  scope.onFileSelect = function($files) {
			        scope.file = $files[0];
			      };

		        resourceFactory.editpartnerAgreementResource.getAllfiles({documentId: routeParams.id} ,function(data) {
		            
		        	scope.partnerTypeDatas = data.partnerAccountData.partnerTypeData;
		            scope.mediaCategoryDatas = data.partnerAccountData.mediaCategoryData;
		            scope.agreementTypeDatas = data.partnerAccountData.agreementTypeData;
			        scope.agreementCategoryDatas = data.partnerAccountData.agreementCategoryData;
			        scope.royaltyTypeDatas = data.partnerAccountData.royaltyTypeData;
			        scope.settlementSourceDatas=data.partnerAccountData.settlementSourceData;
			        scope.mediaSettlementPartnerNameDatas = data.partnerAccountData.mediaSettlementPartnerName;
			        scope.playSourceDatas=data.partnerAccountData.playSourceData;
			        
			          scope.formData.agreementType=data.mediaSettlementCommand.agreementType;
					  scope.formData.agreementCategory=data.mediaSettlementCommand.agreementCategory;
					  scope.formData.royaltyType=data.mediaSettlementCommand.royaltyType;
					  scope.formData.settlementSource=data.mediaSettlementCommand.settlementSource;
					  scope.formData.mediaCategory=data.mediaSettlementCommand.mediaCategory;
					  scope.formData.partnerType=data.mediaSettlementCommand.partnerType;
					  scope.formData.partnerName=data.mediaSettlementCommand.partnerName;
					  scope.formData.startDate=dateFilter(new Date(data.mediaSettlementCommand.startDate),'dd MMMM yyyy');
					  scope.formData.endDate=dateFilter(new Date(data.mediaSettlementCommand.endDate),'dd MMMM yyyy');
					  scope.formData.partnerAccountId = data.mediaSettlementCommand.partnerAccountId;
					  scope.formData.playSource=data.mediaSettlementCommand.playSource;
					  scope.formData.royaltyShare=data.mediaSettlementCommand.royaltyShare;
					  scope.formData.royaltySequence=data.mediaSettlementCommand.royaltySequence;
					  
					  scope.formData.mgAmount = data.mediaSettlementCommand.mgAmount;
					  for( var i in scope.agreementCategoryDatas){
			        		if(scope.formData.mgAmount != null && scope.agreementCategoryDatas[i].id == scope.formData.agreementCategory &&  scope.agreementCategoryDatas[i].mCodeValue == "Minimum Guarantee"){
			        			scope.mgAmount=true;
			        		}
					  		}
		        		});	
		        
				 scope.minimumValue = function(value){
						        	
						        	for( var i in scope.agreementCategoryDatas){
						        		
						        		if(scope.agreementCategoryDatas[i].id == value &&  scope.agreementCategoryDatas[i].mCodeValue == "Minimum Guarantee"){
						        			scope.mgAmount=true;
						        			$(".requiredValue").attr("required","required");
						        		}
						        		else{
						        			scope.mgAmount=false;
						        			$(".requiredValue").removeAttr("required");
						       		}
						       			
						       	}
							  };
							  
							  
		        
		        /*scope.getCategory=function(pName){
					  console.log(pName);
					  resourceFactory.getCategoryAndPartner.get({partnerName: pName},function(data) {
				  			scope.formData.mediaCategory = data.mediaCategoryData.mediaCategoryId;
				  			scope.formData.partnerType = data.partnerTypeData.partnerTypeId;
				  			
				      });
				  };*/
		        
		        scope.tabStatus = function(){
		        	
			    	   webStorage.add("currentTab", {tab: "agreement" });
			      };
		  
		        scope.submit = function () {
		        	this.formData.locale = 'en';
		        	var reqDate1 = dateFilter(scope.formData.startDate,'dd MMMM yyyy');
		            this.formData.dateFormat = 'dd MMMM yyyy';
		            this.formData.startDate = reqDate1;
		            
		            var reqDate2 = dateFilter(scope.formData.endDate,'dd MMMM yyyy');
		            this.formData.endDate = reqDate2;
		         
		            http.uploadFile({
		              url: 'https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/'+routeParams.id+'/document', 
		              data: scope.formData,
		              file: scope.file
		            }).then(function(data) {
		              // to fix IE not refreshing the model
		              if (!scope.$$phase) {
		                scope.$apply();
		              }
		              location.path('/game');
		            });
		            
		          
		            webStorage.add("currentTab", {tab: "agreement" });
		          };
		        
		          
		          scope.deleteAgreement = function(){
			        	
			    	    $modal.open({
			    		  	templateUrl: 'approve.html',
			              	controller: Approve,
			              	resolve:{}
			          	});
				  };
				   var Approve= function($scope, $modalInstance){
				   $scope.approve = function () {
					   //$modalInstance.close('delete');
		                  resourceFactory.deletepartnerAgreementResource.delete({documentId: routeParams.id} , {} , function(data) {
		                       location.path('/game');
		                       
		                  });
		                  $modalInstance.close('delete');
		                          };
		           $scope.cancel = function () {
		               $modalInstance.dismiss('cancel');
		           };
			   }
		  
		  }
	  });
	  mifosX.ng.application.controller('EditPartnerAgreementController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$modal', mifosX.controllers.EditPartnerAgreementController]).run(function($log) {
	    $log.info("EditPartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));