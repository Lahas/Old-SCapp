(function(module) {
  mifosX.controllers = _.extend(module, {
	  ProspectsController: function(scope, resourceFactory,paginatorService) {
        scope.prospects = [];
        /*resourceFactory.prospectResource.getAllProspects(function(data) {
            scope.prospects = data;
        }); */
        
        scope.prospectFetchFunction = function(offset, limit, callback) {
			resourceFactory.getAllProspectResource.getAllDetails({offset: offset, limit: limit} , callback);
		};
		scope.prospects = paginatorService.paginate(scope.prospectFetchFunction, 14);
		

	      scope.search123 = function(offset, limit, callback) {
	  
	    	  resourceFactory.getAllProspectResource.getAllDetails({offset: offset, limit: limit , 
	    		  sqlSearch: scope.filterText } , callback); 
	      };
	  		
	  		scope.search = function(filterText) {
	  			
	  			scope.prospects = paginatorService.paginate(scope.search123, 14);
	  			scope.filterText="";
	  		};
    }
  });
  mifosX.ng.application.controller('ProspectsController', ['$scope', 'ResourceFactory','PaginatorService', mifosX.controllers.ProspectsController]).run(function($log) {
    $log.info("ProspectsController initialized");
  });
}(mifosX.controllers || {}));
