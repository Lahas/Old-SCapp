(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateMediaController: function(scope, resourceFactory, location,dateFilter) {
        scope.mediaAttributes = [];
        scope.mediaCategeorydatas = [];
        scope.mediaFormats = [];
        scope.mediaLanguageDatas =[];
        scope.mediaStatus = [];
        scope.mediaTypeDatas = [];
        scope.mediaassetAttributes=[];
        scope.mediaAssetLocations=[];
        scope.gameData=[];
        scope.attributesFormData={};
        scope.gameAttributesFormData={};
        scope.mediaLocationFormData={};
        scope.release= {};
        scope.release.date = new Date();
        scope.hideForGame = true;
        scope.counter = 0;
        scope.mediaContentProviders = new Array();
        scope.contentProviderNames=[];

        
        
        var getAll = function(){
        	
        	resourceFactory.mediaTemplateResource.get(function(data) {
                scope.mediaAttributes = data.mediaAttributes;
                scope.mediaCategeorydatas = data.mediaCategeorydata;
                scope.mediaFormats = data.mediaFormat;
                scope.mediaLanguageDatas = data.mediaLanguageData;
                scope.mediaStatus = data.mediaStatus;
                scope.mediaTypeDatas = data.mediaTypeData;
                scope.attributesFormData.attributeType="Cast";
                scope.mediaCategory = "Movies";
                scope.formData = {
               
                  
                };
            });
        	
        };
        
        getAll();
        
        
        scope.setGameScreen = function(){
        	resourceFactory.mediaGameTemplateResource.get(function(data) {
                scope.categorys = data.mediaCategory;
                /*scope.revenueHolders = data.revenueHolders;*/
                scope.mediaContentProviders = data.mediaContentProvider;
                scope.cProvider = data.cProvider;
                scope.contentProviderNames=data.contentProviderName;
                /*scope.wrappers = data.wrappers;*/
                /*scope.oem = data.oem;*/
                scope.sources = data.source;
                scope.mediaTypes = data.mediaType;
                scope.mediaCategory = "Games";
                scope.formData = {
               
                  
                };
            });     
        	scope.hideForGame = false;
        	
        };
        
        
        scope.getMediaContentProviders = function(shareData){/*
        	if(shareData == "OEM"){
        		scope.currData1 = scope.oem;
        	}else if(shareData == "Content Provider"){
        		scope.currData2 = scope.cProvider;
        	}else if(shareData == "Wrappers"){
        		scope.currData3 = scope.wrappers;
        	}
        */};
        
        scope.getMediaContentProvidersData = function(){
        	return scope.currData;
        };
        
        scope.getType = function(Ptype){
        	
        	resourceFactory.mediaGamePartnerResource.get({type: Ptype},function(data){
        		scope.mediaContentProviders = data.mediaContentProvider;
        	});
        	
        };
        
        scope.setMovieScreen = function(){
        	scope.hideForGame = true;
        	getAll();
        };
        
        
        scope.addGameMedia = function(){
        	scope.counter = scope.counter+1;
        	//console.log("Add Game Media: "+scope.counter);
								        	scope.gameData
										.push({
											category : scope.gameAttributesFormData.category,
											mediaContentProvider : scope.gameAttributesFormData.mediaContentProvider,
											mediaType : scope.gameAttributesFormData.mediaType,
											source : scope.gameAttributesFormData.source,
											share : scope.gameAttributesFormData.share,
											service : scope.gameAttributesFormData.service,
											amount : scope.gameAttributesFormData.amount,
											sequence : scope.gameAttributesFormData.sequence=scope.counter 
										});
            scope.gameAttributesFormData.category = undefined;
            /*scope.gameAttributesFormData.mediaContentProvider = undefined;*/
            scope.gameAttributesFormData.mediaType = undefined;
            scope.gameAttributesFormData.source = undefined;
            scope.gameAttributesFormData.service = undefined;
            scope.gameAttributesFormData.sequence = undefined;
            scope.gameAttributesFormData.amount = undefined;
            /*scope.gameAttributesFormData.share = undefined;*/
        };

        scope.removeGameMedia = function(index){	
        	if(scope.counter>=1){
        		scope.counter = scope.counter-1;
        	}
        	scope.gameData.splice(index,1);
        	//console.log("Remove Game Media: "+scope.counter);	
        };
        
        
        scope.getCount = function(){
        	return new Array(scope.counter);
        };

        scope.addMedia = function () {
        	if (scope.attributesFormData.attributeName && scope.attributesFormData.attributevalue) {
									              scope.mediaassetAttributes
											.push({
												attributeType : scope.attributesFormData.attributeType,
												attributeName : scope.attributesFormData.attributeName,
												attributevalue : scope.attributesFormData.attributevalue,
												attributeNickname : scope.attributesFormData.attributeNickname,
												attributeImage : scope.attributesFormData.attributeImage
											});
            //alert(mediaassetAttributes.attributeName);
            //  scope.attributesFormData.attributeType ="Cast";
              scope.attributesFormData.attributeName = undefined;
              scope.attributesFormData.attributevalue = undefined;
              scope.attributesFormData.attributeNickname = undefined;
              scope.attributesFormData.attributeImage = undefined;
        	}
          };
          
          scope.addMediaLocation = function () {
          //	if (scope.mediaLocationFormData.languageId && scope.mediaLocationFormData.location) {
                scope.mediaAssetLocations.push({languageId:scope.mediaLocationFormData.languageId, location:scope.mediaLocationFormData.location, 
                	formatType:scope.mediaLocationFormData.formatType});
              
                scope.mediaLocationFormData.languageId = undefined;
                scope.mediaLocationFormData.location = undefined;
                scope.mediaLocationFormData.formatType = undefined;
                
          	//}
            };
		
          
          scope.deleteMedia = function (index) {
              scope.mediaassetAttributes.splice(index,1);
            };
            
            scope.removeMediaLocation = function (index) {
                scope.mediaAssetLocations.splice(index,1);
              };
            
              
        scope.submitForGame = function(){
        	scope.formData.gameMediaData = new Array();
        	if(scope.gameData.length>0){
        		for(var i in scope.gameData){
        			//console.log("i: "+i);
        			scope.formData.gameMediaData.push({
        				category : scope.gameData[i].category,
						mediaContentProvider : scope.gameData[i].mediaContentProvider,
						mediaType : scope.gameData[i].mediaType,
						source : scope.gameData[i].source,
						service : scope.gameData[i].service,
						sequence : scope.gameData[i].sequence,
						amount : scope.gameData[i].amount,
						locale : "en",
						dateFormat  : "dd MMMM yyyy"
        			});
        		}
        	}
        	this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.locale = 'en';
            this.formData.mediaCategory = scope.mediaCategory;
        	resourceFactory.saveMediaGameTemplateResource.save(this.formData,function(data){
                location.path('/viewmedia/' + data.resourceId);
              });
        };      
              
        scope.submit = function() {
        	console.log("submitting ....................!");
        	if(scope.hideForGame == false){
        		scope.submitForGame();
        		return undefined;
        	}
        	
        	 this.formData.locale = 'en';
         	 var reqDate = dateFilter(scope.release.date,'dd MMMM yyyy');
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.releaseDate = reqDate;
             this.formData.mediaCategory = scope.mediaCategory;
             scope.formData.mediaAssetLocations =new Array();
             scope.formData.mediaassetAttributes =new Array();
             if (scope.mediaassetAttributes.length > 0) {
              
                 for (var i in scope.mediaassetAttributes) {
					                   scope.formData.mediaassetAttributes
												.push({
													attributeType : scope.mediaassetAttributes[i].attributeType,
													attributeName : scope.mediaassetAttributes[i].attributeName,
													attributevalue : scope.mediaassetAttributes[i].attributevalue,
													attributeNickname : scope.mediaassetAttributes[i].attributeNickname,
													attributeImage : scope.mediaassetAttributes[i].attributeImage
												});
                 };
               }
             
             if (scope.mediaAssetLocations.length > 0) {
                
                 for (var i in scope.mediaAssetLocations) {
                	
                   scope.formData.mediaAssetLocations.push({languageId:scope.mediaAssetLocations[i].languageId,formatType:scope.mediaAssetLocations[i].formatType, 
                	   location:scope.mediaAssetLocations[i].location});
                 };
               }
             
            resourceFactory.saveMediaResource.save(this.formData,function(data){
            location.path('/viewmedia/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateMediaController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateMediaController]).run(function($log) {
    $log.info("CreateMediaController initialized");
  });
}(mifosX.controllers || {}));
