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
			  
			  scope.royaltySequenceDatas=[{id:0, value:"Default"},{id:1, value:"Specific"} ];
			  
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
		        
		       /* scope.getCategory=function(pName){
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
		        	console.log("asassas");
		        	this.formData.locale = 'en';
		        	var reqDate1 = dateFilter(scope.formData.startDate,'dd MMMM yyyy');
		            this.formData.dateFormat = 'dd MMMM yyyy';
		            this.formData.startDate = reqDate1;
		            
		            var reqDate2 = dateFilter(scope.formData.endDate,'dd MMMM yyyy');
		            this.formData.endDate = reqDate2;
		            
		            http.uploadFile({
		              url: 'https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/document', 
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