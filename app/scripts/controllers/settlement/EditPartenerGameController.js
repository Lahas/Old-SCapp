(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPartenerGameController: function(scope, resourceFactory, location,dateFilter,routeParams,webStorage,$modal) {
		  
		  
		  
		  scope.partnerGameAttributes = {};
		  scope.gameData=[];
		  scope.counter = 0;
		  scope.formData = {};
		  scope.hideIfChannelPartner = true;
		  resourceFactory.editPartnerGameDetails.get({id: routeParams.id},function(data) {
		  	console.log("ss");
		  	scope.gameData = data.channelPartnerDetails;
		  	scope.counter = data.channelPartnerDetails.length;
		  	scope.formData = data.partnerGameDetails;
		  	scope.formData.partnerName = data.partnerGameDetails.partnerName;
		  	scope.contentProviderGames = data.contentProviderGames;
		  	
		  	if(scope.formData.partnerType == "Service"){
  				scope.hideIfChannelPartner = false;
  				 if(scope.gameData.length>0){
  					scope.gameData = [];
 	        	}
  			}
		  	scope.formData.gamePlaySource = data.partnerGameDetails.gamePlaySource;
			scope.partnerNames = data.partnerNamesData;
		  	scope.playSourceData = data.playSourceData;
		  	scope.gamePlaySources = data.playSourceData;
		  	scope.contentProviderGames = data.contentProviderGames;
		  	for (var i in data.channelPartnerDetails){
		  		scope.gameData[i].gDate = dateFilter(new Date(data.channelPartnerDetails[i].gDate),"dd MMMM yyyy");
		  		console.log(scope.gameData[i].gDate);
		  	}
		  }); 
		  
		  scope.getCategory=function(pName){
			  console.log(pName);
			  resourceFactory.getCategoryAndPartner.get({partnerName: pName},function(data) {
		  			scope.formData.mediaCategory = data.mediaCategoryData.mediaCategory;
		  			scope.formData.partnerType = data.partnerTypeData.partnerType;
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
												gameL : scope.partnerGameAttributes.gameL,
												gDate : scope.partnerGameAttributes.gDate,
												playSource : scope.partnerGameAttributes.playSource,
												price : scope.partnerGameAttributes.price,
												overwriteRoyaltyValue :scope.partnerGameAttributes.overwriteRoyaltyValue == undefined ? scope.formData.royaltyValue:scope.partnerGameAttributes.overwriteRoyaltyValue,
												sequence : scope.partnerGameAttributes.sequence=scope.counter 
											});
	        	
	        	scope.partnerGameAttributes.gameL = undefined;
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
	        	//console.log("Remove Game Media: "+scope.counter);	
	        };
	        
	        scope.tabStatus = function(){
	        	
		    	   webStorage.add("currentTab", {tab: "game" });
		      };
		  
		  scope.submitPartnerGame = function(){
			  console.log("submiting form");
			  console.log(scope.gameData.length);
			  scope.formData.gameMediaPartnerData = new Array();
			  if(scope.gameData.length>0){
	        		for(var i in scope.gameData){
	        			//console.log("i: "+i);
	        			scope.formData.gameMediaPartnerData.push({
							game : scope.gameData[i].gameL,
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
			  console.log(JSON.stringify(scope.formData));
			  console.log("this is submit function ..!");
			  delete scope.formData.partnerTypeData;
			  delete scope.formData.mediaCategoryData;
			  scope.formData.locale = 'en';
			  
			  resourceFactory.editPartnerGameDetails.update({id: routeParams.id},scope.formData,function(data){
	            	location.path('/game');
	          });
			   webStorage.add("currentTab", {tab: "game" });
		  };
		  
		  scope.deleteGame = function(){
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
	                  resourceFactory.deletePartnerGameDetails.delete({gameId: routeParams.id} , {} , function(data){
	                       location.path('/game');
	                       
	                  });
	                  $modalInstance.close('delete');
	                          };
	           $scope.cancel = function () {
	               $modalInstance.dismiss('cancel');
	           };
			   };
	  }
  });
  mifosX.ng.application.controller('EditPartenerGameController', ['$scope', 'ResourceFactory', '$location','dateFilter','$routeParams','webStorage','$modal', mifosX.controllers.EditPartenerGameController]).run(function($log) {
    $log.info("EditPartenerGameController initialized");
  });
}(mifosX.controllers || {}));
