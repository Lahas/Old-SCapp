(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateInteractiveDetailController: function(scope, resourceFactory, location,webStorage,routeParams) {
			    scope.formData = {};
		        scope.eventId = routeParams.id;
		        scope.show = false;
		        var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.clientId = parseInt(scope.accountNo);
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.imagePresent=clientData.imagePresent;	
			    

			    scope.mediaDatas = [];
			    scope.playSources = [];
			    scope.contentDatas = [];
			    scope.serviceDatas = [];
			    scope.channelDatas = [];
			    scope.counter= 0;
			    scope.interactiveData = [];
			    scope.interactiveDetailDatas = [];
			    
			    resourceFactory.interactivedetailTemplateResource.getTemplate({id : routeParams.id},function(data) {
		        
		        	scope.mediaDatas = data.mediaData;
		        	//alert("hello");
		        	//console.log(scope.mediaDatas);
		        	scope.playSources=data.playSourceData;
		            scope.contentDatas = data.contentData;
		            scope.serviceDatas = data.serviceData;
		            scope.channelDatas = data.channelData;
		            scope.eventDatas = data.eventData;
		            if(scope.eventDatas.length>0){
		            	show = true;
		            	console.log(show);
		            }else{
		            	show = false;
		            	console.log(show);
		            }
		          
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
			    
		        scope.submit = function () {
		        	
		        	console.log("submiting form");
		        	
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
		        	
		      resourceFactory.interactiveResource.save({eventId : routeParams.id}, this.formData, function(data){
		        	            location.path('/gameevent/'+scope.clientId);
		        	  });
		          };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('CreateInteractiveDetailController', ['$scope', 'ResourceFactory', '$location','webStorage','$routeParams', mifosX.controllers.CreateInteractiveDetailController]).run(function($log) {
	    $log.info("CreateInteractiveDetailController initialized");
	  });
	}(mifosX.controllers || {}));