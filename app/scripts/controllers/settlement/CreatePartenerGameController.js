(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePartenerGameController: function(scope, resourceFactory, location,dateFilter,webStorage) {
		  
		  
		  
		  scope.partnerGameAttributes = {};
		  scope.gameData=[];
		  scope.counter = 0;
		  scope.formData = {};
		  scope.hideIfChannelPartner = true;
		  
		  scope.tabStatus = function(){
	    	   webStorage.add("currentTab", {tab: "game" });
	      };
		  
		  
		  resourceFactory.partnerGame.get(function(data) {
		  	scope.partnerNames = data.accountDatas;
		  	scope.gamePlaySources = data.gamePlaySource;
		  	scope.playSourceData = data.playSourceData;
		  	/*scope.contentProviderGames = data.contentProviderGames;*/
		  	
		  }); 
		  
		  scope.getCategory=function(pName){
			  
			  resourceFactory.getCategoryAndPartner.get({partnerName: pName},function(data) {
		  			scope.formData.mediaCategory = data.mediaCategoryData.mediaCategory;
		  			scope.formData.partnerType = data.partnerTypeData.partnerType;
		  			scope.contentProviderGames = data.contentProviderGames;
		  			if(scope.formData.partnerType == "Service"){
		  				scope.hideIfChannelPartner = false;
		  				 if(scope.gameData.length>0){
		  					scope.gameData = [];
		 	        	}
		  			}else{
		  				scope.hideIfChannelPartner = true;
		  				scope.gameData = [];
		  			}
		      });
		  };
		  
		  
		  scope.addGamePartner = function(){
	        	scope.counter = scope.counter+1;
	        	scope.gameData.push({
												game : scope.partnerGameAttributes.game,
												gDate : scope.partnerGameAttributes.gDate,
												playSource : scope.partnerGameAttributes.playSource,
												price : scope.partnerGameAttributes.price,
												overwriteRoyaltyValue : scope.partnerGameAttributes.overwriteRoyaltyValue == undefined ? scope.formData.royaltyValue:scope.partnerGameAttributes.overwriteRoyaltyValue,
												sequence : scope.partnerGameAttributes.sequence=scope.counter 
											});
	        	
	        	scope.partnerGameAttributes.game = undefined;
				scope.partnerGameAttributes.gDate = undefined;
				scope.partnerGameAttributes.playSource = undefined;
				scope.partnerGameAttributes.price = undefined;
				scope.partnerGameAttributes.overwriteRoyaltyValue = undefined;
	            scope.partnerGameAttributes.sequence  = undefined;
	        };
		  
	        scope.removeGamePartner = function(index){	
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.gameData.splice(index,1);
	        		
	        };
		  
		  scope.submitPartnerAgreement = function(){
			  
			  
			  scope.formData.gameMediaPartnerData = new Array();
			  if(scope.gameData.length>0){
	        		for(var i in scope.gameData){
	        			
	        			scope.formData.gameMediaPartnerData.push({
							game : scope.gameData[i].game,
							gDate : dateFilter(scope.gameData[i].gDate,"dd MMMM yyyy"),
							playSource : scope.gameData[i].playSource,
							price : scope.gameData[i].price,
							sequence : scope.gameData[i].sequence,
							overwriteRoyaltyValue : ((scope.gameData[i].overwriteRoyaltyValue==undefined || scope.gameData[i].overwriteRoyaltyValue=="")?scope.formData.royaltyValue:scope.gameData[i].overwriteRoyaltyValue),
							locale : "en",
							dateFormat  : "dd MMMM yyyy"
	        			});
	        		}
	        	}
			  
			  
			  delete scope.formData.partnerTypeData;
			  delete scope.formData.mediaCategoryData;
			  webStorage.add("currentTab", {tab: "game" });
			  scope.formData.locale = 'en';
			  
			  resourceFactory.getCategoryAndPartner.save(scope.formData,function(data){
	            	location.path('/game');
	          });
			  
		  };
	  }
  });
  mifosX.ng.application.controller('CreatePartenerGameController', ['$scope', 'ResourceFactory', '$location','dateFilter','webStorage', mifosX.controllers.CreatePartenerGameController]).run(function($log) {
    $log.info("CreatePartenerGameController initialized");
  });
}(mifosX.controllers || {}));
