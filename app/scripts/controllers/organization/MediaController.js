(function(module) {
  mifosX.controllers = _.extend(module, {
	  MediaController: function(scope, resourceFactory) {
        scope.media = [];
        resourceFactory.mediaResource.getAllMedia(function(data) {
            scope.media= data;
        });
    }
  });
  mifosX.ng.application.controller('MediaController', ['$scope', 'ResourceFactory', mifosX.controllers.MediaController]).run(function($log) {
    $log.info("MediaController initialized");
  });
}(mifosX.controllers || {}));
