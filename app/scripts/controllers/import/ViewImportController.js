(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewImportController: function(scope, routeParams , location,resourceFactory ) {
        scope.import = [];
        resourceFactory.importviewResource.get({uploadfileId: routeParams.id}, function(data) {
            scope.import = data;
           
        });

        scope.deleteuser = function (){
            resourceFactory.importviewResource.get({uploadfileId: routeParams.id} , {} , function(data) {
                  location.path('/importing');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
          
          
          scope.processFile = function (){
        	  scope.loading = true;
        	                   
                  resourceFactory.importProcessResource.update({uploadfileId: routeParams.id} , {} , function(data) {
                	  location.path('/importing');
                	  scope.loading = false;
          
                    // added dummy request param because Content-Type header gets removed 
                    // if the request does not contain any data (a request body)   
                  });
            }; 
            
            scope.downloadFile = function (){ 
           	 window.open('https://'+document.location.host+'/obsplatform/api/v1/uploadstatus/'+routeParams.id+'/print?tenantIdentifier=default');
           	 
            };
            
            scope.logFile = function (){ 
	         window.open('https://'+document.location.host+'/obsplatform/api/v1/uploadstatus/'+routeParams.id+'/printlog?tenantIdentifier=default');
	    };
           
    }
  });
  mifosX.ng.application.controller('ViewImportController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.ViewImportController]).run(function($log) {
    $log.info("ViewImportController initialized");
  });
}(mifosX.controllers || {}));
