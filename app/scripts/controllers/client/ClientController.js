(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService) {
        
      scope.clients = [];
      
      var fetchFunction = function(offset, limit, callback) {
        resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , callback);
      };
      
      scope.clients = paginatorService.paginate(fetchFunction, 14);
      
      
      
      scope.search123 = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText } , callback); 
         };
       
       scope.search = function(filterText) {
        scope.clients = paginatorService.paginate(scope.search123, 14);
       }
    }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService', mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
