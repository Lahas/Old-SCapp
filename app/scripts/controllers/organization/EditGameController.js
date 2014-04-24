(function(module) {
  mifosX.controllers = _.extend(module, {
    EditGameController: function(scope, routeParams, resourceFactory, location,dateFilter) {
        scope.mediaAssetData = [];
        scope.mediaAttributes = [];
        
        scope.mediaCategeorydatas = [];
        scope.mediaFormats = [];
        scope.mediaLanguageDatas=[];
        scope.mediaAssetLocations=[];
        scope.mediaTypeDatas = [];
        scope.mediaassetAttributes=[];
        scope.gameData=[];
        scope.services=[];
        scope.contentProviderNames=[];

        scope.attributesFormData=[];
        scope.date={};
        scope.counter = 0;
        scope.formData = {};
        resourceFactory.saveGameMediaResource.get({mediaId: routeParams.id} , function(data) {
        	
        	scope.formData.mediaTitle = data.mediaTitle;
        	scope.formData.overview = data.overview;
        	scope.gameData = data.settlementData;
        	scope.mediaContentProviders = data.mCProvider;
        	scope.categorys = data.mediaCategory;
        	scope.mediaTypes = data.mediaType;
        	scope.counter = data.settlementData.length;
        	scope.sources = data.source;
        	scope.formData.partnerName=data.contentProvider;
        	scope.contentProviderNames=data.contentProviderName;
        	
        	
        });
        
    	
        
        
        scope.addGameMedia = function(){
        	
        	scope.counter = scope.counter+1;
        	//console.log("Add Game Media: "+scope.counter);
			scope.gameData.push({category : scope.gameData.category,
								 mediaContentProvider : scope.gameData.mediaContentProvider,
								 mediaType : scope.gameData.mediaType,
								 source : scope.gameData.source,
								 service : scope.gameData.service,
								 amount : scope.gameData.amount,
								 settlementId : scope.gameData.settlementId,
								 sequence : scope.counter
								 });
			
            scope.gameData.category = undefined;
            scope.gameData.mediaContentProvider = undefined;
            scope.gameData.mediaType = undefined;
            scope.gameData.source = undefined;
            scope.gameData.service = undefined;
            scope.gameData.sequence = undefined;
            scope.gameData.amount = undefined;
            scope.gameData.settlementId = undefined;
        };

        scope.removeGameMedia = function(index){	
        	if(scope.counter>1){
        		scope.counter = scope.counter-1;
        	}
        	scope.gameData.splice(index,1);
        	//console.log("Remove Game Media: "+scope.counter);	
        };
        
           
          
        scope.submit= function(){
        	//console.log("submit request");
        	scope.formData.gameMediaData = new Array();
        	
        	if(scope.gameData.length>0){
        		for(var i in scope.gameData){
        			if(i=='category')
        				break;
        			//console.log("i: "+i);        				
        			scope.formData.gameMediaData.push({
        				category : scope.gameData[i].category,
						mediaContentProvider : scope.gameData[i].mediaContentProvider,
						mediaType : scope.gameData[i].mediaType,
						source : scope.gameData[i].source,
						service : scope.gameData[i].service,
						sequence : scope.gameData[i].sequence,
						amount : scope.gameData[i].amount,
						settlementId : scope.gameData[i].settlementId,
						locale : "en",
						dateFormat  : "dd MMMM yyyy"
        			});
        		}
        	}
        	
        	this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.locale = 'en';
            this.formData.mediaCategory = scope.mediaCategory;
        	resourceFactory.updateMediaGameTemplateResource.update({mediaId: routeParams.id},this.formData,function(data){
                location.path('/viewmedia/' + data.resourceId);
              });
        };  
    }
  });
  mifosX.ng.application.controller('EditGameController', ['$scope', '$routeParams', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.EditGameController]).run(function($log) {
    $log.info("EditGameController initialized");
  });
}(mifosX.controllers || {}));
