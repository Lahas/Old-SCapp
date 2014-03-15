(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditGameMapDetailsController: function(scope, resourceFactory, location,dateFilter,routeParams,$modal) {
		  
		  scope.hideIfNotContentProvider = false;
		  scope.gameData = [];
		  scope.partnerGameAttributes = {};
		  
		  resourceFactory.mediaSettlement.get({mediaSettlementId:routeParams.id},function(data) {
			  scope.formData = data;
//			  scope.formData.currencyCode = parseInt(data.currencyCode);
			  scope.currencyCodes = data.currencyCodes;
			  scope.partnerTypeData = data.partnerTypeData;
			  /* scope.mediaCategory = data.mediaCategoryData;
			  scope.channelPartner = data.channelPartners;
			  scope.channelPartnerDatas = data.channelPartnerData;*/
//			  scope.gameData = data.channelPartners;
			  scope.currencyCodes = data.currencyCodes;
			 /* for(i in scope.partnerType){
				  
				  if(scope.partnerType[i].mCodeValue == "Content Provider" && scope.partnerType[i].id == scope.formData.partnerType){
					  scope.hideIfNotContentProvider = true;
					  for(j in scope.channelPartner){
						  scope.counter = scope.counter+1;
						  console.log(j);
				        	scope.gameData.push({
															channelPartnerName : scope.channelPartner[j].channelPartnerName,
															channelPartnerId : scope.channelPartner[j].channelPartnerId
															
														});
				        	
				        	scope.channelPartner.channelPartnerName = undefined;
							scope.channelPartner.channelPartnerId = undefined;
					  }
					  break;
				  }else{
					  scope.formData.chData = {};
					  scope.gameData = [];
					  scope.hideIfNotContentProvider = false;
				  }
			  }*/
			  
			  
		  });
		  
		/*  scope.getAddress = function(partnerId){
			  console.log(partnerId);
		  };
		  */
		  	  
		  scope.submitPartnerAccount = function(){
			 
			  delete scope.formData.partnerTypeData;
			 /*  delete scope.formData.mediaCategoryData;*/
			  delete scope.formData.id;
			  /*delete scope.formData.channelPartners;
			  delete scope.formData.channelPartnerData;*/
			  delete scope.formData.currencyCodes;
			  scope.formData.locale="en";
			  
			 /* scope.formData.chData = new Array();
			  if(scope.gameData.length>0){
	        		for(var i in scope.gameData){
	        			//console.log("i: "+i);
	        			scope.formData.chData.push({
	        				channelPartnerAddress : scope.gameData[i].channelPartnerAddress,
							channelPartnerName : scope.gameData[i].channelPartnerName
							
	        			});
	        		}
	        	}*/
			  resourceFactory.mediaSettlement.update({mediaSettlementId:routeParams.id},scope.formData,function(data){
	            	location.path('/game');
	          });
			  
		  };
		  
		  
		 /* scope.addChannelPartner = function(){
			    scope.counter = scope.counter+1;
	        	scope.gameData.push({
												channelPartnerName : scope.partnerGameAttributes.channelPartnerName,
												channelPartnerAddress : scope.partnerGameAttributes.channelPartnerAddress
												
											});
	        	
	        	scope.partnerGameAttributes.channelPartnerName = undefined;
				scope.partnerGameAttributes.channelPartnerAddress = undefined;
				
		  };
		  
		  scope.removeGamePartner = function(index){	
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.gameData.splice(index,1);
	        };
		  
		  scope.hideChannelPartner = function(partnerType){
			  
			  for(i in scope.partnerType){
				  if(scope.partnerType[i].mCodeValue == "Content Provider" && scope.partnerType[i].id == partnerType){
					  scope.hideIfNotContentProvider = true;
					  resourceFactory.channelPartnerResource.get({},function(data) {
						  scope.channelPartnerDatas = data.channelPartnerData;
					  });
					  break;
				  }else{
					  scope.formData.chData = {};
					  scope.gameData = [];
					  scope.hideIfNotContentProvider = false;
				  }
			  }
			  
			  
		  };*/
		  
		  
		  scope.deleteAccount = function(){
	    	    $modal.open({
	    		  	templateUrl: 'approve.html',
	              	controller: Approve,
	              	resolve:{}
	          	});
		  };
		   var Approve= function($scope, $modalInstance){
		   $scope.approve = function () {
		//  scope.approveData = {};
			   //$modalInstance.close('delete');
                resourceFactory.mediaSettlement.delete({mediaSettlementId: routeParams.id},{}, function(data) {
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
  mifosX.ng.application.controller('EditGameMapDetailsController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams','$modal', mifosX.controllers.EditGameMapDetailsController]).run(function($log) {
    $log.info("EditGameMapDetailsController initialized");
  });
}(mifosX.controllers || {}));
