(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateGameEventController: function(scope, resourceFactory,dateFilter,routeParams,webStorage,location) {
		  scope.upload = {};
		  scope.formData = {};
		  scope.interactiveDetailDatas = {};
		  scope.interactiveData = [];
		  
		  
		  var clientData = webStorage.get('clientData');
		  scope.formData.clientId = clientData.accountNo;
		  scope.formData.cId = clientData.clientId;
		  scope.upload.date = new Date();
		  scope.months=[{id:1,mon:"January"},{id:2,mon:"February"},{id:3,mon:"March"},{id:4,mon:"April"},
	            		  {id:5,mon:"May"},{id:6,mon:"June"},{id:7,mon:"July"},{id:8,mon:"August"},{id:9,mon:"September"},
	            		  {id:10,mon:"October"},{id:11,mon:"November"},{id:12,mon:"December"}];
		  
	        resourceFactory.createGameEventResource.getGameHeaderData(function(data) {
	            
	            
	            scope.businessLineDatas = data.businessLineData;
	            scope.mediaCategoryDatas = data.mediaCategoryData;
	            scope.playSourceDatas = data.playSourceData;
	            scope.chargeCodesDatas = data.chargeCodesData;
	        });
	        
	        resourceFactory.interactivedetailTemplateResource.getTemplate({id : routeParams.id},function(data) {
		        
	        	scope.mediaDatas = data.mediaData;
	        	scope.playSources=data.playSourceData;
	            scope.contentDatas = data.contentData;
	            scope.serviceDatas = data.serviceData;
	            scope.channelDatas = data.channelData;
	            scope.eventDatas = data.eventData;
	          
	        });
	        
	        
	        scope.addInteractiveDetails = function(){
	        	scope.counter = scope.counter+1;
	        	//alert("hello");
	        	scope.interactiveData.push({
	                               	contentName:scope.interactiveDetailDatas.contentName, 
	        	                 	playSource : scope.interactiveDetailDatas.playSource,
	        	                 	contentProvider:scope.interactiveDetailDatas.contentProvider,
	        	                 	channelName: scope.interactiveDetailDatas.channelName,
	        	                 	serviceName:scope.interactiveDetailDatas.serviceName,
	        	                 	endUserPrice:scope.interactiveDetailDatas.endUserPrice,
	        	                 	grossRevenue:scope.interactiveDetailDatas.grossRevenue,
	        	                 	downloads:scope.interactiveDetailDatas.downloads,
	        	});
	        	                 scope.interactiveDetailDatas.contentName = undefined; 
	        	                 scope.interactiveDetailDatas.playSource = undefined;
	        	                 scope.interactiveDetailDatas.contentProvider =  undefined;
	        	                 scope.interactiveDetailDatas.channelName = undefined;
	        	                 scope.interactiveDetailDatas.serviceName = undefined;
	        	                 scope.interactiveDetailDatas.endUserPrice = undefined; 
	        	                 scope.interactiveDetailDatas.grossRevenue = undefined;
	        	                 	
	        	
		    };
	        
		    scope.removeInteractiveDetail = function(index){	
	        	if(scope.counter>=1){
	        		scope.counter = scope.counter-1;
	        	}
	        	scope.interactiveData.splice(index,1);
		    };
		    
	        scope.submit = function(){
	        	
	        	scope.formData.activeData = new Array();
				  if(scope.interactiveData.length>0){
		        		for(var i in scope.interactiveData){
		        			//console.log("i: "+i);
		        			scope.formData.activeData.push({
								playSource : scope.interactiveData[i].playSource,
								contentName:scope.interactiveData[i].contentName, 
								contentProvider:scope.interactiveData[i].contentProvider,
      	                 	channelName: scope.interactiveData[i].channelName,
      	                 	serviceName:scope.interactiveData[i].serviceName,
      	                 	endUserPrice:scope.interactiveData[i].endUserPrice,
      	                 	grossRevenue:scope.interactiveData[i].grossRevenue,
      	                 	downloads:scope.interactiveData[i].downloads,
      	                 	locale: 'en'
		        			});
	        	
		        		}
				  }	

	        	
	        	scope.formData.dateFormat = "dd MMMM yyyy";
	        	scope.formData.locale = "en"
	        	scope.formData.dataUploadedDate = dateFilter(scope.upload.date,"dd MMMM yyyy"); 
		        resourceFactory.createGameEventResource.save(scope.formData.cId,scope.formData,function(data) {
		        	location.path('gameevent/'+scope.formData.cId);
		        	console.info("submit-success");
		        },function(errData){
		        	console.info("submit-error");
		        });
	        };
	    }
  });
  mifosX.ng.application.controller('CreateGameEventController', ['$scope', 'ResourceFactory','dateFilter','$routeParams','webStorage','$location', mifosX.controllers.CreateGameEventController]).run(function($log) {
    $log.info("CreateGameEventController initialized");
  });
}(mifosX.controllers || {}));