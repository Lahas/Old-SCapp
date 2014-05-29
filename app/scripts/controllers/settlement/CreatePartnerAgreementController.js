(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePartnerAgreementController: function(scope, resourceFactory, location,dateFilter,validator,http,webStorage,routeParams) {
		     
			  scope.formData = {};
			  
			  var partnerData=webStorage.get('partnerData');
			  scope.partnerName=partnerData.partnerName;
			  scope.status=partnerData.status;
			  scope.formData.partnerType=partnerData.partnerTypeName;
			  scope.formData.partnerAccountId=partnerData.partnerId;
			  
			  scope.partnerTypeDatas = [];
			  scope.mediaCategoryDatas = [];
			  scope.agreementTypeDatas = [];
			  scope.agreementCategoryDatas = [];
			  scope.royaltyTypeDatas = [];
			  scope.settlementSourceDatas = [];
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
			  
			  scope.dateValues=function(value){
				  for(var i in scope.agreementTypeDatas){
					 if(scope.agreementTypeDatas[i].id==value&&scope.agreementTypeDatas[i].mCodeValue == "Pending") {
						  $("#startDate").attr("disabled","disabled");
						  $("#endDate").attr("disabled","disabled");
					 }else{
						 $("#startDate").removeAttr("disabled");
						  $("#endDate").removeAttr("disabled");
					 }
				  }
			  };
			  
			  
			  
			//  $("#startDate").attr("disabled","disabled"); 
			  
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
		        
/*		       scope.getPartnerType=function(pName){
					  console.log(pName);
					  
					  for( var i in scope.mediaSettlementPartnerNameDatas){
			        		if(pName == scope.mediaSettlementPartnerNameDatas[i].partnerName){
			        			scope.partnerNameId=scope.mediaSettlementPartnerNameDatas[i].id;
			        		}
					  		}
					  
					  resourceFactory.getPartnerType.get({partnerName: scope.partnerNameId},function(data) {
//				  			scope.formData.mediaCategory = data.mediaCategoryData.mediaCategoryId;
				  			scope.formData.partnerType = data.partnerType;
				  			
				  			for( var i in scope.partnerTypeDatas){
				        		if(scope.formData.partnerType == scope.partnerTypeDatas[i].id){
				        			scope.partnerTypeName=scope.partnerTypeDatas[i].mCodeValue;
				        		}
						  		}
				  			
				      });
				  };
*/		       
		
				  
				  scope.addmediaCategories = function(){
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
			        	
			        	scope.mediaPartnerData.splice(index,1);
			        		
			        };  
		  
		        scope.submit = function () {
		        	
		        	 for( var i in scope.mediaSettlementPartnerNameDatas){
			        		if(this.formData.partnerAccountName == scope.mediaSettlementPartnerNameDatas[i].partnerName){
			        			this.formData.partnerAccountId=scope.mediaSettlementPartnerNameDatas[i].id;
			        		}
					  		}
		        	delete scope.formData.partnerAccountName;
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
		            
					  
					  for( var i in scope.agreementCategoryDatas){
						  if(scope.agreementCategoryDatas[i].id == scope.formData.agreementCategory &&  scope.agreementCategoryDatas[i].mCodeValue == "Regular"){
							  delete scope.formData.mgAmount; 
						  }
					  } 
					  
					  resourceFactory.pamediaCategoryDataResource.save(this.formData,function(data){
		 
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
						  /*
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
//							  location.path('/game');
						  });*/
						  location.path('/viewpartneragreement/'+data.resourceId);
					  });

		            
		            webStorage.add("currentTab", {tab: "agreement" });
		          };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('CreatePartnerAgreementController', ['$scope', 'ResourceFactory', '$location','dateFilter','HTValidationService','$http','webStorage','$routeParams', mifosX.controllers.CreatePartnerAgreementController]).run(function($log) {
	    $log.info("CreatePartnerAgreementController initialized");
	  });
	}(mifosX.controllers || {}));