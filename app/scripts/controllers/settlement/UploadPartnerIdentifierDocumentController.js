(function(module) {
  mifosX.controllers = _.extend(module, {
	  UploadPartnerIdentifierDocumentController: function(scope, location, http, routeParams) {
      scope.partnerId = routeParams.id;
      //console.log(routeParams);
      scope.resourceId = routeParams.resourceId;
      scope.onFileSelect = function($files) {
        scope.file = $files[0];
      };

      scope.submit = function () {
        http.uploadFile({
          url: 'https://'+document.location.host+'/obsplatform/api/v1/partner_identifiers/'+scope.resourceId+'/documents', 
          data: scope.formData,
          file: scope.file
        }).then(function(data) {
          // to fix IE not refreshing the model
          if (!scope.$$phase) {
            scope.$apply();
          }
          location.path('/viewpartneraccount/'+scope.partnerId);
        });
      };
    }
  });
  mifosX.ng.application.controller('UploadPartnerIdentifierDocumentController', ['$scope', '$location', '$http', '$routeParams', mifosX.controllers.UploadPartnerIdentifierDocumentController]).run(function($log) {
    $log.info("UploadPartnerIdentifierDocumentController initialized"); 
  });
}(mifosX.controllers || {}));