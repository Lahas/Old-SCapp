(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditInteractiveDetailController: function(scope, resourceFactory, location,webStorage,routeParams,dateFilter) {
			    scope.formData = {};
		        scope.eventId = routeParams.id;
		        scope.show = false;
		        scope.upload = {};
		        
		        var clientData = webStorage.get('clientData');
			    scope.displayName=clientData.displayName;
			    scope.statusActive=clientData.statusActive;
			    scope.accountNo=clientData.accountNo;
			    scope.clientId = parseInt(scope.accountNo);
			    scope.officeName=clientData.officeName;
			    scope.balanceAmount=clientData.balanceAmount;
			    scope.currency=clientData.currency;
			    scope.cId = clientData.clientId;
			    scope.imagePresent=clientData.imagePresent;	
			    

			    scope.months=[{id:1,mon:"January"},{id:2,mon:"February"},{id:3,mon:"March"},{id:4,mon:"April"},
		            		  {id:5,mon:"May"},{id:6,mon:"June"},{id:7,mon:"July"},{id:8,mon:"August"},{id:9,mon:"September"},
		            		  {id:10,mon:"October"},{id:11,mon:"November"},{id:12,mon:"December"}];
			    
			    scope.counter= 0;
			    scope.interactiveData = [];
			    scope.interactiveDetailDatas = [];
			    
			    resourceFactory.interactiveResource.get({eventId : routeParams.id},function(data) {
		        
		        	
			    	scope.formData.clientId = data.clientId;
		            scope.formData.externalId = data.externalId;
		            scope.formData.activityMonth = data.activityMonth;
		            scope.upload.date = dateFilter(new Date(data.dataUploadedDate),"dd MMMM yyyy");
		            scope.formData.businessLine = data.businessLine;
		            scope.formData.mediaCategory = data.mediaCategory;
		            /*scope.formData.chargeCode = data.chargeCode;*/
		            
		            
		            scope.businessLineDatas = data.businessLineData;
		            scope.mediaCategoryDatas = data.mediaCategoryData;
		            /*scope.chargeCodeDatas = data.chargeCodeData;*/
			    	
		            
			    	scope.playSources=data.playSourceData;
		            scope.contentDatas = data.contentData;
		            scope.serviceDatas = data.serviceData;
		            scope.channelDatas = data.channelData;
		            scope.interactiveData = data.interactiveDetailsData;
		            
		            
		          
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
		        	scope.formData.locale = 'en';
		        	scope.formData.dateFormat = 'dd MMMM yyyy';
		        	scope.formData.dataUploadedDate = dateFilter(new Date(scope.upload.date),'dd MMMM yyyy');
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
		        	
		      resourceFactory.interactiveResource.update({eventId : routeParams.id}, this.formData, function(data){
		        	            location.path('/gameevent/'+scope.cId);
		        	  });
		          };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('EditInteractiveDetailController', ['$scope', 'ResourceFactory', '$location','webStorage','$routeParams','dateFilter', mifosX.controllers.EditInteractiveDetailController]).run(function($log) {
	    $log.info("EditInteractiveDetailController initialized");
	  });
	}(mifosX.controllers || {}));