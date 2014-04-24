(function(module) {
	  mifosX.controllers = _.extend(module, {
	    MoveMrnController: function(scope,webStorage, resourceFactory, location,dateFilter) {
	    	 scope.mrnIds = [];
	    	 scope.first = {};
	    	 scope.first.date = new Date();
	        resourceFactory.moveMrnResource.get(function(data) {
	        	scope.mrnIds = data.mrnIds;
	        	scope.formData = data;
	        });
	        
	        
	        scope.getSerialNumbers = function(itemId){
	        	 resourceFactory.moveMrnResource.get({mrnId: itemId},function(data) {
	        		 scope.serialNumbers = data.serialNumber;
	 	        });
	        };
	        scope.getBoth =function(mrnId,description){
	        	return mrnId+"--"+description;
	        };
	        
	        scope.reset123 = function(){
		    	   webStorage.add("callingTab", {someString: "mrn" });
		       };
	        scope.submit = function() {        	
	        	scope.formData.locale = 'en';
	        	var reqDate = scope.first.date.getFullYear()+"-"+(scope.first.date.getMonth()+1)+"-"+scope.first.date.getDate()+" "+scope.first.date.getHours()+":"+scope.first.date.getMinutes()+":"+scope.first.date.getSeconds();
	        	delete scope.formData.mrnIds;
	        	scope.formData.movedDate = reqDate;
	        	resourceFactory.moveMrnSaveResource.save(this.formData,function(data){
	        		/*location.path('/viewmovemrn/'+data.resourceId);*/
	        		location.path('/viewmovedmrn/'+data.resourceId);
	          });
	        	
	        };
	    }
	  });
	  mifosX.ng.application.controller('MoveMrnController', ['$scope','webStorage', 'ResourceFactory','$location','dateFilter', mifosX.controllers.MoveMrnController]).run(function($log) {
	    $log.info("MoveMrnController initialized");
	  });
	}(mifosX.controllers || {}));
