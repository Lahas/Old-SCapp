(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateGameMapDetailsController: function(scope, resourceFactory, location,dateFilter,webStorage) {
		  
		  
		  scope.gameData = [];
		  scope.partnerGameAttributes = {};
		  scope.hideIfNotContentProvider = false;
		  scope.counter = 0;
		  scope.formData = {};
		  scope.formData.chData = {};
		  
		  
		  resourceFactory.mediaSettlementTemplateResource.get(function(data) {
			  scope.formData = data;
			  scope.partnerTypeData = data.partnerTypeData;
			  scope.mediaCategoryData = data.mediaCategoryData;
			  scope.currencyCodes = data.currencyCodes;
			  
		  });
		  
		  scope.getAddress = function(partnerId){
			  console.log(partnerId);
		  };
		  
		  
		 /* scope.addChannelPartner = function(){
			  scope.counter = scope.counter+1;
	        	scope.gameData.push({
												channelPartnerName : scope.partnerGameAttributes.channelPartnerName,
												channelPartnerAddress : scope.partnerGameAttributes.channelPartnerAddress
												
											});
	        	
	        	scope.partnerGameAttributes.channelPartnerName = undefined;
				scope.partnerGameAttributes.channelPartnerAddress = undefined;
				
		  };*/
		  
		  /*scope.hideChannelPartner = function(partnerType){
			  
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
		  
		  
		 /* scope.removeGamePartner = function(index){	
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.gameData.splice(index,1);
	        };*/
		  
		  scope.tabStatus = function(){
	    	   webStorage.add("currentTab", {tab: "partner" });
	      };
		  
		
		  
		  
		  scope.submitPartnerAccount = function(){
			  
			  
			  /*delete scope.formData.partnerTypeData;
			  delete scope.formData.mediaCategoryData;*/
			  scope.formData.locale = "en";
			  delete scope.formData.currencyCodes;
			  delete scope.formData.partnerTypeData;
			  delete scope.formData.mediaCategoryData;
			  delete scope.formData.clients;
			  webStorage.add("currentTab", {tab: "partner" });
			  /*if(scope.hideIfNotContentProvider == true){
				scope.formData.chData = scope.gameData;  
			  }else{
				scope.formData.chData = {};  
			  }*/
			  
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
			  
			  resourceFactory.mediaSettlement.save(scope.formData,function(data){
	            	location.path('/viewpartneraccount/'+data.resourceId);
	            	
				  
	          });
			  
			  
		  };
	  }
  });
  mifosX.ng.application.controller('CreateGameMapDetailsController', ['$scope', 'ResourceFactory', '$location','dateFilter','webStorage',mifosX.controllers.CreateGameMapDetailsController]).run(function($log) {
    $log.info("CreateGameMapDetailsController initialized");
  });
}(mifosX.controllers || {}));
