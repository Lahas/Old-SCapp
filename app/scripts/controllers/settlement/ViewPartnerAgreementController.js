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
			  
			  scope.onFileSelect = function($files) {
			        scope.file = $files[0];
			      };

			  
			      
			resourceFactory.viewpartnerAgreementResource.getAll({documentId: routeParams.id} ,function(data) {
			            
				          	
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
					  scope.startDate=dateFilter(new Date(data.mediaSettlementCommand.startDate),'dd MMMM yyyy');
					  scope.endDate=dateFilter(new Date(data.mediaSettlementCommand.endDate),'dd MMMM yyyy');
					  scope.formData.partnerAccountId = data.mediaSettlementCommand.partnerAccountId;
					  scope.formData.playSource=data.mediaSettlementCommand.playSource;
					  scope.formData.royaltyShare=data.mediaSettlementCommand.royaltyShare;
					  scope.formData.royaltySequence=data.mediaSettlementCommand.royaltySequence;
					  scope.mgAmount = data.mediaSettlementCommand.mgAmount;
					  
					  
					  for( var i in scope.mediaSettlementPartnerNameDatas){
			        		if(scope.formData.partnerAccountId == scope.mediaSettlementPartnerNameDatas[i].id){
			        			scope.partnerName=scope.mediaSettlementPartnerNameDatas[i].partnerName;
			        		}
					  		}
		          
					  for( var i in scope.partnerTypeDatas){
			        		if(scope.formData.partnerType == scope.partnerTypeDatas[i].id){
			        			scope.partnerType=scope.partnerTypeDatas[i].mCodeValue;
			        		}
					  		}
					  for( var i in scope.agreementTypeDatas){
			        		if(scope.formData.agreementType == scope.agreementTypeDatas[i].id){
			        			scope.agreementType=scope.agreementTypeDatas[i].mCodeValue;
			        		}
					  		}
					  for( var i in scope.agreementCategoryDatas){
			        		if(scope.formData.agreementCategory == scope.agreementCategoryDatas[i].id){
			        			scope.agreementCategory=scope.agreementCategoryDatas[i].mCodeValue;
			        		}
					  		}
					  for( var i in scope.royaltyTypeDatas){
			        		if(scope.formData.royaltyType == scope.royaltyTypeDatas[i].id){
			        			scope.royaltyType=scope.royaltyTypeDatas[i].mCodeValue;
			        		}
					  		}
					  for( var i in scope.settlementSourceDatas){
			        		if(scope.formData.settlementSource == scope.settlementSourceDatas[i].id){
			        			scope.settlementSource=scope.settlementSourceDatas[i].mCodeValue;
			        		}
					  		}
					  for( var i in scope.partnerTypeDatas){
			        		if(scope.formData.partnerType == scope.partnerTypeDatas[i].id){
			        			scope.partnerType=scope.partnerTypeDatas[i].mCodeValue;
			        		}
					  		}
		      });
			  
			resourceFactory.viewpartnerAgreementMediaCategoryResource.get({partnerId : routeParams.id},function(data){
						
				scope.partnerAgreementDatas=data.partnerAgreementDatas;	
				
			
			if(scope.partnerAgreementDatas != null){
				
				for( var i in scope.partnerAgreementDatas){
					for( var j in scope.royaltySequenceDatas){
						if(scope.partnerAgreementDatas[i].royaltySequence == scope.royaltySequenceDatas[j].id){
							scope.rs=scope.royaltySequenceDatas[j].value;
							scope.partnerAgreementDatas[i].royaltySequences=scope.rs;
						}
					}
				}
				
				for( var i in scope.partnerAgreementDatas){
					for( var j in scope.statusDatas){
						if(scope.partnerAgreementDatas[i].status == scope.statusDatas[j].id){
							scope.sd=scope.statusDatas[j].value;
							scope.partnerAgreementDatas[i].statuss=scope.sd;
						}
					}
				}

				for( var i in scope.partnerAgreementDatas){
					
					for( var j in scope.mediaCategoryDatas){
						if(scope.partnerAgreementDatas[i].mediaCategory == scope.mediaCategoryDatas[j].id){
							scope.mc=scope.mediaCategoryDatas[j].mCodeValue;
							scope.partnerAgreementDatas[i].mediaCategorys=scope.mc;
						}
					}
				}
				
				for( var i in scope.partnerAgreementDatas){
					for( var j in scope.playSourceDatas){
						if(scope.partnerAgreementDatas[i].playSource == scope.playSourceDatas[j].id){
							scope.ps=scope.playSourceDatas[j].mCodeValue;
							scope.partnerAgreementDatas[i].playSources=scope.ps;
						}
					}
				}
			}	
			
			});			

				  scope.tabStatus = function(){
			        	
			    	   webStorage.add("currentTab", {tab: "agreement" });
			      };
		  
			      scope.routeTo = function(id){
		              location.path('/  editPartnerAgreement/'+ id);
		               
		         };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('ViewPartnerAgreementController', ['$scope','$routeParams', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$modal', mifosX.controllers.ViewPartnerAgreementController]).run(function($log) {
	    $log.info("ViewPartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));