(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMediaController: function(scope, routeParams , location,resourceFactory ) {
        scope.media = [];
        scope.mediaDetails = [];
        scope.gameView = false;
        resourceFactory.saveMediaResource.get({mediaId: routeParams.id} , function(data) {
            scope.media = data.mediaAssetData;
            scope.settlementData = data.settlementData;
            if(scope.media.mediaCategoryG === "Games"){
            	scope.gameView = true;
            }
            scope.mediaDetails=data.mediaassetAttributes;
            scope.mediaLocationDatas=data.mediaLocationData;
            scope.mediaAttributes=data.mediaAttributes;
            scope.mediaLanguageDatas=data.mediaLanguageData;
            scope.mediaTypeDatas=data.mediaTypeData;
            scope.mediaCategeorydatas=data.mediaCategeorydata;
           
        });

        scope.getUrl = function(mediaCat){
        	console.log(mediaCat);
        	if(mediaCat=="Games"){
        		location.path('/editgame/'+scope.media.mediaId);
        	}else if(mediaCat=="Movies"){
        		location.path('/editmedia/'+scope.media.mediaId);
        	}
        };
        
        scope.deletemedia = function (){
            resourceFactory.saveMediaResource.delete({mediaId: routeParams.id} , {} , function(data) {
                  location.path('/media');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewMediaController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewMediaController]).run(function($log) {
    $log.info("ViewMediaController initialized");
  });
}(mifosX.controllers || {}));
