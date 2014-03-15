(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePartnerAgreementController: function(scope, resourceFactory, location,dateFilter,validator,http,webStorage) {
		  
			  scope.partnerTypeDatas = [];
			  scope.mediaCategoryDatas = [];
			  scope.agreementTypeDatas = [];
			  scope.agreementCategoryDatas = [];
			  scope.royaltyTypeDatas = [];
			  scope.settlementSourceDatas = [];
			  scope.formData = {};
			  scope.formData.startDate = new Date();
			  scope.formData.endDate = new Date();
			  scope.minDate=new Date();
			  
			  scope.mediaPartnerAttributes = {};
			  scope.mediaPartnerData= [];
			  
			  scope.royaltySequenceDatas=[{id:0, value:"Default"},{id:1, value:"Specific"} ];
			  scope.statusDatas=[{id:1, value:"Active"},{id:0, value:"Deactive"} ];
			  
			  scope.onFileSelect = function($files) {
			        scope.file = $files[0];
			      };

			  
			      
			  resourceFactory.partnersTemplateResource.getTemplate(function(data) {
		        	
		            scope.partnerTypeDatas = data.partnerTypeData;
		            scope.mediaCategoryDatas = data.mediaCategoryData;
		            scope.agreementTypeDatas = data.agreementTypeData;
			        scope.agreementCategoryDatas = data.agreementCategoryData;
			        scope.royaltyTypeDatas = data.royaltyTypeData;
			        scope.settlementSourceDatas=data.settlementSourceData;
			        scope.mediaSettlementPartnerNameDatas = data.mediaSettlementPartnerName;
			        scope.playSourceDatas=data.playSourceData;
		          
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
		        
		       scope.getCategory=function(pName){
					  console.log(pName);
					  resourceFactory.getPartnerType.get({partnerName: pName},function(data) {
//				  			scope.formData.mediaCategory = data.mediaCategoryData.mediaCategoryId;
				  			scope.formData.partnerType = data.partnerTypeId;
				  			
				  			for( var i in scope.partnerTypeDatas){
				        		if(scope.formData.partnerType == scope.partnerTypeDatas[i].id){
				        			scope.partnerTypeName=scope.partnerTypeDatas[i].mCodeValue;
				        		}
						  		}
				  			
				      });
				  };
		       
		
				  
				  scope.addmediaCategories = function(){
			        	scope.counter = scope.counter+1;
			        	scope.mediaPartnerData.push({
														mediaCategory : scope.mediaPartnerAttributes.mediaCategory,
														playSource : scope.mediaPartnerAttributes.playSource,
														royaltyShare : scope.mediaPartnerAttributes.royaltyShare,
														royaltySequence : scope.mediaPartnerAttributes.royaltySequence,
														status : scope.mediaPartnerAttributes.status
														
													});
			        	
			        	scope.mediaPartnerAttributes.mediaCategory = undefined;
						scope.mediaPartnerAttributes.playSource = undefined;
						scope.mediaPartnerAttributes.royaltyShare = undefined;
						scope.mediaPartnerAttributes.royaltySequence = undefined;
						scope.mediaPartnerAttributes.status = undefined;
			        };	  
				  
				  
			        scope.removemediaCategories = function(index){	
			        	if(scope.counter>=1){
			        		scope.counter = scope.counter-1;
			        	}
			        	scope.mediaPartnerData.splice(index,1);
			        		
			        };  
			
				  scope.tabStatus = function(){
			        	
			    	   webStorage.add("currentTab", {tab: "agreement" });
			      };
		  
		        scope.submit = function () {
		        	console.log("asassas");
		        	this.formData.locale = 'en';
		        	var reqDate1 = dateFilter(scope.formData.startDate,'dd MMMM yyyy');
		            this.formData.dateFormat = 'dd MMMM yyyy';
		            this.formData.startDate = reqDate1;
		            
		            var reqDate2 = dateFilter(scope.formData.endDate,'dd MMMM yyyy');
		            this.formData.endDate = reqDate2;
		            
		            scope.formData.partnerAgreementData = new Array();
					  if(scope.mediaPartnerData.length>0){
			        		for(var i in scope.mediaPartnerData){
			        			scope.formData.partnerAgreementData.push({
			        				mediaCategory : scope.mediaPartnerData[i].mediaCategory,
			        				playSource : scope.mediaPartnerData[i].playSource,
			        				royaltyShare : scope.mediaPartnerData[i].royaltyShare,
									royaltySequence : scope.mediaPartnerData[i].royaltySequence,
									status : scope.mediaPartnerData[i].status,
									locale : "en",
			        			});
			        		}
			        	}
		            
					  resourceFactory.pamediaCategoryDataResource.save(this.formData,function(data){
					  });
					  console.log(JSON.stringify(scope.formData.partnerAgreementData)); 
		            
					    delete scope.formData.agreementType;
			        	delete scope.formData.agreementCategory;
			        	delete scope.formData.settlementSource;
			        	delete scope.formData.startDate;
			        	delete scope.formData.endDate;
			        	delete scope.formData.mgAmount;
			        	delete scope.formData.dateFormat;
					  	delete scope.formData.royaltyShare; 
						delete scope.formData.playSource; 
						delete scope.formData.royaltySequence; 
						delete scope.formData.status; 
						delete scope.formData.partnerAgreementData; 
					 
		            http.uploadFile({
		            	url: 'https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/document', 
		            	//url: 'https://localhost:8443/mifosng-provider/api/v1/mediasettlements/document',		              
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
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('CreatePartnerAgreementController', ['$scope', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage', mifosX.controllers.CreatePartnerAgreementController]).run(function($log) {
	    $log.info("CreatePartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));