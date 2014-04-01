(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditInteractiveDetailController: function(scope, resourceFactory, location,webStorage,routeParams,dateFilter) {
			    scope.formData = {};
		        scope.eventId = routeParams.id;
		        scope.show = false;
		        /*scope.upload = {};*/
		        /*scope.activity = {};*/
		        scope.headerId = webStorage.get('headerId').hId;
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
			    
			    
			    /*scope.counter= 0;*/
			    scope.interactiveData = [];
			    //scope.interactiveDetailDatas = [];
			    
			    resourceFactory.editInteractiveDetailResource.get({eventId : routeParams.id},function(data) {
		        
		        	
		            scope.mediaCategoryDatas = data.mediaCategoryData;		            
			    	scope.playSources=data.playSourceData;
		            scope.contentDatas = data.contentData;
		            scope.serviceDatas = data.serviceData;
		            scope.channelDatas = data.channelData;
		            
		            scope.formData.playSource = data.interactiveDetailsData[0].playSource;
		            scope.formData.contentName = data.interactiveDetailsData[0].contentName;
		            scope.formData.mediaCategory = data.interactiveDetailsData[0].mediaCategory;
		            scope.formData.contentProvider = data.interactiveDetailsData[0].contentProvider;
		            scope.formData.channelName = data.interactiveDetailsData[0].channelName;
		            scope.formData.serviceName = data.interactiveDetailsData[0].serviceName;
		            scope.formData.endUserPrice = data.interactiveDetailsData[0].endUserPrice;
		            scope.formData.downloads = data.interactiveDetailsData[0].downloads;
		            scope.formData.grossRevenue = data.interactiveDetailsData[0].grossRevenue;
		            
		            console.log("before: "+data.interactiveDetailsData);
		            console.log("after: "+data.interactiveDetailsData[0]);
		            
		            
		          
		        });
			    
			   /* var fetchMonth = function(monthData){
			    	switch(monthData){
			    	case "Jan":
			    		return 0;
			    		break;
			    	case "Feb":
			    		return 1;
			    		break;
			    	case "Mar":
			    		return 2;
			    		break;
			    	case "Apr":
			    		return 3;
			    		break;
			    	case "May":
			    		return 4;
			    		break;
			    	case "Jun":
			    		return 5;
			    		break;
			    	case "Jul":
			    		return 6;
			    		break;
			    	case "Aug":
			    		return 7;
			    		break;
			    	case "Sep":
			    		return 8;
			    		break;
			    	case "Oct":
			    		return 9;
			    		break;
			    	case "Nov":
			    		return 10;
			    		break;
			    	case "Dec":
			    		return 11;
			    		break;
			    	default:
			    		return 0;
			    	}
			    };
			    
			    var fetchYear = function(yearData){
			    	return yearData;
			    };*/
			    
			    /*scope.addInteractiveDetails = function(){
		        	scope.counter = scope.counter+1;
		        	//alert("hello");
		        	scope.interactiveData.push({
		                               	contentName:scope.interactiveDetailDatas.contentName, 
		        	                 	playSource : scope.interactiveDetailDatas.playSource,
		        	                 	mediaCategory: scope.interactiveDetailDatas.mediaCategory,
		        	                 	contentProvider:scope.interactiveDetailDatas.contentProvider,
		        	                 	channelName: scope.interactiveDetailDatas.channelName,
		        	                 	serviceName:scope.interactiveDetailDatas.serviceName,
		        	                 	endUserPrice:scope.interactiveDetailDatas.endUserPrice,
		        	                 	grossRevenue:scope.interactiveDetailDatas.grossRevenue,
		        	                 	downloads:scope.interactiveDetailDatas.downloads,
		        	});
		        	                 scope.interactiveDetailDatas.contentName = undefined; 
		        	                 scope.interactiveDetailDatas.playSource = undefined;
		        	                 scope.interactiveDetailDatas.mediaCategory = undefined;
		        	                 scope.interactiveDetailDatas.contentProvider =  undefined;
		        	                 scope.interactiveDetailDatas.channelName = undefined;
		        	                 scope.interactiveDetailDatas.serviceName = undefined;
		        	                 scope.interactiveDetailDatas.endUserPrice = undefined; 
		        	                 scope.interactiveDetailDatas.grossRevenue = undefined;
		        	                 	
		        	
			    };*/
			    
			   /* scope.removeInteractiveDetail = function(index){	
		        	if(scope.counter>=1){
		        		scope.counter = scope.counter-1;
		        	}
		        	scope.interactiveData.splice(index,1);
			    };*/
			    
		        scope.submit = function () {
		        	
		        	console.log("submiting form");
		        	
		        	//scope.formData.activeData = new Array();
		        	scope.formData.locale = 'en';
		        	scope.formData.dateFormat = 'dd MMMM yyyy';
		        	
		        	//scope.formData.dataUploadedDate = dateFilter(new Date(scope.upload.date),'dd MMMM yyyy');
		        	//scope.formData.activityMonth = dateFilter(new Date(scope.activity.date),'MMM yyyy');
					  //if(scope.interactiveData.length>0){
			        		//for(var i in scope.interactiveData){
			        			//console.log("i: "+i);
			        			//scope.formData.activeData.push({
									/*playSource : scope.interactiveData[i].playSource,
									contentName: scope.interactiveData[i].contentName,
									mediaCategory: scope.interactiveData[i].mediaCategory,
									contentProvider:scope.interactiveData[i].contentProvider,
	        	                 	channelName: scope.interactiveData[i].channelName,
	        	                 	serviceName:scope.interactiveData[i].serviceName,
	        	                 	endUserPrice:scope.interactiveData[i].endUserPrice,
	        	                 	grossRevenue:scope.interactiveData[i].grossRevenue,
	        	                 	downloads:scope.interactiveData[i].downloads,
	        	                 	locale: 'en'*/
			        			//});
		        	
			        		//}
					  //}
		        	
		      resourceFactory.editInteractiveDetailResource.update({eventId : routeParams.id}, scope.formData, function(data){
		        	            location.path('/viewinteractivedetails/'+scope.headerId);
		        	  });
		          };
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('EditInteractiveDetailController', ['$scope', 'ResourceFactory', '$location','webStorage','$routeParams','dateFilter', mifosX.controllers.EditInteractiveDetailController]).run(function($log) {
	    $log.info("EditInteractiveDetailController initialized");
	  });
	}(mifosX.controllers || {}));