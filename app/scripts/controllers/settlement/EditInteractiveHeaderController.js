(function(module) {
	  mifosX.controllers = _.extend(module, {
		  EditInteractiveHeaderController: function(scope, resourceFactory, location,webStorage,routeParams,dateFilter,$modal) {
			    scope.formData = {};
		        scope.eventId = routeParams.id;
		        scope.show = false;
		        scope.upload = {};
		        scope.activity = {};
		        
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
			    
			    
			    resourceFactory.editInteractiveHeaderResource.get({eventId : routeParams.id},function(data) {
		        
		        	
			    	scope.formData.clientId = data.clientId;
		            scope.formData.externalId = data.externalId;
		            scope.upload.date = dateFilter(new Date(data.dataUploadedDate),"dd MMMM yyyy");
		            scope.businessLineDatas = data.businessLineData;
		            
		            var dateData = data.activityMonth.split(" ");
		            var month = fetchMonth(dateData[0].toString());
		            var year = fetchYear(dateData[1]);
		            
		            scope.activity.date = dateFilter(new Date(year,month,1),'MMM yyyy');
		            scope.formData.businessLine = data.businessLine;
		            
		            
		          
		        });
			    
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
			    
		        
		        scope.submit = function(){
		        	scope.formData.dateFormat = "dd MMMM yyyy";
		        	scope.formData.locale = "en"
		        	scope.formData.dataUploadedDate = dateFilter(scope.upload.date,"dd MMMM yyyy");
		        	scope.formData.activityMonth = dateFilter(scope.activity.date,"MMM yyyy");
		        	resourceFactory.editInteractiveHeaderResource.update({eventId : routeParams.id},scope.formData,function(data) {
		        		location.path("/viewinteractivedetails/"+data.resourceId);
		        	 });
		        };
		  
		  }
	  });
	  mifosX.ng.application.controller('EditInteractiveHeaderController', ['$scope', 'ResourceFactory', '$location','webStorage','$routeParams','dateFilter','$modal', mifosX.controllers.EditInteractiveHeaderController]).run(function($log) {
	    $log.info("EditInteractiveHeaderController initialized");
	  });
	}(mifosX.controllers || {}));