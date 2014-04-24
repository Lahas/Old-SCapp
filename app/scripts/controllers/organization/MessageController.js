(function(module) {
  mifosX.controllers = _.extend(module, {
	  MessageController: function(scope, resourceFactory) {
	        scope.message = [];
	        resourceFactory.messageResource.getAllMessages(function(data) {
	            scope.message = data;
	        });
	    }
  });
  mifosX.ng.application.controller('MessageController', ['$scope', 'ResourceFactory', mifosX.controllers.MessageController]).run(function($log) {
    $log.info("MessageController initialized");
  });
}(mifosX.controllers || {}));