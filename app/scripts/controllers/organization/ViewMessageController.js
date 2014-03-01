(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMessageController: function(scope, routeParams , route, location, resourceFactory, http) {
        scope.messaging = [];              
        resourceFactory.messageSaveResource.get({messageId: routeParams.id} , function(data) {
            scope.messaging = data;                                                
        });
        scope.deletemessage = function (){
            resourceFactory.messageSaveResource.delete({messageId: routeParams.id} , {} , function(data) {
                  location.path('/message');      
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewMessageController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http', mifosX.controllers.ViewMessageController]).run(function($log) {
    $log.info("ViewMessageController initialized");
  });
}(mifosX.controllers || {}));
