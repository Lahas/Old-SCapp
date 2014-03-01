(function(module) {
  mifosX.controllers = _.extend(module, {
    UploadClientIdentifierDocumentController: function(scope, location, http, routeParams) {
      scope.clientId = routeParams.clientId;
      
      
      scope.onFileSelect = function($files) {
        scope.file = $files[0];
      };

      scope.submit = function () {
        http.uploadFile({
          url: 'https://'+document.location.host+'/obsplatform/api/v1/client_identifiers/'+scope.resourceId+'/documents', 
          data: scope.formData,
          file: scope.file
        }).then(function(data) {
          // to fix IE not refreshing the model
          if (!scope.$$phase) {
            scope.$apply();
          }
          location.path('/viewclient/'+scope.clientId);
        });
      };
    }
  });
  mifosX.ng.application.controller('UploadClientIdentifierDocumentController', ['$scope', '$location', '$http', '$routeParams', mifosX.controllers.UploadClientIdentifierDocumentController]).run(function($log) {
    $log.info("UploadClientIdentifierDocumentController initialized"); 
  });
}(mifosX.controllers || {}));