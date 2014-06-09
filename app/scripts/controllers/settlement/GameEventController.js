(function(module) {
  mifosX.controllers = _.extend(module, {
	  GameEventController: function(scope, resourceFactory,webStorage,PaginatorService,routeParams,location) {
		  
		  scope.formData = {};
		  
		  scope.clientId = routeParams.id;
		 
		  var clientData = webStorage.get('clientData');
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.formData.categoryType = clientData.categoryType;
	        scope.formData.cId = clientData.clientId;
	        scope.gameEventData = [];
	        
	        scope.routeTo = function(id){
	        	location.path('/viewinteractivedetails/'+id);
	        };
	        
	     
	     
	        scope.getHeaderDataHistoryFetchFunction = function(offset, limit, callback) {
	        	resourceFactory.createGameEventResource.get({cId:routeParams.id,offset:offset,limit:limit},callback); 
	        	
	        };
	        scope.formData = PaginatorService.paginate(scope.getHeaderDataHistoryFetchFunction, 14);
	   
	        
	        scope.searchHeaderDataHistory123 = function(offset, limit, callback) {
		    	  resourceFactory.createGameEventResource.get({ cId: routeParams.id ,offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
		          };
		  		
		  		scope.searchHeaderDataHistory = function(filterText) {
		  			scope.formData = PaginatorService.paginate(scope.searchHeaderDataHistory123, 14);
		  		}; 
	  }
	        });
    mifosX.ng.application.controller('GameEventController', ['$scope', 'ResourceFactory','webStorage','PaginatorService','$routeParams','$location', mifosX.controllers.GameEventController]).run(function($log) {
    $log.info("GameEventController initialized");
    });
}(mifosX.controllers || {}));