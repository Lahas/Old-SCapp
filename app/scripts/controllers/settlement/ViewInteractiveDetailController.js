(function(module) {
	  mifosX.controllers = _.extend(module, {
		  ViewInteractiveDetailController: function(scope, resourceFactory, location,webStorage,routeParams,dateFilter,$modal,PaginatorService) {
			    scope.formData = {};
		        scope.eventId = routeParams.id;
		        scope.show = false;
		        scope.upload = {};
		        scope.activity = {};
		        scope.pageData=[];
		     
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
			    
/*
			    scope.months=[{id:1,mon:"January"},{id:2,mon:"February"},{id:3,mon:"March"},{id:4,mon:"April"},
		            		  {id:5,mon:"May"},{id:6,mon:"June"},{id:7,mon:"July"},{id:8,mon:"August"},{id:9,mon:"September"},
		            		  {id:10,mon:"October"},{id:11,mon:"November"},{id:12,mon:"December"}];*/
			    
			    scope.counter= 0;
			    scope.interactiveData = [];
			    scope.interactiveDetailDatas = [];
			    
			   
			    
			    scope.getDataHistoryFetchFunction = function(offset, limit, callback) {
		        	resourceFactory.viewInteractiveResource.get({eventId:routeParams.id,offset:offset,limit:limit},function(data){
		        		
		        		scope.formData.clientId = data.interactiveData.clientId;
		        		scope.formData.id = data.interactiveData.id;
		        		scope.formData.externalId = data.interactiveData.externalId;
		        		scope.upload.date = dateFilter(new Date(data.interactiveData.dataUploadedDate),"dd MMMM yyyy");
		        		var dateData = data.interactiveData.activityMonth.split(" ");
		  	            var month = fetchMonth(dateData[0].toString());
		  	            var year = fetchYear(dateData[1]);
		  	            
		  	            scope.activity.date = dateFilter(new Date(year,month,1),'MMM yyyy');
		  	            scope.formData.businessLine = data.interactiveData.businessLineStr;
		  	            scope.formData.totalGrossAmount =data.interactiveData.totalGrossAmount.totalGrossAmount;
		  	            scope.interactiveData = data.pageItems;
		        		callback(data);
		        });
			    };
		        scope.pageData=PaginatorService.paginate(scope.getDataHistoryFetchFunction, 99);
		        
	       /* resourceFactory.viewInteractiveResource.get({eventId : routeParams.id},function(data) {
		        
			    	scope.formData.clientId = data.clientId;
			    	scope.formData.id = data.id;
		            scope.formData.externalId = data.externalId;
		            scope.upload.date = dateFilter(new Date(data.dataUploadedDate),"dd MMMM yyyy");
		            
		            var dateData = data.activityMonth.split(" ");
		            var month = fetchMonth(dateData[0].toString());
		            var year = fetchYear(dateData[1]);
		            
		            scope.activity.date = dateFilter(new Date(year,month,1),'MMM yyyy');
		            scope.formData.businessLine = data.businessLineStr;
		            scope.interactiveData = data.interactiveDetailsData;
		            scope.totalGrossAmount =data.totalGrossAmount.totalGrossAmount;
		          
		        });
			   */
			    scope.addHeaderId = function(){
			    	webStorage.add("headerId",{hId:scope.formData.id});
			    };
			    
			    var fetchMonth = function(monthData){
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
			    };
			    
			    
			    scope.removeInteractiveDetail = function(detailId){
			    	
			    	console.log("Details Id: "+detailId);
			    };
			    
			
			    
			    /*scope.editInteractiveDetails = function (detailId) {
		            $modal.open({
		                templateUrl: 'EditInteractiveDetails.html',
		                controller: EditInteractiveDetailController
		            });
		        };*/
		        
		        /*var EditInteractiveDetailController = function ($scope, $modalInstance) {
		            
		        	resourceFactory.viewInteractiveResource.get({eventId : routeParams.id},function(data) {
	                    console.log(data);
	                });
		        	
		        	$scope.update = function () {
		        		
		        		update code goes here
		        		
		                $modalInstance.close('delete');
		            };
		            $scope.cancel = function () {
		                $modalInstance.dismiss('cancel');
		            };
		        };*/
		        
		        
		  
		  }
	  });
	  mifosX.ng.application.controller('ViewInteractiveDetailController', ['$scope', 'ResourceFactory', '$location','webStorage','$routeParams','dateFilter','$modal','PaginatorService', mifosX.controllers.ViewInteractiveDetailController]).run(function($log) {
	    $log.info("ViewInteractiveDetailController initialized");
	  });
	}(mifosX.controllers || {}));