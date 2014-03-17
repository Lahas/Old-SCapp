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
			  scope.categoryData=[];
			  scope.mediaPartnerAttributes = {};
			  scope.mediaPartnerData= [];
			  scope.resouresId=routeParams.id;
			  
			  
			  scope.royaltySequenceDatas=[{id:0, value:"Default"},{id:1, value:"Specific"} ];
			  scope.statusDatas=[{id:1, value:"Active"},{id:0, value:"Deactive"} ];
			  
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
			        scope.mediaPartnerData=data.partnerAgreementDatas;
			        
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
		/*		
			for(var i in scope.partnerAgreementDatas){
				if(scope.partnerAgreementDatas[i].mediaCategory == 139 ){
					 scope.formData.mediaCategory=data.partnerAgreementDatas[i].mediaCategory;
				}
			}	*/	  
				
			  for( var i in scope.mediaSettlementPartnerNameDatas){
	        		if(scope.formData.partnerAccountId == scope.mediaSettlementPartnerNameDatas[i].id){
	        			scope.partnerAccountName=scope.mediaSettlementPartnerNameDatas[i].partnerName;
	        		}
			  		}	  
					  
			  for( var i in scope.partnerTypeDatas){
	        		if(scope.formData.partnerType == scope.partnerTypeDatas[i].id){
	        			scope.partnerTypeName=scope.partnerTypeDatas[i].mCodeValue;
	        		}
			  		}		  
					  
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
//		        			scope.formData.mgAmount="";
		        			$(".requiredValue").removeAttr("required");
		        		}
		        	}
		        };
		        
		        scope.getMediaDetails = function(mediaCategory){
					  resourceFactory.getmediaDetailsData.get({agmtId : routeParams.id,mediaCategory : mediaCategory, partnerType : scope.formData.partnerType},function(data){
						  scope.partnerAgreementDatas=data.partnerAgreementDatas;								  
						  
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
		        
					
			        
			        scope.deleteCategory = function(index,id){
			        	
			        	scope.index=index;
			        	scope.mid=id;
			        			 $modal.open({
			        				 templateUrl: 'deleteCategory.html',
			        				 controller: deleteCategoryController,
			        				 resolve:{}
			        			 });
			        	
			          };
			          
			          var deleteCategoryController = function ($scope, $modalInstance) {
			        	  	
			        	  $scope.approveDeleteCategory = function () {
			        		  
			        		  
			        		  if(scope.mid == undefined || scope.mid == "undefined"){
			        			  if(scope.counter>=1){
						        		scope.counter = scope.counter-1;
						        	}
						        	scope.mediaPartnerData.splice(index,1);
			        		  }else{
			        		 resourceFactory.deleteMediaCategoryDataResource.delete({ detailId: scope.mid },{},function(data){
//			        			  route.reload();
			        	        },function(errData){
					          });
			        			  $modalInstance.close('delete');
			        		  if(scope.counter>=1){
					        		scope.counter = scope.counter-1;
					        	}
					        	scope.mediaPartnerData.splice(scope.index,1);
			        		  }
			              };
			              $scope.cancel = function () {
			                  $modalInstance.dismiss('cancel');
			              };
			          };

			          scope.tabStatus = function(){
				        	
				    	   webStorage.add("currentTab", {tab: "agreement" });
				      };
		  
		        scope.submit = function () {
		        	
		        	/*delete scope.formData.agreementType;
		        	delete scope.formData.agreementCategory;
		        	delete scope.formData.settlementSource;
		        	delete scope.formData.startDate;
		        	delete scope.formData.endDate;
		        	delete scope.formData.partnerAccountId;
		        	delete scope.formData.mgAmount;
//		        	delete scope.formData.partnerAgreementData;
		        	delete scope.formData.dateFormat;*/
		        
					  console.log(scope.mediaPartnerData.length);
					  scope.formData.partnerAgreementData = new Array();
					  if(scope.mediaPartnerData.length>0){
			        		for(var i in scope.mediaPartnerData){
			        			scope.formData.partnerAgreementData.push({
			        				id : scope.mediaPartnerData[i].id,
			        				mediaCategory : scope.mediaPartnerData[i].mediaCategory,
			        				playSource : scope.mediaPartnerData[i].playSource,
			        				royaltyShare : scope.mediaPartnerData[i].royaltyShare,
									royaltySequence : scope.mediaPartnerData[i].royaltySequence,
									status : scope.mediaPartnerData[i].status,
									locale : "en",
									partnerAccountId : scope.formData.partnerAccountId,
									
			        			});
			        		}
			        	}
					  
					  console.log(JSON.stringify(scope.formData.partnerAgreementData));
					  resourceFactory.editpartnerAgreementDatasDetails.update({clientId: routeParams.id},this.formData,function(data){
					  });
						delete scope.formData.royaltyShare; 
						delete scope.formData.mediaCategory; 
						delete scope.formData.playSource; 
						delete scope.formData.royaltySequence; 
						delete scope.formData.status; 
						delete scope.formData.partnerAgreementData; 
			
		        	this.formData.locale = 'en';
		        	var reqDate1 = dateFilter(scope.formData.startDate,'dd MMMM yyyy');
		            this.formData.dateFormat = 'dd MMMM yyyy';
		            this.formData.startDate = reqDate1;
		            
		            var reqDate2 = dateFilter(scope.formData.endDate,'dd MMMM yyyy');
		            this.formData.endDate = reqDate2;
		            
		            for( var i in scope.agreementCategoryDatas){
		        		if(scope.agreementCategoryDatas[i].id == scope.formData.agreementCategory &&  scope.agreementCategoryDatas[i].mCodeValue == "Regular"){
		        		delete scope.formData.mgAmount; 
		        		}
				  	} 
		            
		            http.uploadFile({
		            	url: 'https://'+document.location.host+'/obsplatform/api/v1/mediasettlements/'+routeParams.id+'/document', 
		            //	url: 'https://localhost:8443/mifosng-provider/api/v1/mediasettlements/'+routeParams.id+'/document',		             
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